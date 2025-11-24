import api from "./client";

export const obtenerVentasDeUsuario = (email) => {
  return api.get(`/api/ventas?cliente=${email}`);
};
