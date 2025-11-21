import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { login } from "../../api/authService";

const InicioSesion = () => {
  const [datos, setDatos] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState("");
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

    try {
      const resp = await login(
        datos.correo.trim(),
        datos.contrasena.trim()
      );

      const { token, usuario } = resp.data;
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      navigate("/perfil"); // o "/" si prefieres
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
            <div className="logo">
            <img src="https://i0.wp.com/abcmoving.biz/wp-content/uploads/2017/02/google-logo.jpg?fit=1024%2C512&ssl=1" alt="google" />
            <img src="https://freepnglogo.com/images/all_img/facebook-logo.png" alt="facebook" />
            <img src="https://tse3.mm.bing.net/th/id/OIP.e62uIti__6ai-bXs6quo-wHaE9" alt="twitter" />
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default InicioSesion;
