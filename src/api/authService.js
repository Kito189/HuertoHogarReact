
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085", // Gateway
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const isAuthUrl = config.url && config.url.startsWith("/auth");

  if (token && !isAuthUrl) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// LOGIN
export const login = (correo, contrasena) => {
  return api.post("/auth/login", { correo, contrasena });
};

// REGISTRO
export const registrar = (nombre, correo, telefono, contrasena) => {
  return api.post("/auth/registro", {
    nombre,
    correo,
    telefono,
    contrasena,
  });
};

export default api;
