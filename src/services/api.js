import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://boralaapi.kodabr.com",
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("@Borala:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const data = error.response?.data;
    const message = Array.isArray(data)
      ? data.map((e) => e.message).filter(Boolean).join(", ")
      : data?.error || data?.message || "Ocorreu um erro inesperado na requisição.";
    return Promise.reject(new Error(message));
  },
);

export const api = instance;
