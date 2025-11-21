import React from "react";
import { Link, useNavigate } from "react-router-dom";



const Navbar = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
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
          {/* si esas secciones están en la misma página, mejor solo "#id" */}
          <li><a href="/#nosotros">Nosotros</a></li>
          <li><a href="/#productos">Productos</a></li>
          <li><a href="/#blog">Blog</a></li>
          <li><a href="/#contacto">Contacto</a></li>

          {/* Carrito */}
          <li>
            <Link to="/carrito">
              <img src="/fotos/carrito.png" alt="carrito" />
            </Link>
          </li>

          {/* Usuario: si hay sesión → perfil + botón salir, si no → login */}
          <li>
            {token && usuario ? (
              <>
                <Link to="/perfil">
                  <img src="/fotos/inicio.png" alt="perfil" />
                </Link>
                <button
                  type="button"
                  className="btn-logout"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </>
            ) : (
              <Link to="/login">
                <img src="/fotos/inicio.png" alt="inicio sesión" />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
