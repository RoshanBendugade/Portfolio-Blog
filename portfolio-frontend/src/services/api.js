import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  // Render's free plan can take up to ~1 minute to wake up after being idle
  timeout: 70000,
});

// Attach JWT automatically to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;