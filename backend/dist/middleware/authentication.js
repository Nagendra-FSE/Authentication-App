import appAssert from "../utils/appAssert.js";
import { UNAUTHORIZED } from "../constants/http.js";
import AppErrorCode from "../constants/appErrorCode.js";
import { verifyToken } from "../utils/jwt.js";
export const authentication = (req, res, next) => {
    // Simple authentication middleware example
    const accessToken = req.cookies['accessToken'];
    appAssert(accessToken, 'Unauthorized: No access token provided', UNAUTHORIZED, AppErrorCode.InvalidAccesToken);
    const { sessionId, userId, error } = verifyToken(accessToken || "");
    appAssert(sessionId, error?.message || 'Unauthorized: Invalid access token', UNAUTHORIZED, AppErrorCode.InvalidAccesToken);
    req.sessionId = sessionId;
    req.userId = userId;
    next();
};
//# sourceMappingURL=authentication.js.map