import api from "./client";

export async function listarProductos() {
  const response = await api.get("/api/productos");
  return response.data;
}

export async function crearProducto(producto) {
  const response = await api.post("/api/productos", producto);
  return response.data;
}

export async function actualizarProducto(id, producto) {
  const response = await api.put(`/api/productos/${id}`, producto);
  return response.data;
}

export async function eliminarProducto(id) {
  await api.delete(`/api/productos/${id}`);
}
