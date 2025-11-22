import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (producto) => {
    setItems((prev) => [...prev, producto]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setItems([]);

  const value = { items, addItem, removeItem, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// ESTE es el hook que debes usar en las pantallas
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de un <CartProvider>");
  }
  return ctx;
};
