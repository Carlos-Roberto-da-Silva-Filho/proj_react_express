import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto
const AuthContext = createContext();

// Hook customizado para acesso fácil ao contexto
export function useAuth() {
  return useContext(AuthContext);
}

// Provider do contexto
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [perfil, setPerfil] = useState(null); // "admin" ou "user"

  // Ao iniciar o app, tenta restaurar sessão do sessionStorage
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedPerfil = sessionStorage.getItem('perfil');

    if (storedToken && storedPerfil) {
      setToken(storedToken);
      setPerfil(storedPerfil);
      setIsAuthenticated(true);
    }
  }, []);

  // Função de login
  const login = (tokenRecebido, perfilRecebido) => {
    sessionStorage.setItem('token', tokenRecebido);
    sessionStorage.setItem('perfil', perfilRecebido);

    setToken(tokenRecebido);
    setPerfil(perfilRecebido);
    setIsAuthenticated(true);
  };

  // Função de logout
  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setPerfil(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      token,
      perfil,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
