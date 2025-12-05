import { addDaysToDate } from "./date.js";
const secure = process.env.NODE_ENV !== 'development';
export const REFRESH_PATH = '/auth/refresh';
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
};
export const getAccessTokenCookieOptions = () => ({
    ...cookieOptions,
    expires: addDaysToDate(15 * 60 * 1000), // 15 minutes
});
export const getRefreshTokenCookieOptions = () => ({
    ...cookieOptions,
    expires: addDaysToDate(24 * 60 * 60 * 1000), // 1 day
    path: REFRESH_PATH,
});
export const setAuthCookies = (res, accessToken, refreshToken) => {
    if (!refreshToken) {
        return res
            .cookie('accessToken', accessToken, getAccessTokenCookieOptions());
    }
    return res
        .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
        .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());
};
export const clearAuthCookies = (res) => {
    return res
        .clearCookie('accessToken').clearCookie('refreshToken', { path: REFRESH_PATH });
};
//# sourceMappingURL=cookies.js.map
