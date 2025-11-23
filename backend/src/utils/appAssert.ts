import assert from "node:assert";
import type AppErrorCode from "../constants/appErrorCode.js";
import type { HttpStatusCode } from "../constants/http.js";
import AppError from "./AppError.js";

type AppAssert = (
    condition: unknown,
    message: string,
    statusCode: HttpStatusCode,
    errorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (
    candition,
    message: string,
    statusCode: HttpStatusCode,
    errorCode?: AppErrorCode
) => assert(candition, new AppError(message, statusCode, errorCode));

export default appAssert;

