import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; // Asegúrate de importar los estilos

const Navbar = () => {
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
                <Link to="/carrito">
                    <img src="/fotos/carrito.png" alt="carrito" />
                </Link>
                <Link to="/perfil">
                    <img src="/fotos/inicio.png" alt="inicio sesion" />
                </Link>
            </ul>
        </nav>
    </header>
  );
};


export default Navbar;

