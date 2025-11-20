import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "../../App.css";
import { logout, getUserEmail, isLoggedIn } from "../../hooks/useAuth";

const Perfil = () => {
  const correo = getUserEmail();

  const handleLogout = () => {
    // borrar token + correo
    logout();

    alert("Sesión cerrada");
  
    window.location.href = "/login"; // o "/" si prefieres
  };

  if (!isLoggedIn()) {
    window.location.href = "/login";
    return null;
  }

  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1 style={{ color: "#8B4513" }}>Mi Perfil</h1>

        <p style={{ fontSize: "18px", marginTop: "20px" }}>
          <strong>Correo:</strong> {correo}
        </p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            padding: "10px 30px",
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Perfil;