// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto
const AuthContext = createContext();

// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se o usuário está autenticado (verificando o sessionStorage)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []); // Verifica a autenticação uma vez no carregamento da aplicação

  // Função para fazer login
  const login = (token) => {
    sessionStorage.setItem('token', token); // Armazena o token no sessionStorage
    setIsAuthenticated(true); // Atualiza o estado de autenticação
  };

  // Função para fazer logout
  const logout = () => {
    sessionStorage.removeItem('token'); // Remove o token do sessionStorage
    setIsAuthenticated(false); // Atualiza o estado de autenticação
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
