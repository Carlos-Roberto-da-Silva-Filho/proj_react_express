# 🛒 E-commerce com React

Este projeto é uma aplicação web de e-commerce desenvolvida com **React**, com o objetivo de aplicar conceitos modernos da biblioteca em um ambiente funcional, modular e com foco em boas práticas.

## 🚀 Funcionalidades

- ✅ Listagem de produtos obtidos via API externa (DummyJSON)
- ✅ Visualização de detalhes dos produtos: imagem, título e preço convertido para BRL
- ✅ Adição de produtos ao carrinho com controle de quantidade
- ✅ Carrinho de compras com resumo e cálculo do total
- ✅ Autenticação de usuário (login/logout)
- ✅ Controle de rotas públicas e privadas
- ✅ Persistência de dados no localStorage e sessionStorage

## 🧰 Tecnologias e Recursos

- **React** com Hooks: `useState`, `useEffect`
- **Axios** para consumo de APIs
- **Context API**:
  - `AuthContext` para autenticação
  - `CartContext` para o carrinho de compras
  - `CurrencyContext` para conversão de moedas (USD ➡️ BRL)
- **React Router DOM** para navegação entre rotas públicas e protegidas
- **LocalStorage e SessionStorage** para persistência entre sessões

## 💳 Conversão de Moeda

Os preços originais em dólar (USD) são convertidos em tempo real para reais (BRL) com base em uma taxa de câmbio simulada obtida via API e controlada pelo `CurrencyContext`, através da API pública: 
🔗 [https://economia.awesomeapi.com.br/json/last/USD-BRL](https://economia.awesomeapi.com.br/json/last/USD-BRL)

## 🔐 Autenticação

A autenticação simula login/logout utilizando token fictício armazenado no `sessionStorage`. Apenas usuários autenticados podem acessar determinadas rotas, como a de produtos privados e o carrinho.

## 📦 API de Produtos

Os dados dos produtos são consumidos a partir da API pública:  
🔗 [https://dummyjson.com/products](https://dummyjson.com/products)

## 👨‍💻 Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/Carlos-Roberto-da-Silva-Filho/proj_react

# Instale as dependências
npm install

# Rode o projeto
npm run dev
