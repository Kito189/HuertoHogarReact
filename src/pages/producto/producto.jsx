import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { listarProductos } from "../../api/productos";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const { addItem } = useCart();
  const navigate = useNavigate();

  // Cantidades por producto
  const [cantidades, setCantidades] = useState({});

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        setError("");

        const data = await listarProductos();
        setProductos(data || []);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos. Intenta más tarde.");
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  const aumentar = (id) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const disminuir = (id) => {
    setCantidades((prev) => {
      const actual = prev[id] || 1;
      if (actual <= 1) return prev; // no baja de 1
      return { ...prev, [id]: actual - 1 };
    });
  };

  const handleComprar = (p) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para comprar 🛒");
      navigate("/login");
      return;
    }

    const cantidadSeleccionada = cantidades[p.id] || 1;

    const productoCarrito = {
      id: p.id,
      nombre: p.nombre,
      precio: Number(p.precio || p.precioUnitario || 0),
      cantidad: cantidadSeleccionada,
    };

    addItem(productoCarrito);
    alert(`Producto agregado al carrito: ${p.nombre} (x${cantidadSeleccionada})`);
  };

  return (
    <>
      <Navbar />

      <div className="contenedor-productos" style={{ padding: "40px 10%" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#8B4513",
          }}
        >
          Nuestros productos
        </h2>

        {cargando && <p>Cargando productos...</p>}
        {error && (
          <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            {error}
          </p>
        )}

        {!cargando && !error && productos.length === 0 && (
          <p style={{ textAlign: "center" }}>No hay productos disponibles.</p>
        )}

        <div
          className="grid-productos"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {productos.map((p) => (
            <div
              key={p.id}
              className="card-producto"
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                backgroundColor: "#d0d0d0ff",
              }}
            >
              <h3 style={{ marginBottom: "8px", color: "#4A752C" }}>
                {p.nombre}
              </h3>

              <p style={{ fontSize: "0.9rem", minHeight: "40px" }}>
                {p.descripcion || "Producto fresco de nuestro huerto."}
              </p>

              <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                Precio: ${p.precio}
              </p>

              <p style={{ fontSize: "0.85rem", color: p.stock > 0 ? "green" : "red" }}>
                Stock: {p.stock}
              </p>


              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => disminuir(p.id)}
                  style={{
                    width: "28px",
                    height: "28px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  −
                </button>

                <span style={{ fontSize: "18px", minWidth: "20px", textAlign: "center" }}>
                  {cantidades[p.id] || 1}
                </span>

                <button
                  onClick={() => aumentar(p.id)}
                  style={{
                    width: "28px",
                    height: "28px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleComprar(p)}
                style={{
                  marginTop: "15px",
                  width: "100%",
                  padding: "8px 0",
                  backgroundColor: "#FFD100",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Productos;
