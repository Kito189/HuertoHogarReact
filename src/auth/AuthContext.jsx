// src/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin } from "../api/authService";   // 👈 CAMBIADO

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUsuario = localStorage.getItem("usuario");
    const savedToken = localStorage.getItem("token");

    if (savedUsuario && savedUsuario !== "undefined") {
      try {
        const parsed = JSON.parse(savedUsuario);
        setUsuario(parsed);
      } catch (err) {
        console.error("Error al parsear usuario LS:", err);
        localStorage.removeItem("usuario");
      }
    }

    if (savedToken && savedToken !== "undefined") {
      setToken(savedToken);
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  const login = async (correo, contrasena) => {
    const resp = await apiLogin(correo, contrasena);
    const tokenBackend = resp.data.token;

    const usuarioBackend = resp.data.usuario || { correo };

    localStorage.setItem("token", tokenBackend);
    localStorage.setItem("usuario", JSON.stringify(usuarioBackend));

    setToken(tokenBackend);
    setUsuario(usuarioBackend);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
