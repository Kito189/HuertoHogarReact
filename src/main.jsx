import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes.jsx";
import "./index.css";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
