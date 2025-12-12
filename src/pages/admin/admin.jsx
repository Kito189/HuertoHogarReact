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

      <div className="admin-page">
        <div className="admin-panel">
          <div className="admin-header">
            <h2 className="admin-title">Panel de Administración</h2>

            <button onClick={handleLogout} className="admin-logout-btn">
              Cerrar sesión
            </button>
          </div>

          <p className="admin-session">
            Sesión iniciada como{" "}
            <strong>{usuario?.email}</strong> con rol <strong>ADMIN</strong>.
          </p>

          {errorGeneral && <p className="admin-error">{errorGeneral}</p>}

          <h3 className="admin-subtitle">Producto</h3>

          <form onSubmit={handleSubmit} noValidate className="admin-form">
            <div className="admin-form-grid">
              <div className="admin-field">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  className="admin-input"
                  required
                />
                {erroresCampo.nombre && (
                  <p className="admin-field-error">{erroresCampo.nombre}</p>
                )}
              </div>

              <div className="admin-field">
                <input
                  type="text"
                  placeholder="Descripción"
                  value={form.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                  className="admin-input"
                  required
                />
                {erroresCampo.descripcion && (
                  <p className="admin-field-error">
                    {erroresCampo.descripcion}
                  </p>
                )}
              </div>

              <div className="admin-field">
                <input
                  type="number"
                  placeholder="Precio"
                  value={form.precio}
                  onChange={(e) => handleChange("precio", e.target.value)}
                  className="admin-input"
                  required
                  min="0"
                  step="0.01"
                />
                {erroresCampo.precio && (
                  <p className="admin-field-error">{erroresCampo.precio}</p>
                )}
              </div>

              <div className="admin-field">
                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                  className="admin-input"
                  required
                  min="0"
                  step="1"
                />
                {erroresCampo.stock && (
                  <p className="admin-field-error">{erroresCampo.stock}</p>
                )}
              </div>
            </div>

            <div className="admin-form-row">
              <input
                id="chk-activo"
                type="checkbox"
                checked={form.activo}
                onChange={(e) => handleChange("activo", e.target.checked)}
              />
              <label htmlFor="chk-activo">Activo</label>
            </div>

            <button type="submit" className="admin-submit-btn">
              {form.id ? "Actualizar producto" : "Crear producto"}
            </button>
          </form>

          <h3 className="admin-subtitle">Lista de productos</h3>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, index) => (
                  <tr
                    key={p.id}
                    className={index % 2 === 0 ? "admin-row" : "admin-row alt"}
                  >
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion}</td>
                    <td>${p.precio}</td>
                    <td>{p.stock}</td>
                    <td>{p.activo ? "Sí" : "No"}</td>
                    <td className="admin-actions">
                      <button
                        onClick={() => editar(p)}
                        className="admin-btn-edit"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminar(p.id)}
                        className="admin-btn-delete"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {productos.length === 0 && (
                  <tr>
                    <td colSpan="7" className="admin-empty">
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

