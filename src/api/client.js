import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const isAuthUrl = config.url && config.url.startsWith("/auth");

  if (token && !isAuthUrl) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
