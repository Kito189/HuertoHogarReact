import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";

const Perfil = () => {
  const { usuario } = useAuth();

  return (
    <>
      <Navbar />

      <main className="perfil" style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "#8B4513" }}>Mi Perfil</h2>

        {!usuario ? (
          <>
            <p>No hay usuario logueado.</p>
            <p>
              <Link to="/login">Inicia sesión</Link> o{" "}
              <Link to="/registro">crea una cuenta</Link>.
            </p>
          </>
        ) : (
          <>
            
            <p><strong>Nombre:</strong> {usuario.nombre || "—"}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Perfil;

