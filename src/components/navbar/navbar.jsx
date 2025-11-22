import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  
  let usuario = null;
  const raw = localStorage.getItem("usuario");

  try {
    if (raw) usuario = JSON.parse(raw);
  } catch (e) {
    console.error("Error al parsear usuario:", e);
    usuario = null;
  }

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <header>
      <div className="logoP">
        <Link to="/">
          <img src="/fotos/logo huerto.png" alt="logo huertohogar" />
          <h1>HuertoHogar</h1>
          <p>La frescura del campo en tu mesa</p>
        </Link>
      </div>

      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><a href="/#nosotros">Nosotros</a></li>
          <li><a href="/#productos">Productos</a></li>
          <li><a href="/#blog">Blog</a></li>
          <li><a href="/#contacto">Contacto</a></li>

          {/* Carrito */}
          <Link to="/carrito">
            <img src="/fotos/carrito.png" alt="carrito" />
          </Link>

        
          {token ? (
            <Link to="/perfil">
              <img src="/fotos/inicio.png" alt="perfil" />
            </Link>
          ) : (
            <Link to="/login">
              <img src="/fotos/inicio.png" alt="login" />
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

