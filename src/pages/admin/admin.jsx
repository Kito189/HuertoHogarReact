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
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErroresCampo((prev) => ({ ...prev, [campo]: "" }));
    setErrorGeneral("");
  };

  const validarFormulario = () => {
    const errores = { nombre: "", descripcion: "", precio: "", stock: "" };
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
        errores.precio = "El precio debe ser mayor a 0.";
        valido = false;
      }
    }

    if (form.stock === "") {
      errores.stock = "El stock es obligatorio.";
      valido = false;
    } else {
      const stockNum = Number(form.stock);
      if (Number.isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) {
        errores.stock = "El stock debe ser entero y >= 0.";
        valido = false;
      }
    }

    setErroresCampo(errores);
    return valido;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral("");

    if (!validarFormulario()) return;

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      activo: form.activo,
    };

    try {
      if (form.id) await actualizarProducto(form.id, payload);
      else await crearProducto(payload);

      setForm({
        id: null,
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        activo: true,
      });
      setErroresCampo({ nombre: "", descripcion: "", precio: "", stock: "" });

      cargarProductos();
    } catch (e) {
      console.error(e);
      setErrorGeneral("No se pudo guardar el producto.");
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
    setErroresCampo({ nombre: "", descripcion: "", precio: "", stock: "" });
    setErrorGeneral("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminar = async (id) => {
    setErrorGeneral("");
    const confirmar = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      cargarProductos();
    } catch (e) {
      console.error(e);
      setErrorGeneral("No se pudo eliminar el producto.");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      activo: true,
    });
    setErroresCampo({ nombre: "", descripcion: "", precio: "", stock: "" });
    setErrorGeneral("");
  };

  return (
    <>
      <Navbar />

      <main className="admin-page">
        <section className="admin-card">
          <header className="admin-header">
            <div className="admin-title">
              <h1>Panel de Administración</h1>
              <p>
                Sesión iniciada como <strong>{usuario?.email}</strong> con rol{" "}
                <strong>ADMIN</strong>.
              </p>
            </div>

            <button className="admin-btn admin-btn-danger" onClick={logout}>
              Cerrar sesión
            </button>
          </header>

          {errorGeneral && <div className="admin-alert">{errorGeneral}</div>}

          <div className="admin-section">
            <h2>Producto</h2>

            <form className="admin-form" onSubmit={handleSubmit} noValidate>
              <div className="admin-grid">
                <div className="admin-field">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    placeholder="Ej: Papa Roja"
                    required
                  />
                  {erroresCampo.nombre && (
                    <span className="admin-error">{erroresCampo.nombre}</span>
                  )}
                </div>

                <div className="admin-field">
                  <label>Descripción</label>
                  <input
                    type="text"
                    value={form.descripcion}
                    onChange={(e) => handleChange("descripcion", e.target.value)}
                    placeholder="Ej: papa premium para puré"
                    required
                  />
                  {erroresCampo.descripcion && (
                    <span className="admin-error">{erroresCampo.descripcion}</span>
                  )}
                </div>

                <div className="admin-field">
                  <label>Precio</label>
                  <input
                    type="number"
                    value={form.precio}
                    onChange={(e) => handleChange("precio", e.target.value)}
                    placeholder="Ej: 1590"
                    min="0"
                    step="1"
                    required
                  />
                  {erroresCampo.precio && (
                    <span className="admin-error">{erroresCampo.precio}</span>
                  )}
                </div>

                <div className="admin-field">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    placeholder="Ej: 50"
                    min="0"
                    step="1"
                    required
                  />
                  {erroresCampo.stock && (
                    <span className="admin-error">{erroresCampo.stock}</span>
                  )}
                </div>
              </div>

              <div className="admin-row">
                <label className="admin-check">
                  <input
                    type="checkbox"
                    checked={form.activo}
                    onChange={(e) => handleChange("activo", e.target.checked)}
                  />
                  Activo
                </label>

                <div className="admin-actions">
                  <button className="admin-btn admin-btn-primary" type="submit">
                    {form.id ? "Actualizar producto" : "Crear producto"}
                  </button>

                  {form.id && (
                    <button
                      type="button"
                      className="admin-btn admin-btn-ghost"
                      onClick={resetForm}
                    >
                      Cancelar edición
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="admin-section">
            <div className="admin-section-head">
              <h2>Lista de productos</h2>
              <span className="admin-badge">{productos.length} items</span>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th className="right">Precio</th>
                    <th className="right">Stock</th>
                    <th>Activo</th>
                    <th className="right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td className="strong">{p.nombre}</td>
                      <td className="muted">{p.descripcion}</td>
                      <td className="right">${p.precio}</td>
                      <td className="right">{p.stock}</td>
                      <td>{p.activo ? "Sí" : "No"}</td>
                      <td className="right">
                        <div className="admin-table-actions">
                          <button
                            type="button"
                            className="admin-btn admin-btn-info"
                            onClick={() => editar(p)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="admin-btn admin-btn-danger"
                            onClick={() => eliminar(p.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {productos.length === 0 && (
                    <tr>
                      <td colSpan="7" className="empty">
                        No hay productos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Admin;
