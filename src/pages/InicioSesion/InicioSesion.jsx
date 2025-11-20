// src/pages/InicioSesion/InicioSesion.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import '../../App.css';
import { login } from '../../api/authService';

const InicioSesion = () => {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    correo: '',
    contrasena: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const correoLimpio = datos.correo.trim();
    const passLimpio = datos.contrasena.trim();

    if (!correoLimpio || !passLimpio) {
      setError('Debes ingresar correo y contraseña');
      return;
    }

    try {
      const response = await login(correoLimpio, passLimpio);

      // 🔥 Backend devuelve { token: "" }
      const token = response.data.token;
      localStorage.setItem("token", token);

      alert('Bienvenido 👋');
      navigate('/');  

    } catch (err) {
      console.error(err);
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <>
      <Navbar />

      <h2 style={{ textAlign: 'center', color: '#8B4513' }}>
        Bienvenido de nuevo..
      </h2>

      <form id="formInicioSesion" onSubmit={handleSubmit} noValidate>
        <div className="inicio">
          <h2>Inicio de Sesión</h2>

          <div className="inputBox">
            <span>Correo</span>
            <input
              type="email"
              id="correo"
              placeholder="Correo electrónico"
              value={datos.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputBox">
            <span>Contraseña</span>
            <input
              type="password"
              id="contrasena"
              placeholder="Contraseña"
              value={datos.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p style={{ color: 'red', marginTop: '8px' }}>
              {error}
            </p>
          )}

          <div className="inputBox">
            <button type="submit" id="btn">
              Iniciar Sesión
            </button>
          </div>

          <div className="group">
            <Link to="/registro">
              ¿Todavía no tienes una cuenta? Crea una.
            </Link>
          </div>

          <div className="logo">
            <img src="https://i0.wp.com/abcmoving.biz/wp-content/uploads/2017/02/google-logo.jpg?fit=1024%2C512&ssl=1" alt="google" />
            <img src="https://freepnglogo.com/images/all_img/facebook-logo.png" alt="facebook" />
            <img src="https://tse3.mm.bing.net/th/id/OIP.e62uIti__6ai-bXs6quo-wHaE9?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3" alt="twitter" />
          </div>
        </div>
      </form>

      <Footer />
    </>
  );
};

export default InicioSesion;
