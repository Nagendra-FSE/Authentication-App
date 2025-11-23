import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.js";
import z from "zod";
import AppError from "../utils/AppError.js";
import { clearAuthCookies, REFRESH_PATH } from "../utils/cookies.js";
const handleZOdError = (res, err) => {
    const errors = err.issues.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
    }));
    return res.status(BAD_REQUEST).json({
        message: err.message,
        error: errors,
    });
};
const handleAppError = (res, err) => {
    return res.status(err.statusCode).json({
        message: err.message,
        errorCode: err.errorCode,
    });
};
const errorHandler = (err, req, res, next) => {
    console.log('Error Handler:', err);
    if (req.path === REFRESH_PATH) {
        clearAuthCookies(res);
    }
    if (err instanceof z.ZodError) {
        return handleZOdError(res, err);
    }
    if (err instanceof AppError) {
        return handleAppError(res, err);
    }
    res.status(INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal Server Error',
    });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map