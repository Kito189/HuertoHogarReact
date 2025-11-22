import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
</BrowserRouter>

);
