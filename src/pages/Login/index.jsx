// src/components/Login/index.jsx

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

import { useAuth } from "../../contexts/AuthContext"

const Login = () => {
  const [username, setUsername] = useState("") // Estado para o username
  const [password, setPassword] = useState("") // Estado para a senha
  const [error, setError] = useState("") // Estado para mensagem de erro
  const navigate = useNavigate() // Hook para navegação

  const { login } = useAuth()

  // Função para capturar o envio do formulário
  const handleLogin = async (e) => {
    e.preventDefault() // Previne o comportamento padrão do formulário (recarregar a página)

    const userData = {
      username: username,
      password: password,
    }

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST", // Método HTTP
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Envia os dados do usuário como JSON
      })

      if (response.ok) {
        const data = await response.json(); // Converte a resposta para JSON
        console.log("Token recebido:", data.accessToken)

        // Armazena o token no sessionStorage
        sessionStorage.setItem("token", data.accessToken)
        login(data.accessToken);
        navigate("/products-client", {replace: true}) // Redireciona após login
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Erro no login!") // Mensagem de erro, se houver
        sessionStorage.removeItem("token") // Remove qualquer token armazenado antes de redirecionar
        navigate("/login") // Se der erro, mantém na página de login
      }
    } catch (error) {
      setError("Erro na requisição! Tente novamente."); // Erro de rede
    }
  }

  return (
    <div className="container">
      <h1>Seja bem-vindo</h1> 
      <p>Para acessar a pagina de Produtos Cliente, faça login</p>
      <p>Usuário: "michaelw"</p>
      <p>Senha: "michaelwpass"</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Atualiza o estado do usuário
        />

        <input
          type="password"
          placeholder="Senha"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
        />
        {error && <p className="error-message">Usuário e/ou senha errados</p>} {/* Exibe mensagem de erro */}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
