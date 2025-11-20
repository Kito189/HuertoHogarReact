import api from "./client";

export const registrar = (nombre, correo, password) => {
  return api.post("/auth/registro", {
    nombre: nombre,
    email: correo,
    password: password
  });
};

// LOGIN
export const login = (correo, password) => {
  return api.post("/auth/login", {
    email: correo,
    password: password
  });
};