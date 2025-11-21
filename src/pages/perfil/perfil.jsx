import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "../../App.css";
import { useAuth } from "../../hooks/useAuth";

const Perfil = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  // Si no hay usuario logueado, manda a /login
  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  const handleLogout = () => {
    logout();
    alert("Sesión cerrada");
    navigate("/login");
  };

  
  if (!usuario) {
    return null; 
  }

  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1 style={{ color: "#8B4513" }}>Mi Perfil</h1>

        <p style={{ fontSize: "18px", marginTop: "20px" }}>
          <strong>Correo:</strong> {usuario.correo}
        </p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            padding: "10px 30px",
            backgroundColor: "#bfff94ff",
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