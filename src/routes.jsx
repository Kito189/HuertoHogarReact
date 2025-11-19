import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import InicioSesion from './pages/InicioSesion/iniciosesion';
import Registro from './pages/Registro/registro';
import Producto from './pages/producto/producto';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/producto" element={<Producto />} />
        
        {/* Rutas extra por si acaso quedaron links viejos */}
        <Route path="/inicioSesion.html" element={<InicioSesion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;