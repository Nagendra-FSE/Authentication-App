import type AppErrorCode from "../constants/appErrorCode.js";
import type { HttpStatusCode } from "../constants/http.js";

class AppError extends Error {

    constructor(
        public message: string, 
        public statusCode: HttpStatusCode, 
        public errorCode?: AppErrorCode ) {
        super(message);
    }
} 

export default AppError;