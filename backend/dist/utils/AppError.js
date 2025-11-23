class AppError extends Error {
    message;
    statusCode;
    errorCode;
    constructor(message, statusCode, errorCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}
export default AppError;
//# sourceMappingURL=AppError.js.map