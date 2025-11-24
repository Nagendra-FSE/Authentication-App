import API from "../config/apiClient";
import type { LoginPayload, registerPayload } from "../types/auth.types";

export const login = async (data: LoginPayload) => API.post("auth/login", data);
export const register = async (data: registerPayload) => API.post("auth/register", data);
export const verifyEmailCode = async (code: string | undefined) => API.get(`auth/email/verify/${code}`);