import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useAuth } from "../../auth/AuthContext";

const Perfil = () => {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();          
    navigate("/login");      
  };

  return (
    <>
      <Navbar />

<div
  style={{
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    marginTop: "40px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff59fff"
  }}
>
  <h2>Mi Perfil</h2>

  <p>
    <strong>Email:</strong> {usuario?.email}
  </p>

  <button
    onClick={handleLogout}
    style={{
      marginTop: "20px",
      padding: "10px 20px",
      borderRadius: "6px",
      backgroundColor: "#2e7d32",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "16px"
    }}
  >
    Cerrar sesión
  </button>
</div>


      <Footer />
    </>
  );
};

export default Perfil;
