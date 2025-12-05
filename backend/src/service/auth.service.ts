import jwt from "jsonwebtoken";
import SessionModel from "../model/session.model.js";
import UserModel from "../model/user.model.js";
import VerificationCodeModel from "../model/verificationCodeDoc.mode.js";
import { addDaysToDate, addtimeEgo, ONE_DAY_IN_MS } from "../utils/date.js";
import { jwtSecret, ORIGIN } from "../constants/env.js";
import appAssert from "../utils/appAssert.js";
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED } from "../constants/http.js";
import { refreshTokenSignOptions, signToken, verifyToken, type refreshTokenPayload } from "../utils/jwt.js";
import VerificationCodeType from "../constants/verificationCodeType.js";
import { sendEmail } from "../utils/sendEmail.js";
import { hashValue } from "../utils/bcypt.js";

export type authParms = {
    email: string;
    password: string;
    userAgent?: string | undefined;
}

class AuthService {

    async createAccount(params: authParms) {
        const { email, password, userAgent } = params;
        const userExists = await UserModel.exists({ email });
        appAssert(!userExists, 'User with this email already exists', CONFLICT);
        const newUser = await UserModel.create({ email, password });
        const userId = newUser._id;
        // verification logic can be added here
        const verificationCode = await VerificationCodeModel.create({
            userId,
            type: 'email_verification',
            expiresAt: addDaysToDate(365 * 24 * 60 * 60 * 1000), // expires in 24 hours
        });

        const url = `${ORIGIN}/email/verify/${verificationCode._id}`

       const { error } = await sendEmail({
            to: newUser.email,
             subject: 'Email Verification',
            html: `<h1>please click this link to verify ur Email</h1> <p>verification link: ${url}</p>`,
            text: "please verify"
        })

        if(error) console.log(error);

        const session = await SessionModel.create({
            userId,
            userAgent,
            expiredAt: addDaysToDate(7 * 24 * 60 * 60 * 1000), // expires in 7 days
        });

        const sessionInfo = {
            sessionId: session._id,
        }

        const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

        const accessToken =  signToken({ 
                ...sessionInfo,
                userId: newUser._id
            });

        return { 
            newUser: newUser.omitPassword(),
            verificationCode,
            refreshToken,
            accessToken
        };
    }

    async loginUser(data: authParms) {
        const { email, password, userAgent } = data;
        const user = await UserModel.findOne({ email });
        appAssert(user, 'Invalid user email', UNAUTHORIZED);

        const isValid = await user.comparePassword(password);
        appAssert(isValid, 'Invalid password', UNAUTHORIZED);
        const userId = user._id;
        const session = await SessionModel.create({
            userId,
            userAgent,
            expiredAt: addDaysToDate(7 * 24 * 60 * 60 * 1000), // expires in 7 days
        });

        const sessionInfo = {sessionId: session._id}
        
        const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
        
        const accessToken = signToken({ 
                ...sessionInfo,
                userId,
            });
         
        return {
            user: user.omitPassword(),
            refreshToken,
            accessToken 
        };
    }

    async logoutUser(sessionId: string) {
        await SessionModel.findByIdAndDelete(sessionId);
    }

    async refreshUserAccesToken(refreshToken: string) {
            const { sessionId } = verifyToken<refreshTokenPayload>(refreshToken);
            appAssert(sessionId, 'Invalid refresh token', UNAUTHORIZED);
            const session = await SessionModel.findById(sessionId);
            const currentTime = Date.now();

            appAssert(
                session 
                && session.expiredAt.getTime() > currentTime, 
                'Session expired', 
                UNAUTHORIZED);

        //refresh the session if expiry in 1 day
        const sessionNeedRefresh = session.expiredAt.getTime() - currentTime < ONE_DAY_IN_MS;
        if(sessionNeedRefresh) {
            session.expiredAt = addDaysToDate(7 * 24 * 60 * 60 * 1000);
            await session.save();
        }

        const newRefreshToken = sessionNeedRefresh ?
            signToken({ sessionId }, refreshTokenSignOptions) 
            : undefined;
        const accessToken = signToken({ 
                sessionId,
                userId: session.userId,
            });
        return {
            accessToken, 
            newRefreshToken
        }


    }

    async verifyEmail(code: string) {
        const verificationRecord = await VerificationCodeModel.findOne({
            _id: code,
            type: VerificationCodeType.EMAIL_VERIFICATION,
            expiresAt: { $gt: new Date() },
        })
        appAssert(verificationRecord, 'Invalid or expired verification code', NOT_FOUND);
        const user = await UserModel.findByIdAndUpdate({
            _id: verificationRecord.userId
        }, {
            verified: true
        }, { new: true }); 
        appAssert(user, 'User not found for the verification code', NOT_FOUND);

        await VerificationCodeModel.findByIdAndDelete(code);
    }

    async sendPasswordResetEmail(email: string) {
        const user = await UserModel.findOne({email});
        appAssert(user, "please check  your email", NOT_FOUND);
        const fiveMinuteAgo = addtimeEgo(5 * 60 * 1000);
        const count = await VerificationCodeModel.countDocuments({
             userId: user._id,
             type: VerificationCodeType.PASSWORD_RESET,
             createdAt: {$gt: fiveMinuteAgo}
        })
        
        appAssert(count <= 1, "Too many request, please try again later", TOO_MANY_REQUESTS);
        const expiresAt = addDaysToDate(60 * 60 * 1000);
        const vCode = await VerificationCodeModel.create({
             userId: user._id,
             type: VerificationCodeType.PASSWORD_RESET,
             expiresAt
        })

       const url = `${ORIGIN}/password/reset?code=${vCode._id}&exp=${expiresAt.getTime()}`

       const { data, error } = await sendEmail({
            to: user.email,
            subject: 'Password Reset Link',
            html: `<h4>please click this link to reset ur password</h4> <p>link: ${url}</p>`,
            text: `please reset, link will expiry at ${expiresAt.getTime()}`
        })

        appAssert(data?.id, `${error?.name} - ${error?.message}`, INTERNAL_SERVER_ERROR);

        return {
            url,
            emailId: data?.id
        }
    }

    async resetPassword(password: string, code: string) {
        const verificationRecord = await VerificationCodeModel.findOne({
            _id: code,
            type: VerificationCodeType.PASSWORD_RESET,
            expiresAt: {$gt: new Date()} 
        });
        appAssert(verificationRecord, 'Invalid or expired verification code', NOT_FOUND);

        const updatedUser = await UserModel.findByIdAndUpdate(
                            {_id: verificationRecord.userId},
                            { password: await hashValue(password) }
                        )   
 console.log(updatedUser);
        appAssert(updatedUser, "Failed to reset password", INTERNAL_SERVER_ERROR);

        await VerificationCodeModel.findByIdAndDelete(code);
        
        await SessionModel.deleteMany({userId: updatedUser._id})

       

        return {
            user: updatedUser.omitPassword()
        }
    }
}

 export default AuthService;
