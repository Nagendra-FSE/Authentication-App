// ...existing code...
import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig } from "axios";

type APIError = {
  message: string;
  status?: number;
  errorCode?: string;
};

const options: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const API: AxiosInstance = axios.create(options);

// attach token from localStorage (if present) to every request
API.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    /* ignore localStorage errors */
  }
  return config;
});

// normalize responses and errors
API.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response) {
      const payload: APIError = {
        message: (error.response.data && (error.response.data as any).message) || error.message,
        status: error.response.status,
        errorCode: (error.response.data && (error.response.data as any).errorCode) || undefined
      };
      console.log(payload)
      return Promise.reject(payload);
    }

    const payload: APIError = { message: error.message || "Network Error" };
    return Promise.reject(payload);
  }
);

/** helper to set/remove auth header programmatically */
export function setAuthToken(token?: string) {
  if (token) {
    API.defaults.headers.common = API.defaults.headers.common || {};
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      localStorage.setItem("auth_token", token);
    } catch {}
  } else {
    if (API.defaults.headers.common) delete API.defaults.headers.common["Authorization"];
    try {
      localStorage.removeItem("auth_token");
    } catch {}
  }
}

export default API;
// ...existing code...