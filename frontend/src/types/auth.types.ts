export interface LoginPayload {
  email: string;
  password: string;
}

export interface registerPayload {
  email: string;
  password: string;
  confirmPassword: string
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}