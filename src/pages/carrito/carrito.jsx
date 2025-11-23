import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useCart } from "../../context/CartContext";

const Carrito = () => {
  const { items, removeItem, clearCart } = useCart();


  const total = items.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  return (
 
<>
  <Navbar />

  <div
    style={{
      maxWidth: "800px",
      margin: "0 auto",
      textAlign: "center",
      marginTop: "40px",
      backgroundColor: "#caf0ffff",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      border: "1px solid #ddd",
      padding: "20px",

    }}
  >
    <h2 style={{ color: "#8B4513", marginBottom: "20px" }}>
      Carrito de compras
    </h2>

    {items.length === 0 ? (
      <p>No hay productos en el carrito.</p>
    ) : (
      <>
        <table
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: "700px"
          }}
        >
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
            {items.map((item, index) => (
              <tr key={`${item.id}-${index}`}>
                <td>{item.nombre}</td>
                <td>${item.precio}</td>
                <td>{item.cantidad}</td>
                <td>${item.precio * item.cantidad}</td>
                <td>
                  <button onClick={() => removeItem(item.id)}>
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p
          style={{
            marginTop: "20px",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#8B4513",
          }}
        >
          Total: ${total.toLocaleString("es-CL")}
        </p>

        <div style={{ marginTop: "20px" }}>
          <button style={{ marginRight: "10px" }}>Confirmar compra</button>
          <button onClick={clearCart}>Vaciar carrito</button>
        </div>
      </>
    )}
  </div>

  <Footer />
</>);
};

export default Carrito;
