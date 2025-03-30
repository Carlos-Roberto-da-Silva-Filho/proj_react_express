// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "./utils/CurrencyContext"; // Contexto de câmbio
import { AuthProvider } from "./utils/AuthContext"; // Contexto de autenticação
import NavBar from "./components/NavBar"; // Navbar
import Home from "./pages/Home"; // Página de login
import PublicProducts from "./pages/PublicProducts"; // Página pública de produtos
import PrivateProducts from "./pages/PrivateProducts"; // Página privada de produtos
import PrivateRoute from "./components/PrivateRoute"; // Rota privada
import "./App.css"; // Estilos globais

function App() {
  return (
    <AuthProvider> {/* Envolvendo toda a aplicação no AuthProvider */}
      <CurrencyProvider> {/* Envolvendo também no CurrencyProvider */}
        <Router>
          <NavBar /> {/* Exibe a NavBar em todas as páginas */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Página de login */}
            <Route path="/products-general" element={<PublicProducts />} /> {/* Produtos públicos */}
            <Route
              path="/products-client"
              element={
                <PrivateRoute>
                  <PrivateProducts /> {/* Página privada de produtos */}
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
