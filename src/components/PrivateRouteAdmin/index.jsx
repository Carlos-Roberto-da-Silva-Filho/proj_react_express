import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const PrivateRouteAdmin = ({ children }) => {
  const { isAuthenticated, perfil } = useAuth()

  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Se não for um administrador, redireciona para "não autorizado"
  if (perfil !== 'admin') {
    return <Navigate to="/not-authorized" replace />
  }

  // Se estiver autenticado e for admin, renderiza os filhos (a rota protegida)
  return children
}

export default PrivateRouteAdmin
