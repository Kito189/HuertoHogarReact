import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import { AuthProvider } from "./auth/AuthContext";   // 👈 carpeta auth
import { CartProvider } from "./context/CartContext";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
