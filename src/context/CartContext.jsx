import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Cargar carrito desde localStorage al entrar
  useEffect(() => {
    const stored = localStorage.getItem("carrito");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (err) {
        console.error("Error parseando carrito:", err);
        localStorage.removeItem("carrito");
      }
    }
  }, []);

  // Guardar carrito cuando cambien los items
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

  const addItem = (producto) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === producto.id);
      if (existing) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + producto.cantidad }
            : p
        );
      }
      return [...prev, producto];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
