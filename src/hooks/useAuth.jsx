import { createContext, useContext, useEffect, useState } from "react";
import { login } from "../api/authService"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const loginUser = async (credenciales) => {
    
    const resp = await login(credenciales);
    
    let data;

    
    if (resp && resp.ok !== undefined) {
      if (!resp.ok) {
        throw new Error("Credenciales inválidas");
      }
      data = await resp.json();
    } else {
      // Caso 2: login ya devuelve el JSON listo
      data = resp;
    }

        const token =
      data.token || data.jwt || data.accessToken || data.access_token;
    const userData =
      data.usuario || data.user || data.usuarioDTO || data.usuarioDto;

    if (!token || !userData) {
      console.error("Respuesta de login no tiene token o usuario:", data);
      throw new Error("Error al procesar respuesta de login");
    }

    // Guardar en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(userData));

    // Actualizar contexto
    setUsuario(userData);

    return userData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
