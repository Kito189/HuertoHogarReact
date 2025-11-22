import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import InicioSesion from "./pages/InicioSesion/InicioSesion";
import Registro from "./pages/Registro/registro";
import Producto from "./pages/producto/producto";
import Perfil from "./pages/perfil/perfil";
import Carrito from "./pages/carrito/carrito";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />

        <Route path="/inicioSesion.html" element={<InicioSesion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
