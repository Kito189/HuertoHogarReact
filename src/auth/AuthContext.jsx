import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { login as apiLogin } from "../api/authService";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  
  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem("usuario");
    if (!saved || saved === "undefined") return null;
    try {
      return JSON.parse(saved);
    } catch (err) {
      console.error("Error al parsear usuario desde localStorage:", err);
      localStorage.removeItem("usuario");
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    if (!saved || saved === "undefined") return null;
    return saved;
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  // Sincronizar token con localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  
  const login = async (email, password) => {
    setLoading(true);
    try {
      
      const response = await apiLogin({ email, password });

      
      const newToken =
        response.data?.token ?? response.token;
      const userData =
        response.data?.usuario ?? response.usuario;

      if (!newToken || !userData) {
        throw new Error("Respuesta de login incompleta");
      }

      setToken(newToken);
      setUsuario(userData);

      return { ok: true };
    } catch (error) {
      console.error("Error en login:", error);
      setToken(null);
      setUsuario(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    setUsuario(null);
    setToken(null);
  };

  const value = {
    usuario,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);