// ...existing code...
import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

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
 async (error: AxiosError) => {
       const originalRequest = error.config as InternalAxiosRequestConfig;

  if (error.response?.status === 401 && !originalRequest?._retry) {

      originalRequest._retry = true;
     try {
          await API.get("/auth/refresh", {
          withCredentials: true,
        });
        console.log(originalRequest)

        // ensure headers object exists
        originalRequest.headers = originalRequest.headers || {};

        // retry failed request
        return API(originalRequest);
     } catch (error) {
         return Promise.reject(error);
     }
  }
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