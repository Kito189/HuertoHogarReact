import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../api/productos";
import { useAuth } from "../../auth/AuthContext";

const Admin = () => {
  const { usuario, logout } = useAuth();

  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    activo: true,
  });
  const [erroresCampo, setErroresCampo] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });
  const [errorGeneral, setErrorGeneral] = useState("");

  const cargarProductos = async () => {
    try {
      const data = await listarProductos();
      setProductos(data);
    } catch (e) {
      console.error(e);
      setErrorGeneral("No se pudieron cargar los productos.");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (campo, valor) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
    setErroresCampo((prev) => ({
      ...prev,
      [campo]: "",
    }));
    setErrorGeneral("");
  };

  const validarFormulario = () => {
    const errores = {
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
    };
    let valido = true;

    if (!form.nombre.trim()) {
      errores.nombre = "El nombre es obligatorio.";
      valido = false;
    }

    if (!form.descripcion.trim()) {
      errores.descripcion = "La descripción es obligatoria.";
      valido = false;
    }

    if (form.precio === "") {
      errores.precio = "El precio es obligatorio.";
      valido = false;
    } else {
      const precioNum = Number(form.precio);
      if (Number.isNaN(precioNum) || precioNum <= 0) {
        errores.precio = "El precio debe ser un número mayor a 0.";
        valido = false;
      }
    }

    if (form.stock === "") {
      errores.stock = "El stock es obligatorio.";
      valido = false;
    } else {
      const stockNum = Number(form.stock);
      if (Number.isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) {
        errores.stock = "El stock debe ser un número entero mayor o igual a 0.";
        valido = false;
      }
    }

    setErroresCampo(errores);
    return valido;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral("");

    const esValido = validarFormulario();
    if (!esValido) return;

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      activo: form.activo,
    };

    try {
      if (form.id) {
        await actualizarProducto(form.id, payload);
      } else {
        await crearProducto(payload);
      }

      setForm({
        id: null,
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        activo: true,
      });
      setErroresCampo({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
      });

      cargarProductos();
    } catch (e) {
      console.error(e);
      setErrorGeneral("No se pudo guardar el producto. Intenta nuevamente.");
    }
  };

  const editar = (p) => {
    setForm({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      stock: p.stock,
      activo: p.activo ?? true,
    });
    setErroresCampo({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
    });
    setErrorGeneral("");
  };

  const eliminar = async (id) => {
    setErrorGeneral("");
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este producto?"
    );
    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      cargarProductos();
    } catch (e) {
      console.error(e);
      setErrorGeneral("No se pudo eliminar el producto.");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px 10%",
          minHeight: "70vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            maxWidth: "950px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            padding: "30px 40px 40px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                color: "#2f6022",
                fontSize: "2rem",
                margin: 0,
              }}
            >
              Panel de Administración
            </h2>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#b22222",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Cerrar sesión
            </button>
          </div>

          <p style={{ marginBottom: "25px" }}>
            Sesión iniciada como{" "}
            <strong>{usuario?.email}</strong> con rol <strong>ADMIN</strong>.
          </p>

          {errorGeneral && (
            <p style={{ color: "red", marginBottom: "15px" }}>{errorGeneral}</p>
          )}

          <h3 style={{ marginBottom: "12px", color: "#444" }}>Producto</h3>

          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 2fr 0.8fr 0.8fr",
                gap: "10px",
                marginBottom: "4px",
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  required
                />
                {erroresCampo.nombre && (
                  <p style={{ color: "red", fontSize: "0.85rem" }}>
                    {erroresCampo.nombre}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Descripción"
                  value={form.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  required
                />
                {erroresCampo.descripcion && (
                  <p style={{ color: "red", fontSize: "0.85rem" }}>
                    {erroresCampo.descripcion}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Precio"
                  value={form.precio}
                  onChange={(e) => handleChange("precio", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  required
                  min="0"
                  step="0.01"
                />
                {erroresCampo.precio && (
                  <p style={{ color: "red", fontSize: "0.85rem" }}>
                    {erroresCampo.precio}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  required
                  min="0"
                  step="1"
                />
                {erroresCampo.stock && (
                  <p style={{ color: "red", fontSize: "0.85rem" }}>
                    {erroresCampo.stock}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                marginTop: "4px",
              }}
            >
              <input
                id="chk-activo"
                type="checkbox"
                checked={form.activo}
                onChange={(e) => handleChange("activo", e.target.checked)}
              />
              <label htmlFor="chk-activo">Activo</label>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#2e8b57",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "25px",
              }}
            >
              {form.id ? "Actualizar producto" : "Crear producto"}
            </button>
          </form>

          <h3 style={{ marginBottom: "10px", color: "#444" }}>
            Lista de productos
          </h3>

          <div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
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
                    backgroundColor: "#d7efc8",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "8px 10px" }}>ID</th>
                  <th style={{ padding: "8px 10px" }}>Nombre</th>
                  <th style={{ padding: "8px 10px" }}>Descripción</th>
                  <th style={{ padding: "8px 10px" }}>Precio</th>
                  <th style={{ padding: "8px 10px" }}>Stock</th>
                  <th style={{ padding: "8px 10px" }}>Activo</th>
                  <th style={{ padding: "8px 10px" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, index) => (
                  <tr
                    key={p.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                    }}
                  >
                    <td style={{ padding: "6px 10px" }}>{p.id}</td>
                    <td style={{ padding: "6px 10px" }}>{p.nombre}</td>
                    <td style={{ padding: "6px 10px" }}>{p.descripcion}</td>
                    <td style={{ padding: "6px 10px" }}>${p.precio}</td>
                    <td style={{ padding: "6px 10px" }}>{p.stock}</td>
                    <td style={{ padding: "6px 10px" }}>
                      {p.activo ? "Sí" : "No"}
                    </td>
                    <td
                      style={{
                        padding: "6px 10px",
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      <button
                        onClick={() => editar(p)}
                        style={{
                          backgroundColor: "#1e88e5",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 10px",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminar(p.id)}
                        style={{
                          backgroundColor: "#c62828",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 10px",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {productos.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        color: "#777",
                      }}
                    >
                      No hay productos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Admin;
