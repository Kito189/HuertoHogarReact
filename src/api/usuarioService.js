import api from "./client";

export function getUsuarios() {
  return api.get("/api/usuarios"); 
}

export function crearUsuario(usuario) {
  return api.post("/api/usuarios", usuario);
}

export function actualizarUsuario(id, usuario) {
  return api.put(`/api/usuarios/${id}`, usuario);
}

export function eliminarUsuario(id) {
  return api.delete(`/api/usuarios/${id}`);
}
