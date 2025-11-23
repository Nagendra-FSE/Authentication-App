export type authParms = {
    email: string;
    password: string;
    userAgent?: string | undefined;
};
declare class AuthService {
    createAccount(params: authParms): Promise<{
        newUser: Pick<import("../model/user.model.js").UserDocument, "createdAt" | "_id" | "email" | "verified" | "updatedAt">;
        verificationCode: import("mongoose").Document<unknown, {}, import("../model/verificationCodeDoc.mode.js").VerificationCodeDoc, {}, {}> & import("../model/verificationCodeDoc.mode.js").VerificationCodeDoc & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        refreshToken: string;
        accessToken: string;
    }>;
    loginUser(data: authParms): Promise<{
        user: Pick<import("../model/user.model.js").UserDocument, "createdAt" | "_id" | "email" | "verified" | "updatedAt">;
        refreshToken: string;
        accessToken: string;
    }>;
    logoutUser(sessionId: string): Promise<void>;
    refreshUserAccesToken(refreshToken: string): Promise<{
        accessToken: string;
        newRefreshToken: string | undefined;
    }>;
    verifyEmail(code: string): Promise<void>;
}
export default AuthService;
//# sourceMappingURL=auth.service.d.ts.map