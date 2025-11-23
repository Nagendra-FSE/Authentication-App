import type { CookieOptions, Response } from "express";
export declare const REFRESH_PATH = "/auth/refresh";
export declare const getAccessTokenCookieOptions: () => CookieOptions;
export declare const getRefreshTokenCookieOptions: () => CookieOptions;
export declare const setAuthCookies: (res: Response, accessToken: string, refreshToken?: string) => Response<any, Record<string, any>>;
export declare const clearAuthCookies: (res: Response) => Response<any, Record<string, any>>;
//# sourceMappingURL=cookies.d.ts.map