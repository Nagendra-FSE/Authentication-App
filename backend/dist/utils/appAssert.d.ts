import type AppErrorCode from "../constants/appErrorCode.js";
import type { HttpStatusCode } from "../constants/http.js";
type AppAssert = (condition: unknown, message: string, statusCode: HttpStatusCode, errorCode?: AppErrorCode) => asserts condition;
declare const appAssert: AppAssert;
export default appAssert;
//# sourceMappingURL=appAssert.d.ts.map