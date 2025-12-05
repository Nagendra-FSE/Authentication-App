import catchErrors from "../utils/catchErrors.js";
import AuthService from "../service/auth.service.js";
import { ACCEPTED, CREATED, OK, UNAUTHORIZED } from "../constants/http.js";
import { setAuthCookies, clearAuthCookies } from "../utils/cookies.js";
import { registerSchema, loginSchema, verificationCodeSchema, emailSchema, resetPasswordSchema } from "./auth.schema.js";
import { verifyToken } from "../utils/jwt.js";
import appAssert from "../utils/appAssert.js";
import UserModel from "../model/user.model.js";
const authService = new AuthService();
export const registerHandler = catchErrors(async (req, res, next) => {
    const request = registerSchema.parse({ ...req.body, userAgent: req.headers['User-Agent'] });
    const { newUser, accessToken, refreshToken } = await authService.createAccount({
        email: request.email,
        password: request.password,
        userAgent: request.userAgent,
    });
    return setAuthCookies(res, accessToken, refreshToken).status(CREATED).json({ user: newUser, message: 'User registered successfully' });
});
export const loginHandler = catchErrors(async (req, res, next) => {
    const request = loginSchema.parse({ ...req.body, userAgent: req.headers['User-Agent'] });
    // Login logic to be implemented
    const { user, refreshToken, accessToken } = await authService.loginUser({
        email: request.email,
        password: request.password,
        userAgent: request.userAgent,
    });
    return setAuthCookies(res, accessToken, refreshToken)
        .status(OK)
        .json({ user, message: 'logged In Successfully' });
});
export const logoutHandler = catchErrors(async (req, res, next) => {
    const accessToken = req.cookies['accessToken'];
    const { sessionId } = verifyToken(accessToken || "");
    if (sessionId) {
        await authService.logoutUser(sessionId);
    }
    return clearAuthCookies(res).status(OK).json({ message: 'Logged out successfully' });
});
export const refreshTokenHandler = catchErrors(async (req, res, next) => {
    const refreshToken = req.cookies['refreshToken'];
    appAssert(refreshToken, 'Missing refresh token', UNAUTHORIZED);
    const { newRefreshToken, accessToken } = await authService.refreshUserAccesToken(refreshToken);
    return setAuthCookies(res, accessToken, newRefreshToken)
        .status(OK)
        .json({ message: 'Token refreshed successfully' });
});
export const verifyEmailHandler = catchErrors(async (req, res, next) => {
    const { code } = verificationCodeSchema.parse(req.params);
    if (code) {
        await authService.verifyEmail(code);
    }
    return res.status(OK).json({ message: 'Email verified successfully' });
});
export const sendPasswordResetHandler = catchErrors(async (req, res, next) => {
    const email = emailSchema.parse(req.body.email);
    await authService.sendPasswordResetEmail(email);
    return res.status(OK).json({ message: "Passward reset link sent" });
});
export const passwordResetHandler = catchErrors(async (req, res, next) => {
    const request = resetPasswordSchema.parse({ password: req.body.password, verificationCode: req.body.code });
    console.log(request);
    await authService.resetPassword(request.password, request.verificationCode);
    return clearAuthCookies(res).status(ACCEPTED).json({ message: "Password reset successful" });
});
//# sourceMappingURL=auth.controller.js.map