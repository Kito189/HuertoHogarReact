import axios from "axios";

const API_URL = "http://localhost:8085/auth";

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password
  });
};

export const registrar = (nombre, email, password) => {
  return axios.post(`${API_URL}/registro`, {
    nombre,
    email,
    password
  });
};
