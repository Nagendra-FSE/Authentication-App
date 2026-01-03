// ...existing code...
import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { getCSRFToken } from "./utils";

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
    const token = localStorage.getItem("token");
    const csrfToken = getCSRFToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if(csrfToken && config.headers) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
  } catch {
    /* ignore localStorage errors */
  }
  return config;
});

// normalize responses and errors
let isRefreshing = false;
let queue: {(error?: string | null, token?: string | null): void}[] = [];

function subscribeTokenRefresh(callback:any) {
  queue.push(callback);
}

function processQueue(error?: string | null, token: string | null = null) {
  queue.forEach((cb) => cb(error, token));
  queue = [];
}

// =========================
// Response Interceptor
// =========================
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If refresh is already happening — queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((err: string) => {
            if (err) return reject(err);
            resolve(API(originalRequest));
          });
        });
      }

      // Start refresh call
      isRefreshing = true;

      try {
        const refreshResponse = await API.get("/auth/refresh", {
          withCredentials: true,
        });

        isRefreshing = false;

        // Process queued requests
        processQueue(null, refreshResponse.data?.accessToken);

        // Retry original request
        return API(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        // Reject queued requests
        processQueue(refreshError as string, null);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
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