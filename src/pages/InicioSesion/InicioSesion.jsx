import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { login as apiLogin } from "../../api/authService";
import { useAuth } from "../../auth/AuthContext";

const InicioSesion = () => {
  const [datos, setDatos] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const resp = await apiLogin(
        datos.correo.trim(),
        datos.contrasena.trim()
      );

      const data = resp.data;

      const usuario = {
        email: data.email,
        rol: data.rol,
      };

      login(usuario, data.token);

      navigate("/perfil");
    } catch (err) {
      console.error("Error en login:", err);
      setError("Credenciales inválidas");
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
