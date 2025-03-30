// src/routes/index.jsx
import { Routes, Route } from "react-router-dom";
// Ajuste nos caminhos de importação para corresponder à sua estrutura de pastas
import PublicProducts from "../pages/PublicProducts";  // A página pública de produtos está em src/pages/PublicProducts.jsx
import PrivateProducts from "../pages/PrivateProducts";  // A página privada de produtos está em src/pages/PrivateProducts.jsx
import Home from "../pages/Home";  // A página Home (Login) está em src/pages/Home/index.jsx
import PrivateRoute from "../components/PrivateRoute";  // O componente de Rota Privada está em src/components/PrivateRoute.jsx

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* Página de login */}
      
      {/* Rota pública para exibir produtos gerais (públicos) */}
      <Route path="/products-general" element={<PublicProducts />} />
      
      {/* Rota privada que só pode ser acessada se o usuário estiver logado */}
      <Route
        path="/products-client"
        element={
          <PrivateRoute>
            <PrivateProducts />  {/* Página privada de produtos */}
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutesConfig;

