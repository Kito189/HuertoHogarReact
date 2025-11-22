import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085",
});

// Agrega el token en todas las peticiones excepto /auth/*
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const isAuthUrl = config.url && config.url.startsWith("/auth");

  if (token && !isAuthUrl) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const login = (correo, contrasena) => {
  return api.post("/auth/login", {
    email: correo,
    password: contrasena,
  });
};


export const registrar = (nombre, correo, telefono, contrasena) => {
  return api.post("/auth/registro", {
    nombre,
    email: correo,
    telefono,
    password: contrasena,
  });
};

export default api;