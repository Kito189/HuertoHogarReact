// src/pages/Perfil/perfil.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";


const Perfil = () => {
  const { usuario, logout } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const cargarCompras = async () => {
      try {
        if (!usuario?.email) return; 

        const resp = await fetch(
          `http://localhost:8085/api/ventas/usuario/${usuario.email}`
        );

        if (!resp.ok) {
          console.error("Error al obtener compras:", await resp.text());
          return;
        }

        const data = await resp.json();
        console.log("Compras recibidas:", data);
        setCompras(data);
      } catch (error) {
        console.error("Error de conexión al cargar compras:", error);
      }
    };

    cargarCompras();
  }, [usuario]);

  const handleLogout = () => {
    logout();
    clearCart();
     navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "40px 10%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: "#fff3b0",
            padding: "30px",
            borderRadius: "12px",
          }}
        >
          <h2 style={{ color: "#8B4513", marginBottom: "10px" }}>Mi Perfil</h2>
          <p>
            <strong>Correo:</strong> {usuario?.email}
          </p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#2e8b57",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>

                <h3
        style={{
          marginTop: "25px",
          color: "#8B4513",
        }}
      >
        Mis Compras
      </h3>

      {compras.length === 0 ? (
        <p>Aún no has comprado nada.</p>
      ) : (
        <div
          style={{
            marginTop: "15px",
            backgroundColor: "#f8ff77ff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.95rem",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#53a166ff",
                  color: "#444",
                }}
              >
                <th
                  style={{
                    padding: "10px 16px",
                    textAlign: "left",
                  }}
                >
                  Fecha
                </th>
                <th
                  style={{
                    padding: "10px 16px",
                    textAlign: "right",
                  }}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {compras.map((c, index) => (
                <tr
                  key={c.id || index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fbff",
                  }}
                >
                  <td
                    style={{
                      padding: "8px 16px",
                      borderTop: "1px solid #eee",
                      textAlign: "left",
                    }}
                  >
                    {c.fechaVenta}
                  </td>
                  <td
                    style={{
                      padding: "8px 16px",
                      borderTop: "1px solid #eee",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    ${c.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Perfil;
