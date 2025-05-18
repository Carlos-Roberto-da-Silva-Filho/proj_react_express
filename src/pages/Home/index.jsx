import React from "react"
import "./Home.css"

const Home = () => {
  return (
    <>
      <h1>E-commerce com React - Integrado ao Back End com Express</h1>
      <ul>
        <li>Este projeto evoluiu para integrar funcionalidades administrativas robustas e um backend dedicado para gerenciamento de dados seguro.</li>
      </ul>

      <h2>Aprimoramentos e Arquitetura Backend</h2>
      <ul>
        <li> <strong>Backend Node.js:</strong> implementação de um servidor backend com Express para manipulação de dados e lógica administrativa.</li>
        <li> <strong>Autenticação Segura:</strong> utilização de <code>bcrypt</code> para hash de senhas, garantindo maior segurança no armazenamento e autenticação de usuários.</li>
        <li> <strong>API Administrativa:</strong> criação de rotas protegidas para gerenciar produtos (listar, buscar, criar, editar, excluir) e atualizar estoque.</li>
        <li> <strong>Persistência de Dados:</strong> uso de arquivos JSON para simular um banco de dados, facilitando o armazenamento e a manipulação dos dados dos produtos e usuários.</li>
        <li> <strong>Middleware de Autenticação (JWT):</strong> implementação para proteger as rotas administrativas, verificando a validade dos tokens de acesso.</li>
        <li> <strong>Upload de Imagens (Multer):</strong> integração para permitir o upload de imagens de produtos através do painel administrativo.</li>
        <li> <strong>Controle de Acesso:</strong> separação de usuários comuns e administradores, com diferentes níveis de acesso às funcionalidades da aplicação.</li>
      </ul>

      <h2>Novas Funcionalidades Administrativas</h2>
      <ul>
        <li>Painel de administração dedicado para gerenciamento completo dos produtos.</li>
        <li>Listagem, busca e visualização detalhada de produtos no painel administrativo.</li>
        <li>Funcionalidade de criar novos produtos com título, preço, estoque e imagem.</li>
        <li>Opção de editar informações de produtos existentes, incluindo a atualização da imagem.</li>
        <li>Exclusão de produtos do sistema através do painel administrativo.</li>
        <li>Interface para atualizar o estoque de produtos de forma rápida e eficiente.</li>
      </ul>
    </>
  )
}

export default Home