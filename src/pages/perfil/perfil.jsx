import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";

const Perfil = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />

      <section style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Mi Perfil</h2>

        {!token || !usuario ? (
          <>
            <p>No hay usuario logueado.</p>

            <div style={{ marginTop: "20px" }}>
              <Link to="/login">
                <button style={{ marginRight: "10px" }}>Iniciar Sesión</button>
              </Link>

              <Link to="/registro">
                <button>Crear Cuenta</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3>Bienvenido/a, {usuario.nombre}</h3>
            <p>Correo: {usuario.correo}</p>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                window.location.href = "/login";
              }}
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Perfil;

