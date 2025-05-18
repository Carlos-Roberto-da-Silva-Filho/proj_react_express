// src/components/Login/index.jsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { useAuth } from "../../contexts/AuthContext"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()

    const userData = {
      username: username,
      password: password,
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Token recebido:", data.accessToken)
        console.log("Tipo de usuário:", data.tipo) // Log para verificar o tipo

        login(data.accessToken, data.tipo) // Passa o token e o tipo
        navigate("/products-client", { replace: true })
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro no login!")
        sessionStorage.removeItem("token")
        navigate("/login")
      }
    } catch (error) {
      setError("Erro na requisição! Tente novamente.")
    }
  }

  return (
    <div className="container">
      <h1>Seja bem-vindo</h1>
      <p>Para acessar a pagina de Produtos Cliente, faça login</p>
      <p>Usuário: "carlos"</p>
      <p>Senha: "password456"</p>
      <p>Para acessar o dashboard Admin, faça login</p>
      <p>Usuário: "Admin_Sergio"</p>
      <p>Senha: "admin123"</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">Usuário e/ou senha errados</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login