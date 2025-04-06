// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'

// Criação do contexto
const AuthContext = createContext()

// Hook nomeado fora do componente (ajuda o Fast Refresh a entender)
export function useAuth() {
  return useContext(AuthContext)
}

// Provider do contexto
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verifica o token ao carregar a aplicação
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (token) => {
    sessionStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
