import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const { usuario } = useAuth();
  const { items, total, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  
  const crearVenta = async () => {
    const venta = {
      cliente: usuario.email,                      
      fechaVenta: new Date().toISOString().slice(0, 10),
      total: total,
      pedidoId: null,                              
      activo: true,
    };

    console.log("Creando venta:", venta);

    const respVenta = await fetch("http://localhost:8085/api/ventas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venta),
    });

    if (!respVenta.ok) {
      console.error("Error al registrar venta:", await respVenta.text());
      alert("El pedido se creó, pero hubo un problema al registrar la venta.");
    }
  };

  const confirmarCompra = async () => {
    if (!usuario) {
      alert("Debes iniciar sesión para comprar");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      alert("No hay productos en el carrito");
      return;
    }

    const pedido = {
      emailCliente: usuario.email,
      items: items.map((item) => ({
        idProducto: item.id,
        cantidad: item.cantidad,
      })),
    };

    try {
      const resp = await fetch("http://localhost:8085/api/pedidos/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!resp.ok) {
        console.error("Error al confirmar pedido:", await resp.text());
        alert("No se pudo procesar el pedido");
        return;
      }

      await crearVenta();

      alert("Compra realizada con éxito... ¡GRACIAS POR SU COMPRA!");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
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
      <h2
        style={{
          color: "#8B4513",
          marginBottom: "20px",
          fontSize: "2rem",
        }}
      >
        Carrito de compras
      </h2>

      {items.length === 0 ? (
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <p style={{ margin: 0 }}>No hay productos en el carrito.</p>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            backgroundColor: "#e5f5ff",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #c4e0f5",
                  }}
                >
                  Producto
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #c4e0f5",
                  }}
                >
                  Precio
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #c4e0f5",
                  }}
                >
                  Cant.
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #c4e0f5",
                  }}
                >
                  Subtotal
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #c4e0f5",
                  }}
                >
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "#f9fcff" : "transparent",
                  }}
                >
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {item.nombre}
                  </td>
                  <td style={{ padding: "10px" }}>${item.precio}</td>
                  <td style={{ padding: "10px" }}>{item.cantidad}</td>
                  <td style={{ padding: "10px" }}>
                    ${item.precio * item.cantidad}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        padding: "6px 14px",
                        backgroundColor: "#2e8b57",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              Total: ${total}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={confirmarCompra}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#2e8b57",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Confirmar compra
              </button>
              <button
                onClick={clearCart}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#b22222",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    <Footer />
  </>
);
};

export default Carrito;
