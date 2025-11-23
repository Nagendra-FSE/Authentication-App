import type { SignOptions, VerifyOptions } from "jsonwebtoken";
import type { SessionDoc } from "../model/session.model.js";
import type { UserDocument } from "../model/user.model.js";
export type refreshTokenPayload = {
    sessionId: SessionDoc['_id'];
};
export type accessTokenPayload = {
    userId: UserDocument['_id'];
    sessionId: SessionDoc['_id'];
};
type SignOptionsandSecret = SignOptions & {
    secret: string;
};
export declare const refreshTokenSignOptions: SignOptionsandSecret;
export declare const signToken: (payload: refreshTokenPayload | accessTokenPayload, optionsAndSecret?: SignOptionsandSecret) => string;
export declare const verifyToken: <T extends object>(token: string, optionsAndSecret?: VerifyOptions & {
    secret: string;
}) => T;
export {};
//# sourceMappingURL=jwt.d.ts.map