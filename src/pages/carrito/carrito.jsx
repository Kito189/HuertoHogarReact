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

      alert("Compra realizada con éxito...GRACIAS POR SU COMPRA!");
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
        <h2 style={{ color: "#8B4513", marginBottom: "20px" }}>
          Carrito de compras
        </h2>

        {items.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              backgroundColor: "#e5f5ff",
              padding: "20px",
              borderRadius: "12px",
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
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cant.</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>${item.precio}</td>
                    <td>{item.cantidad}</td>
                    <td>${item.precio * item.cantidad}</td>
                    <td>
                      <button onClick={() => removeItem(item.id)}>Quitar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p
              style={{
                textAlign: "right",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              Total: ${total}
            </p>

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={confirmarCompra}
                style={{ marginRight: "10px" }}
              >
                Confirmar compra
              </button>
              <button onClick={clearCart}>Vaciar carrito</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Carrito;
