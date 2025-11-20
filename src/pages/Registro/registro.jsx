// src/pages/Registro/registro.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { registrar } from '../../api/authService';

const Registro = () => {
   
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    password: '',
    confirmar: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!form.nombre || !form.correo || !form.telefono || !form.password || !form.confirmar) {
        alert("¡Todos los campos son obligatorios!");
        return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(form.correo)){
        alert("Ingresa un correo válido.");
        return;
    }

    const regexTelefono = /^[0-9]{8,15}$/;
    if (!regexTelefono.test(form.telefono)) {
        alert("Ingresa un numero telefonico valido.");
        return;
    }

    if (form.password !== form.confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
      // 🔥 Llamamos al backend de verdad
      await registrar(form.nombre, form.correo, form.password);

      alert(`Bienvenido/a ${form.nombre}, tu registro fue exitoso.`);
      window.location.href = "/login";
      
      setForm({ nombre: '', correo: '', telefono: '', password: '', confirmar: '' });

    } catch (err) {
      console.error(err);
      alert("Error al registrarte. Revisa el correo o intenta más tarde.");
    }
  };

  return (
    <>
      <Navbar />
      <form id="formRegistro" onSubmit={handleSubmit} noValidate>
        <div className="registro">
            <h2>Registrarse</h2>
            <div className="inputBox">
                <span>Nombre</span>
                <input type="text" id="nombre" placeholder="Nombre de usuario" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="inputBox">
                <span>Correo</span>
                <input type="email" id="correo" placeholder="Correo electrónico" value={form.correo} onChange={handleChange} required />
            </div>
            <div className="inputBox">
                <span>Teléfono</span>
                <input type="tel" id="telefono" placeholder="Ingrese su celular" value={form.telefono} onChange={handleChange} required />
            </div>
            <div className="inputBox">
                <span>Contraseña</span>
                <input type="password" id="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
            </div>
            <div className="inputBox">
                <span>Confirmar Contraseña</span>
                <input type="password" id="confirmar" placeholder="Confirmar contraseña" value={form.confirmar} onChange={handleChange} required />
            </div>
            <div className="inputBox">
                <button type="submit" id="btn">Registrarse</button>
            </div>
            <div className="group">
                <Link to="/login">¿Ya tienes una cuenta? inicia sesión.</Link>
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

export default Registro;
