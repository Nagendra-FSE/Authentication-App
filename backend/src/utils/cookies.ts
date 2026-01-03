import type { CookieOptions, Response } from "express"
import { addDaysToDate } from "./date.js";
import crypto from "crypto";

export const generateCSRFToken = () =>
  crypto.randomBytes(32).toString("hex");

const csrfToken = generateCSRFToken();

// const secure = process.env.NODE_ENV !== 'development';

export const REFRESH_PATH = '/auth/refresh';

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',       
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
        ...cookieOptions, 
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
        ...cookieOptions, 
        expires: addDaysToDate(24 * 60 * 60 * 1000), // 1 day
        path: REFRESH_PATH,
}); 

export const setAuthCookies = (res: Response, refreshToken?: string) => {
        if(!refreshToken) {
            return res
        }
        return res
        .cookie("csrfToken", csrfToken, {...cookieOptions, httpOnly: false})
        .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());
}

export const clearAuthCookies = (res: Response) => {
    return res
        .clearCookie('accessToken')
        .clearCookie('csrfToken')
        .clearCookie('refreshToken', { path: REFRESH_PATH });
}
