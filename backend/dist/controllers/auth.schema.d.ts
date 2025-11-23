import { z } from "zod";
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    userAgent: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    userAgent: z.ZodOptional<z.ZodString>;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const verificationCodeSchema: z.ZodObject<{
    code: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.schema.d.ts.map