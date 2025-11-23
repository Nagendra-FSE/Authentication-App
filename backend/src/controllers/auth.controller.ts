
import catchErrors from "../utils/catchErrors.js";
import authRoutes from "../routes/auth.route.js";
import AuthService from "../service/auth.service.js";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http.js";
import { setAuthCookies, clearAuthCookies } from "../utils/cookies.js";
import { registerSchema, loginSchema, verificationCodeSchema } from "./auth.schema.js";
import { verifyToken } from "../utils/jwt.js";
import type { accessTokenPayload } from "../utils/jwt.js";
import appAssert from "../utils/appAssert.js";

const authService = new AuthService();

export const registerHandler = catchErrors(async (req, res, next) => {
    const request = registerSchema.parse(
        { ...req.body, userAgent: req.headers['User-Agent'] }
    );

    const { newUser, accessToken, refreshToken } = await authService.createAccount({
        email: request.email,
        password: request.password,
        userAgent: request.userAgent,
    });
    return setAuthCookies(res, accessToken, refreshToken).status(CREATED).json({ user: newUser, message: 'User registered successfully' });

});

export const loginHandler = catchErrors(async (req, res, next) => {
    const request = loginSchema.parse(
        { ...req.body, userAgent: req.headers['User-Agent'] }
    )
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
    const accessToken = req.cookies['accessToken'] as string | undefined;
    const { sessionId } = verifyToken<accessTokenPayload>(accessToken || "");

    if (sessionId) {
        await authService.logoutUser(sessionId as string);
    }

    return clearAuthCookies(res).status(OK).json({ message: 'Logged out successfully' });
});

export const refreshTokenHandler = catchErrors(async (req, res, next) => {
    const refreshToken = req.cookies['refreshToken'] as string | undefined;

    appAssert(refreshToken, 'Missing refresh token', UNAUTHORIZED);
    const {newRefreshToken, accessToken} = await authService.refreshUserAccesToken(refreshToken);
    return setAuthCookies(res, accessToken, newRefreshToken)
            .status(OK)
            .json({ message: 'Token refreshed successfully' });
});

export const verifyEmailHandler = catchErrors(async (req, res, next) => {
    const { code } = verificationCodeSchema.parse(req.params);

    if(code) {
        await authService.verifyEmail(code);
    }
    
    return res.status(OK).json({ message: 'Email verified successfully' });
});
 