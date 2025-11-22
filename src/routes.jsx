import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/home.jsx";
import InicioSesion from "./pages/InicioSesion/InicioSesion.jsx";
import Registro from "./pages/Registro/registro.jsx";
import Producto from "./pages/producto/producto.jsx";
import Carrito from "./pages/carrito/carrito.jsx";
import Perfil from "./pages/perfil/perfil.jsx";

const RoutesFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<InicioSesion />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/producto" element={<Producto />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
};

export default RoutesFile;
