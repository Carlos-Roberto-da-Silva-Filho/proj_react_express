import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import CartIcon from "../CartIcons";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, perfil } = useAuth();
  const { clearCart } = useCart();

  const handleLogout = () => {
    console.log("Usuário está autenticado: ", isAuthenticated);
    clearCart();
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" className="navbar-logo-img" />
        </Link>
        <div className={`navbar-links ${!isAuthenticated ? 'navbar-links-unauthenticated' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/products-general">Produtos Gerais</Link>
          {isAuthenticated && <Link to="/products-client">Produtos Cliente</Link>}
          {isAuthenticated && perfil === "admin" && (
            <Link to="/admin" className="navbar-admin-link">
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <Link to="/" onClick={handleLogout} className="navbar-logout-link">
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {isAuthenticated && (
            <div className="navbar-cart">
              <CartIcon />
            </div>
          )}
        </div>
        <div className="navbar-right">
          {/* Espaço reservado para elementos à direita, se necessário */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;