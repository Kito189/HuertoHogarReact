import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("carrito");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

  
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

      // No existe → lo agregamos con cantidad inicial
      return [
        ...prev,
        {
          ...producto,
          cantidad: producto.cantidad || 1,
        },
      ];
    });
  };

  
  const removeItem = (id) => {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === id);
      if (index === -1) return prev;

      const copia = [...prev];
      const item = copia[index];

      if (item.cantidad > 1) {
        copia[index] = { ...item, cantidad: item.cantidad - 1 };
      } else {
        copia.splice(index, 1); 
      }

      return copia;
    });
  };

  const clearCart = () => setItems([]);

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
