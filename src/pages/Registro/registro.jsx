import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { registrar } from "../../api/authService";

const Registro = () => {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      await registrar(
        datos.nombre.trim(),
        datos.correo.trim(),
        datos.contrasena.trim()
      );

      setMensaje("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
      // si quieres redirigir al login después de unos segundos:
      // setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Error en registro:", err);
      setError("No se pudo registrar el usuario.");
    }
  };

  return (
    <>
      <Navbar />
      <form id="formRegistro" onSubmit={handleSubmit} noValidate>
        <div className="registro">
          <h2>Crear cuenta</h2>

          <div className="inputBox">
            <span>Nombre</span>
            <input
              type="text"
              id="nombre"
              value={datos.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputBox">
            <span>Correo</span>
            <input
              type="email"
              id="correo"
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
              value={datos.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

          <div className="inputBox">
            <button type="submit" id="btn">
              Registrarse
            </button>
          </div>

          <div className="group">
            <Link to="/login">¿Ya tienes cuenta? Inicia sesión.</Link>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Registro;
