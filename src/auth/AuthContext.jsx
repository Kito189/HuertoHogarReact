import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUsuario(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const iniciarSesion = (usuarioData, tokenData) => {
    setUsuario(usuarioData);
    setToken(tokenData);

    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    localStorage.setItem("token", tokenData);
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ usuario, token, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
