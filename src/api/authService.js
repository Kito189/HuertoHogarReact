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

// 👇 SOLO CAMBIA ESTA PARTE
export const login = ({ email, password }) => {
  return api.post("/auth/login", {
    email: email,
    password: password,
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