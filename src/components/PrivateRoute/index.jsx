import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token")  // Verifica se o token está no localStorage

  return token ? children : <Navigate to="/" /> // Se o usuário não estiver logado, redireciona para o login
};

export default PrivateRoute