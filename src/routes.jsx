import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/home.jsx";
import InicioSesion from "./pages/InicioSesion/InicioSesion.jsx";
import Registro from "./pages/Registro/registro.jsx";
import Producto from "./pages/producto/producto.jsx";
import Carrito from "./pages/carrito/carrito.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import Admin from "./pages/admin/admin.jsx";
import { useAuth } from "./auth/AuthContext";

const RutaProtegida = ({ children }) => {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  return children;
};

const RutaAdmin = ({ children }) => {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol !== "ADMIN") return <Navigate to="/" replace />;
  return children;
};

const RoutesFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<InicioSesion />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/producto" element={<Producto />} />
      <Route path="/carrito" element={<Carrito />} />

      <Route
        path="/perfil"
        element={
          <RutaProtegida>
            <Perfil />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin"
        element={
          <RutaAdmin>
            <Admin />
          </RutaAdmin>
        }
      />
    </Routes>
  );
};

export default RoutesFile;
