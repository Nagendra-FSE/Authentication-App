import { z } from "zod";
export const loginEmailSchema = z.email();
const loginPasswordSchema = z.string();
export const emailSchema = z.email();
const passwordSchema = z.string().min(8).max(100);
export const loginSchema = z.object({
    email: loginEmailSchema,
    password: loginPasswordSchema,
    userAgent: z.string().optional(),
});
export const registerSchema = loginSchema.extend({
    confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", path: ["confirmPassword"],
});
export const verificationCode = z.string().min(6).max(25);
export const verificationCodeSchema = z.object({
    code: verificationCode
});
export const resetPasswordSchema = z.object({
    password: passwordSchema,
    verificationCode: verificationCode
});
//# sourceMappingURL=auth.schema.js.map