import axios from "axios";
import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const expires_at = localStorage.getItem("expires_at");
    const currentTime = dayjs().unix();

    if (token && token.trim() !== "" && expires_at) {
      if (Number(expires_at) < Number(currentTime)) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expires_at");
        window.location.href = "/login";
        return Promise.reject(new Error("Token expired"));
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
