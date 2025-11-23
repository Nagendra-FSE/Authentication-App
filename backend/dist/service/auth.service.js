import jwt from "jsonwebtoken";
import SessionModel from "../model/session.model.js";
import UserModel from "../model/user.model.js";
import VerificationCodeModel from "../model/verificationCodeDoc.mode.js";
import { addDaysToDate, ONE_DAY_IN_MS } from "../utils/date.js";
import { jwtSecret } from "../constants/env.js";
import appAssert from "../utils/appAssert.js";
import { CONFLICT, NOT_FOUND, UNAUTHORIZED } from "../constants/http.js";
import { refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt.js";
import VerificationCodeType from "../constants/verificationCodeType.js";
class AuthService {
    async createAccount(params) {
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
        const session = await SessionModel.create({
            userId,
            userAgent,
            expiredAt: addDaysToDate(7 * 24 * 60 * 60 * 1000), // expires in 7 days
        });
        const sessionInfo = {
            sessionId: session._id,
        };
        const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
        const accessToken = signToken({
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
    async loginUser(data) {
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
        const sessionInfo = { sessionId: session._id };
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
    async logoutUser(sessionId) {
        await SessionModel.findByIdAndDelete(sessionId);
    }
    async refreshUserAccesToken(refreshToken) {
        const { sessionId } = verifyToken(refreshToken);
        appAssert(sessionId, 'Invalid refresh token', UNAUTHORIZED);
        const session = await SessionModel.findById(sessionId);
        const currentTime = Date.now();
        appAssert(session
            && session.expiredAt.getTime() > currentTime, 'Session expired', UNAUTHORIZED);
        //refresh the session if expiry in 1 day
        const sessionNeedRefresh = session.expiredAt.getTime() - currentTime < ONE_DAY_IN_MS;
        if (sessionNeedRefresh) {
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
        };
    }
    async verifyEmail(code) {
        const verificationRecord = await VerificationCodeModel.findOne({
            _id: code,
            type: VerificationCodeType.EMAIL_VERIFICATION,
            expiresAt: { $gt: new Date() },
        });
        appAssert(verificationRecord, 'Invalid or expired verification code', NOT_FOUND);
        const user = await UserModel.findByIdAndUpdate({
            _id: verificationRecord.userId
        }, {
            verified: true
        }, { new: true });
        appAssert(user, 'User not found for the verification code', NOT_FOUND);
        await VerificationCodeModel.findByIdAndDelete(code);
    }
}
export default AuthService;
//# sourceMappingURL=auth.service.js.map