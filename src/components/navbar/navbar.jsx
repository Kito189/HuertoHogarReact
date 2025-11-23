import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const handleLogout = () => {
    logout();              navigate("/login");
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
          <li><a href="/producto">Productos</a></li>
          <li><a href="/#blog">Blog</a></li>
          <li><a href="/#contacto">Contacto</a></li>

         
          <Link to="/carrito">
            <img src="/fotos/carrito.png" alt="carrito" />
          </Link>

         
          {usuario ? (
            <>
              <Link to="/perfil">
                <img src="/fotos/inicio.png" alt="perfil" />
              </Link>
            </>
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