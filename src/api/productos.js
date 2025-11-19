import api from "./client";

export const getProductos = async () => {
  const res = await api.get("/api/productos");
  return res.data;
};
