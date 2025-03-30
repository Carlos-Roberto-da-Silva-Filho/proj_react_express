import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token")  // Verifica se o token está no sessionStorage

  return token ? children : <Navigate to="/" /> // Se o usuário não estiver logado, redireciona para o login
}

export default PrivateRoute