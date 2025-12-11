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
  const [erroresCampo, setErroresCampo] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const validarFormulario = () => {
    const nuevosErrores = { nombre: "", correo: "", contrasena: "" };
    let valido = true;

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
      valido = false;
    } else if (datos.nombre.trim().length < 2) {
      nuevosErrores.nombre = "El nombre debe tener al menos 2 caracteres.";
      valido = false;
    }

    if (!datos.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
      valido = false;
    } else {
      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexCorreo.test(datos.correo.trim())) {
        nuevosErrores.correo = "Ingresa un correo electrónico válido.";
        valido = false;
      }
    }

    if (!datos.contrasena.trim()) {
      nuevosErrores.contrasena = "La contraseña es obligatoria.";
      valido = false;
    } else if (datos.contrasena.trim().length < 5) {
      nuevosErrores.contrasena =
        "La contraseña debe tener al menos 5 caracteres.";
      valido = false;
    }

    setErroresCampo(nuevosErrores);
    return valido;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [id]: value,
    }));
    setErroresCampo((prev) => ({
      ...prev,
      [id]: "",
    }));
    setError("");
    setMensaje("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      await registrar(
        datos.nombre.trim(),
        datos.correo.trim(),
        datos.contrasena.trim()
      );

      setMensaje("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
      setDatos({ nombre: "", correo: "", contrasena: "" });
      setErroresCampo({ nombre: "", correo: "", contrasena: "" });
    } catch (err) {
      console.error("Error en registro:", err);
      setError("No se pudo registrar el usuario. Intenta con otro correo.");
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
              autoComplete="name"
              placeholder="Tu nombre"
              required
            />
            {erroresCampo.nombre && (
              <p style={{ color: "red", fontSize: "0.85rem" }}>
                {erroresCampo.nombre}
              </p>
            )}
          </div>

          <div className="inputBox">
            <span>Correo</span>
            <input
              type="email"
              id="correo"
              value={datos.correo}
              onChange={handleChange}
              autoComplete="email"
              placeholder="tu@correo.cl"
              required
            />
            {erroresCampo.correo && (
              <p style={{ color: "red", fontSize: "0.85rem" }}>
                {erroresCampo.correo}
              </p>
            )}
          </div>

          <div className="inputBox">
            <span>Contraseña</span>
            <input
              type="password"
              id="contrasena"
              value={datos.contrasena}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
              required
            />
            {erroresCampo.contrasena && (
              <p style={{ color: "red", fontSize: "0.85rem" }}>
                {erroresCampo.contrasena}
              </p>
            )}
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
