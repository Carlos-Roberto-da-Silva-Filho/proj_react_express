// src/routes/index.jsx
import { Routes, Route } from "react-router-dom"

// Páginas principais
import Home from "../pages/Home"
import Login from "../pages/Login"
import PublicProducts from "../pages/PublicProducts"
import PrivateProducts from "../pages/PrivateProducts"
import Carrinho from "../pages/Carrinho"
import AdminDashboard from "../pages/AdminDashboard" // certifique-se que essa página exista
import NotAuthorized from "../pages/NotAuthorized"   // certifique-se que essa página exista

// Componentes de proteção de rota
import PrivateRoute from "../components/PrivateRoute"
import PrivateRouteAdmin from "../components/PrivateRouteAdmin"

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products-general" element={<PublicProducts />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* Rotas protegidas - usuário logado */}
      <Route
        path="/products-client"
        element={
          <PrivateRoute>
            <PrivateProducts />
          </PrivateRoute>
        }
      />
      <Route
        path="/carrinho"
        element={
          <PrivateRoute>
            <Carrinho />
          </PrivateRoute>
        }
      />

      {/* Rota protegida - apenas administradores */}
      <Route
        path="/admin"
        element={
          <PrivateRouteAdmin>
            <AdminDashboard />
          </PrivateRouteAdmin>
        }
      />
    </Routes>
  )
}

export default RoutesConfig