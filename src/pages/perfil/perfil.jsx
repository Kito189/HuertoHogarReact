import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const Perfil = () => {
  const [usuario, setUsuario] = React.useState(null);

  React.useEffect(() => {
    const raw = localStorage.getItem("usuario");
    if (!raw) {
      setUsuario(null);
      return;
    }

    try {
      const data = JSON.parse(raw);
      setUsuario(data);
    } catch (e) {
      console.error("Error al parsear usuario desde localStorage:", e);
      setUsuario(null);
    }
  }, []);

  return (
    <>
      <Navbar />

      <main style={{ padding: "40px 20px", minHeight: "60vh" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Mi Perfil</h2>

        {!usuario ? (
          <div style={{ textAlign: "center" }}>
            <p>No hay usuario logueado.</p>
            <p style={{ marginTop: "10px" }}>
              <Link to="/login" style={{ marginRight: "10px", color: "green" }}>
                Inicia sesión
              </Link>
              o{" "}
              <Link to="/registro" style={{ color: "green" }}>
                crea una cuenta
              </Link>
              .
            </p>
          </div>
        ) : (
          <div
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              background: "#fff",
            }}
          >
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Correo:</strong> {usuario.email}</p>
            {usuario.telefono && (
              <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Perfil;