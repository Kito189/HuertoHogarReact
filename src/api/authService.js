import api from "./client";


export async function registrar(nombre, correo, password) {
  const resp = await api.post("/auth/registro", {
    nombre,
    email: correo,   // el backend usa "email"
    password,
  });
  return resp.data;
}


export async function login(correo, password) {
  const resp = await api.post("/auth/login", {
    email: correo,   // el backend usa "email"
    password,
  });
  return resp.data;  
}
