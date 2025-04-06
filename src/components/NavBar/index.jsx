// src/components/NavBar/index.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext"; // ⬅️ Importa o contexto do carrinho
import CartIcon from "../CartIcons";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { clearCart } = useCart(); // ⬅️ Usa a função para limpar o carrinho

  const handleLogout = () => {
    console.log("Usuário está autenticado: ", isAuthenticated);

    clearCart(); // ⬅️ Limpa o estado e localStorage do carrinho
    logout();
    navigate("/");
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

          {isAuthenticated ? (
            <Link to="/" onClick={handleLogout} className="navbar-logout-link">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        {isAuthenticated && (
          <div className="navbar-cart">
            <CartIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

