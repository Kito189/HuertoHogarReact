import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("carrito");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addItem = (producto) => {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === producto.id);
      if (index !== -1) {
        const copia = [...prev];
        copia[index] = {
          ...copia[index],
          cantidad: copia[index].cantidad + (producto.cantidad || 1),
        };
        return copia;
      }
      return [
        ...prev,
        {
          ...producto,
          cantidad: producto.cantidad || 1,
        },
      ];
    });
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
