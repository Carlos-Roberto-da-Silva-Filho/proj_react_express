import React from "react"
import "./Home.css"

const Home = () => {
  return (
    <>
      <h1>E-commerce com React</h1>
      <ul>
        <li>Projeto foi desenvolvido com o objetivo de aplicar conhecimentos de React na construção de uma aplicação web moderna e funcional.</li>
      </ul>

      <h2>Tecnologias e Recursos</h2>
      <ul>
        <li> <strong>React Hooks:</strong> uso de <code>useState</code> e{" "} <code>useEffect</code> para manipulação de estado e efeitos colaterais. </li>
        <li> <strong>Axios:</strong> biblioteca para requisições HTTP.</li>
        <li> <strong>Context API:</strong> uso de <code>createContext</code> e{" "} <code>useContext</code> para controle global de autenticação (<code>AuthContext</code>) e carrinho de compras (<code>CartContext</code>).
        </li>
        <li> <strong>LocalStorage e SessionStorage:</strong> utilizados para persistência de dados do carrinho e autenticação entre sessões. </li>
        <li> <strong>Autenticação:</strong> simulação de login e logout com uso de token armazenado no <code>sessionStorage</code>. </li>
        <li> <strong>Conversão de moeda:</strong> uso de um contexto separado (<code>CurrencyContext</code>) para conversão de valores de dólar (USD) para real (BRL), com base em taxa gerada por API. </li>
        <li> <strong>Roteamento:</strong> utilização do{" "} <code>react-router-dom</code> para gerenciamento de rotas públicas e privadas. </li>
      </ul>

      <h2>Funcionalidades Desenvolvidas</h2>
      <ul>
        <li>Listagem de produtos obtidos via API externa (DummyJSON).</li>
        <li>Visualização detalhada de cada produto com imagem, preço em BRL e nome. </li>
        <li>Adição ao carrinho com controle individual de quantidade por produto e respectivo resumno </li>
        <li>Autenticação com controle de acesso a páginas protegidas. </li>
        <li> Armazenamento automático e sincronizado do carrinho no{" "} <code>localStorage</code>.</li>
      </ul>
    </>
  )
}

export default Home
