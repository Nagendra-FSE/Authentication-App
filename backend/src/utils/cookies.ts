import type { CookieOptions, Response } from "express"
import { addDaysToDate } from "./date.js";

const secure = process.env.NODE_ENV !== 'development';

export const REFRESH_PATH = '/auth/refresh';

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: secure,
    sameSite: 'strict' as const,        
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
        ...cookieOptions, 
        expires: addDaysToDate(15 * 60 * 1000), // 15 minutes
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
        ...cookieOptions, 
        expires: addDaysToDate(24 * 60 * 60 * 1000), // 1 day
        path: REFRESH_PATH,
}); 

export const setAuthCookies = (res: Response, accessToken: string, refreshToken?: string) => {

        if(!refreshToken) {
            return res
                .cookie('accessToken', accessToken, getAccessTokenCookieOptions());
        }
        return res
        .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
        .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());
}

export const clearAuthCookies = (res: Response) => {
    return res
        .clearCookie('accessToken').clearCookie('refreshToken', { path: REFRESH_PATH });
}
