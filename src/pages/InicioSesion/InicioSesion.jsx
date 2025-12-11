import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { login as apiLogin } from "../../api/authService";
import { useAuth } from "../../auth/AuthContext";

const InicioSesion = () => {
  const [datos, setDatos] = useState({ correo: "", contrasena: "" });
  const [erroresCampo, setErroresCampo] = useState({
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validarFormulario = () => {
    const nuevosErrores = { correo: "", contrasena: "" };
    let valido = true;

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      const resp = await apiLogin(
        datos.correo.trim(),
        datos.contrasena.trim()
      );

      const token = resp.data.token;

      const usuario = {
        email: datos.correo.trim(),
        rol: resp.data.rol,
      };

      login(usuario, token);

      if (usuario.rol === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/perfil", { replace: true });
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Credenciales inválidas. Revisa tu correo y contraseña.");
    }
  };

  return (
    <>
      <Navbar />

      <form id="formLogin" onSubmit={handleSubmit} noValidate>
        <div className="registro">
          <h2>Inicio de Sesión</h2>

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
              autoComplete="current-password"
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

          <div className="inputBox">
            <button type="submit" id="btn">
              Iniciar sesión
            </button>
          </div>

          <div className="group">
            <Link to="/registro">
              ¿Todavía no tienes una cuenta? Crea una.
            </Link>
          </div>
        </div>
      </form>

      <Footer />
    </>
  );
};

export default InicioSesion;
