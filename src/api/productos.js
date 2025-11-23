import api from "./client";


export async function listarProductos() {
  const response = await api.get("/api/productos");
  return response.data; S
}
