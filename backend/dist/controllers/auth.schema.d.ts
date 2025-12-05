import { z } from "zod";
export declare const loginEmailSchema: z.ZodEmail;
export declare const emailSchema: z.ZodEmail;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    userAgent: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    userAgent: z.ZodOptional<z.ZodString>;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const verificationCode: z.ZodString;
export declare const verificationCodeSchema: z.ZodObject<{
    code: z.ZodString;
}, z.core.$strip>;
export declare const resetPasswordSchema: z.ZodObject<{
    password: z.ZodString;
    verificationCode: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.schema.d.ts.map