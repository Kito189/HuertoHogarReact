import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const rutaPerfil = !usuario
    ? "/login"
    : usuario.rol === "ADMIN"
    ? "/admin"
    : "/perfil";

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
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <a href="#nosotros">Nosotros</a>
          </li>
          <li>
            <Link to="/producto">Productos</Link>
          </li>
          <li>
            <a href="#blog">Blog</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>

          <li>
            <Link to="/carrito">
              <img src="/fotos/carrito.png" alt="carrito" />
            </Link>
          </li>

          {usuario ? (
            <>
              <li>
                <Link to={rutaPerfil}>
                  <img src="/fotos/inicio.png" alt="perfil" />
                </Link>
              </li>
              {/* si quieres botón de cerrar sesión visible en navbar:
              <li>
                <button onClick={handleLogout}>Salir</button>
              </li> */}
            </>
          ) : (
            <li>
              <Link to="/login">
                <img src="/fotos/inicio.png" alt="login" />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
