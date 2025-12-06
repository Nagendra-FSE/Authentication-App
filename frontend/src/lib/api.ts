import API from "../config/apiClient";
import type { LoginPayload, registerPayload } from "../types/auth.types";

export const login = async (data: LoginPayload) => API.post("auth/login", data);
export const logout = async () => API.get("auth/logout");
export const register = async (data: registerPayload) => API.post("auth/register", data);
export const verifyEmailCode = async (code: string | undefined) => 
                    API.get(`auth/email/verify/${code}`);
export const forgotPassword = async (email: string) => API.post("/auth/password/forgot", {email});
export const resetPassword = async (data: {code: string, password: string}) => API.post("auth/password/reset", data);
export const getUser = async () => API.get("user");
export const refreshToken = async () => API.get("auth/refresh");