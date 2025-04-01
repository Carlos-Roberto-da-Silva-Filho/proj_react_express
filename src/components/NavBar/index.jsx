// src/components/NavBar/index.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Ícone de carrinho do react-icons
import logo from "../../assets/logo.png"; // Importe a imagem
import { useAuth } from "../../utils/AuthContext"; // Importando o hook do AuthContext
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  // Usando o hook do AuthContext para verificar se o usuário está autenticado
  const { isAuthenticated, logout } = useAuth();

  // Função de logout e redirecionamento
  const handleLogout = () => {
    console.log("Usuário está autenticado: ", isAuthenticated); // Verifica o valor de isAuthenticated
    logout(); // Realiza o logout
    navigate("/"); // Redireciona para a página inicial (Home)
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="navbar-logo-img" />
        </div>
        <div className="navbar-links">
          <Link to="/products-general">Produtos Gerais</Link>
          {isAuthenticated && <Link to="/products-client">Produtos Cliente</Link>}
          <Link to="/">Home</Link>
          
          {/* Exibe o link de Logout ou outros links baseados no estado de autenticação */}
          {isAuthenticated ? (
            <Link to="/" onClick={handleLogout} className="navbar-logout-link">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        {/* Exibe o ícone do carrinho se o usuário estiver autenticado */}
        {isAuthenticated && (
          <div className="navbar-cart">
            <Link to="/carrinho">
              <FaShoppingCart size={30} color="currentColor" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
