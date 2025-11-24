import { z } from "zod";

const loginEmailSchema = z.string().email("Invalid email format");
const loginPasswordSchema=z.string();

const emailSchema = z.string().email("Invalid email format").min(5).max(255);
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

export const verificationCodeSchema = z.object({
    code: z.string().min(6).max(25),
});




