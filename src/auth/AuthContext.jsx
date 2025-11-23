import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(
    () => JSON.parse(localStorage.getItem("usuario")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (user, jwt) => {
    setUsuario(user);
    setToken(jwt);
    localStorage.setItem("usuario", JSON.stringify(user));
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }
  return ctx;
};
