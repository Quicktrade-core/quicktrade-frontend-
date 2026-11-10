// src/lib/api.js
import axios from "axios";

export const API_BASE_URL =
  "https://quicktrade-backend.onrender.com";

const STORAGE_KEY = "authToken";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Send `Token <key>` on every request — matches the backend's api_login_required
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) config.headers.Authorization = `Token ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// On 401, clear the token and bounce to /auth
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY);
      if (window.location.pathname !== "/auth") {
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export const TOKEN_STORAGE_KEY = STORAGE_KEY;