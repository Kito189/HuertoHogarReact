import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes.jsx' // Importamos las rutas
import './index.css' // O './App.css', según donde tengas tus estilos

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)