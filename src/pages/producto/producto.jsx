import React, { useEffect, useState } from "react";
import { getProductos } from "../../api/productos";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";


const ProductosPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then((data) => {
      setProductos(data);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="productos-container">
        <h1 className="titulo">Nuestros Productos</h1>

        <div className="grid-productos">
          {productos.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            productos.map((p) => (
              <div className="producto-card" key={p.id}>
                <img
                  src={p.imagen || "https://via.placeholder.com/150"}
                  alt={p.nombre}
                  className="producto-img"
                />

                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>

                <div className="precio">
                  <span>${p.precio}</span>
                </div>

                <button className="btn-comprar">Agregar al carrito</button>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductosPage;
