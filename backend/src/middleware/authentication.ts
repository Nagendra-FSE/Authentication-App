import type { RequestHandler, NextFunction } from "express";
import appAssert from "../utils/appAssert.js";
import { UNAUTHORIZED } from "../constants/http.js";
import AppErrorCode from "../constants/appErrorCode.js";
import { verifyToken, type accessTokenPayload } from "../utils/jwt.js";

export const authentication: RequestHandler = (req, res, next) => {
    // Simple authentication middleware example
    const accessToken = req.headers.authorization?.split(" ")[1];
    appAssert(
        accessToken, 
        'Unauthorized: No access token provided', 
        UNAUTHORIZED,
        AppErrorCode.InvalidAccesToken );
    const { sessionId, userId, error } = verifyToken<accessTokenPayload & { error?: Error }>(accessToken || "")
    appAssert(sessionId, error?.message || 'Unauthorized: Invalid access token', UNAUTHORIZED, AppErrorCode.InvalidAccesToken);

    req.sessionId = sessionId;
    req.userId = userId;
    next();
}

export const csrfProtection: RequestHandler = (req, res, next) => {
  const csrfCookie = req.cookies?.csrfToken as string | undefined;
  const csrfHeader = req.headers["x-csrf-token"] as string | undefined;

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return res.status(403).json({ message: "CSRF validation failed" });
  }

  next();
};