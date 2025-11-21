import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";


const AuthContext = createContext(null);

// Provider que ya estás usando en main.jsx
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Al cargar la app, intenta leer el usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parseando usuario desde localStorage", e);
      }
    }
  }, []);

  
  const loginUser = (usuarioNuevo, token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
    localStorage.setItem("usuario", JSON.stringify(usuarioNuevo));
    setUsuario(usuarioNuevo);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);

export default useAuth;
