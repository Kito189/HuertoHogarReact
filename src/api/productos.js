// src/api/productos.js
import api from "./client";

// Obtiene todos los productos desde el API Gateway
export async function listarProductos() {
  const response = await api.get("/api/productos");
  return response.data; // esperamos un arreglo de productos
}
