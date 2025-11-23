import assert from "node:assert";
import AppError from "./AppError.js";
const appAssert = (candition, message, statusCode, errorCode) => assert(candition, new AppError(message, statusCode, errorCode));
export default appAssert;
//# sourceMappingURL=appAssert.js.map