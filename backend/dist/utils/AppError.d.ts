import type AppErrorCode from "../constants/appErrorCode.js";
import type { HttpStatusCode } from "../constants/http.js";
declare class AppError extends Error {
    message: string;
    statusCode: HttpStatusCode;
    errorCode?: AppErrorCode | undefined;
    constructor(message: string, statusCode: HttpStatusCode, errorCode?: AppErrorCode | undefined);
}
export default AppError;
//# sourceMappingURL=AppError.d.ts.map