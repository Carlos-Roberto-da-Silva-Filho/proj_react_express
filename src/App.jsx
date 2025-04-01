// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "./utils/CurrencyContext"; // Contexto de câmbio
import { AuthProvider } from "./utils/AuthContext"; // Contexto de autenticação
import NavBar from "./components/NavBar"; // Navbar
import RoutesConfig from "./routes"; // Importação da configuração de rotas
import "./App.css"; // Estilos globais

function App() {
  return (
    <AuthProvider> {/* Envolvendo toda a aplicação no AuthProvider */}
      <CurrencyProvider> {/* Envolvendo também no CurrencyProvider */}
        <Router>
          <NavBar /> {/* Exibe a NavBar em todas as páginas */}
          <RoutesConfig /> {/* Usando RoutesConfig para carregar as rotas */}
        </Router>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
