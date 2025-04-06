// src/routes/index.jsx
import { Routes, Route } from "react-router-dom"
// Ajuste nos caminhos de importação para corresponder à sua estrutura de pastas
import PublicProducts from "../pages/PublicProducts"  // A página pública de produtos está em src/pages/index.jsx
import PrivateProducts from "../pages/PrivateProducts"  // A página privada de produtos está em src/pages/index.jsx
import Home from "../pages/Home" // A página home está em src/pages/Home/index.jsxx
import Login from "../pages/Login"  // A página login está em src/pages/Login/index.jsx
import Carrinho from "../pages/Carrinho"

import PrivateRoute from "../components/PrivateRoute"  // O componente de Rota Privada está em src/components/index.jsx

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* Página Home */}
      <Route path="/login" element={<Login />} />  {/* Página de Login */}
      <Route path="/products-general" element={<PublicProducts />} />
      <Route
        path="/products-client"
        element={
          <PrivateRoute>
            <PrivateProducts />  
          </PrivateRoute>
        }
      />{/* Página privada de produtos */}

      <Route
        path="/carrinho"
        element={
          <PrivateRoute> 
            <Carrinho />
          </PrivateRoute>
        }
      /> {/* Página privada do carrinho */}
      
    </Routes>
  )
}

export default RoutesConfig

