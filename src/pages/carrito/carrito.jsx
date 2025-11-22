
import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useAuth } from "../../auth/AuthContext";
   // <-- FALTABA

const Carrito = () => {
  const { items, removeItem, clearCart, total } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  if (!usuario) return null;


  const confirmarCompra = async () => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const pedido = {
        idUsuario: usuario.id,
        items: items.map((item) => ({
          idProducto: item.id,
          cantidad: item.cantidad,
          precioUnitario: item.precio,
        })),
        total: total,
      };

      const resp = await fetch("http://localhost:8085/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedido),
      });

      if (!resp.ok) {
        console.error("Error al crear pedido");
        alert("No se pudo registrar el pedido");
        return;
      }

      alert("¡Pedido registrado con éxito!");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <Navbar />

      {items.length === 0 ? (
        <h2 style={{ textAlign: "center", marginTop: "80px", color: "#8B4513" }}>
          Tu carrito está vacío...
        </h2>
      ) : (
        <div style={{ padding: "40px 10%" }}>
          <h1 style={{ textAlign: "center", color: "#8B4513", marginBottom: "20px" }}>
            Carrito de compras
          </h1>

          <table style={{ margin: "0 auto" }}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cant.</th>
                <th>Subtotal</th>
                <th></th>
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

          <h3 style={{ textAlign: "center", marginTop: "20px" }}>Total: ${total}</h3>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={confirmarCompra}>Confirmar compra</button>
            <button style={{ marginLeft: "1rem" }} onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Carrito;
