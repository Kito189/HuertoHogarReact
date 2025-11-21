import api from "./authService";

export const login = (correo, contrasena) => {
  return api.post("/auth/login", { correo, contrasena });
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const isAuthUrl = config.url && config.url.startsWith("/auth");

  if (token && !isAuthUrl) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
