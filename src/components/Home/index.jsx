import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"

const Home = () => {
  const [email, setEmail] = useState("") // Estado para o email
  const [password, setPassword] = useState("") // Estado para a senha
  const [error, setError] = useState("") // Estado para mensagem de erro
  const navigate = useNavigate() // Hook para navegação

  // Função para capturar o envio do formulário
  const handleLogin = async (e) => {
    e.preventDefault() // Previne o comportamento padrão do formulário (recarregar a página)

    const userData = {
      email: email,
      password: password,
    }

    try {
        const response = await fetch("https://reqres.in/api/login", {
          method: "POST", // Método HTTP
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData), // Envia os dados do usuário como JSON
        })
  
        if (response.ok) {
          const data = await response.json(); // Converte a resposta para JSON
          // Armazena o token no localStorage
          localStorage.setItem("token", data.token)
          alert("Login bem-sucedido!")
          navigate("/privada")
          // Você pode redirecionar o usuário para outra página aqui, se necessário
        } else {
          const errorData = await response.json()
          setError(errorData.error || "Erro no login!") // Mensagem de erro, se houver
          localStorage.removeItem("token") // Remove qualquer token armazenado antes de redirecionar
          navigate("/publica") // Se der erro, vai para a página pública
        }
      } catch (error) {
        setError("Erro na requisição! Tente novamente.") // Erro de rede
      }
    }

  return (
    <div className="container">
      <h1>Seja bem-vindo</h1>
      <p>Copie o que está entre aspas para logar</p>
      <p>Login: "eve.holt@reqres.in"</p>
      <p>Senha: "cityslicka"</p>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email 
        />

        <input type="password" placeholder="Senha" className="input-field"
        value={password} 
        onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
        />
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe mensagem de erro */}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Home