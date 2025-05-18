# 🛒 E-commerce com React

# E-commerce com React - Versão Aprimorada com Painel Administrativo

## Visão Geral

Este projeto representa uma evolução de um e-commerce construído com React, incorporando agora um painel administrativo completo e um backend dedicado em Node.js. O objetivo principal desta versão é demonstrar a implementação de funcionalidades administrativas robustas, autenticação segura e um gerenciamento de dados estruturado.

## Tecnologias Utilizadas

### Frontend

* **React:** Biblioteca JavaScript para construção de interfaces de usuário dinâmicas e interativas.
* **React Hooks:** Utilização de `useState` para gerenciamento de estado local e `useEffect` para lidar com efeitos colaterais.
* **Axios:** Cliente HTTP baseado em Promises para realizar requisições ao backend.
* **React Router DOM:** Biblioteca para roteamento declarativo no frontend, permitindo a navegação entre diferentes seções da aplicação (páginas públicas e privadas).
* **Context API:** Gerenciamento de estado global para autenticação (`AuthContext`) e carrinho de compras (`CartContext`), facilitando o acesso a dados importantes em toda a aplicação.
* **LocalStorage e SessionStorage:** Utilizados para persistência de dados do carrinho e informações de autenticação entre sessões do usuário.
* **Contexto de Moeda (`CurrencyContext`):** Conversão dinâmica de preços de dólar (USD) para real (BRL) utilizando uma taxa de câmbio simulada ou obtida via API.
* **CSS Modules:** Estilização componentizada para evitar conflitos de nomes e facilitar a manutenção do CSS.

### Backend

* **Node.js:** Ambiente de execução JavaScript server-side.
* **Express:** Framework web minimalista e flexível para Node.js, utilizado para construir a API do backend.
* **bcrypt:** Biblioteca para realizar o hash de senhas de forma segura, utilizando o algoritmo bcrypt.
* **jsonwebtoken (JWT):** Utilizado para gerar e verificar tokens de autenticação, protegendo as rotas administrativas.
* **multer:** Middleware Node.js para lidar com o upload de arquivos (como imagens de produtos).
* **cors:** Middleware para habilitar o Cross-Origin Resource Sharing, permitindo que o frontend acesse o backend em diferentes domínios (durante o desenvolvimento).
* **dotenv:** Utilizado para carregar variáveis de ambiente a partir de um arquivo `.env`.

## Funcionalidades Desenvolvidas

### Frontend (Usuário Comum)

* **Listagem de Produtos:** Exibição de produtos obtidos através da API do backend.
* **Visualização Detalhada do Produto:** Página individual para cada produto, mostrando imagem, preço em BRL e descrição.
* **Adição ao Carrinho:** Permite adicionar produtos ao carrinho, com controle individual de quantidade.
* **Resumo do Carrinho:** Exibe os itens adicionados, suas quantidades e o valor total.
* **Autenticação:** Simulação de login e logout, com controle de acesso a páginas protegidas (se implementadas).
* **Persistência do Carrinho:** O estado do carrinho é automaticamente armazenado e sincronizado com o `localStorage`.
* **Navegação:** Utilização de `react-router-dom` para uma experiência de navegação fluida.

### Backend (Administrativo)

* **API Administrativa Protegida:** Rotas de backend protegidas por autenticação JWT, acessíveis apenas por administradores.
* **Gerenciamento de Produtos:**
    * **Listar Produtos:** Retorna uma lista de todos os produtos cadastrados.
    * **Buscar Produto por Nome:** Permite buscar produtos com base em um termo de pesquisa no título.
    * **Buscar Produto por ID:** Retorna os detalhes de um produto específico.
    * **Criar Produto:** Permite adicionar novos produtos ao sistema, incluindo título, preço, estoque e imagem (upload).
    * **Editar Produto:** Permite modificar os detalhes de um produto existente, incluindo a atualização da imagem.
    * **Excluir Produto:** Remove um produto do sistema.
* **Atualização de Estoque:** Endpoint dedicado para atualizar o estoque de um produto específico.
* **Gerenciamento de Usuários (Simulado):** Embora a persistência seja em arquivos JSON, o backend estrutura a separação entre usuários comuns e administradores para controle de acesso.
* **Deleção de Arquivos (Simulado):** Funcionalidade para deletar arquivos JSON específicos (para fins de demonstração de gerenciamento de dados).

### Frontend (Painel Administrativo)

* **Interface de Administração:** Seção dedicada e protegida para administradores.
* **Listagem de Produtos:** Exibe todos os produtos em formato de tabela ou grid.
* **Busca de Produtos:** Permite buscar produtos por nome.
* **Criação de Produtos:** Formulário para adicionar novos produtos com os campos necessários.
* **Edição de Produtos:** Formulário para modificar os detalhes de um produto existente.
* **Exclusão de Produtos:** Botão para remover um produto.
* **Atualização de Estoque:** Interface simples para alterar a quantidade em estoque de um produto.

## Como Rodar o Projeto

### Frontend

1.  **Clone o repositório do frontend:**
    ```bash
    git clone https://github.com/Carlos-Roberto-da-Silva-Filho/proj_react_express.git
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Configure as variáveis de ambiente:**
    * Crie um arquivo `.env` na raiz do seu projeto frontend (se ainda não existir).
    * Adicione a URL do seu backend (onde a API está rodando):
        ```
        REACT_APP_API_URL=http://localhost:3000/
        ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    # ou
    yarn start
    ```
    O frontend estará rodando em `http://localhost:3001` (ou outra porta padrão do Create React App).

### Backend

1.  **Clone o repositório do backend:**
    ```bash
    git clone https://github.com/Carlos-Roberto-da-Silva-Filho/bacck_end_express.git
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Configure as variáveis de ambiente:**
    * Crie um arquivo `.env` na raiz do seu projeto backend.
    * Adicione as variáveis necessárias, como a chave secreta para JWT:
        ```
        JWT_SECRET=sua_chave_secreta_aqui
        PORT=3000 # ou a porta que você deseja usar
        ```
4.  **Inicie o servidor backend:**
    ```bash
    npm start
    # ou
    node index.js # se o seu arquivo principal for index.js
    ```
    O backend estará rodando em `http://localhost:3000` (ou na porta configurada).

## Observações

* Este projeto utiliza arquivos JSON para simular um banco de dados. Em uma aplicação real, seria recomendado o uso de um sistema de gerenciamento de banco de dados (SGBD) como PostgreSQL, MySQL, MongoDB, etc.
* A autenticação é implementada com JWT, onde um token é gerado após o login bem-sucedido e enviado para o frontend, que o utiliza para acessar rotas protegidas no backend.
* O painel administrativo é uma seção separada do frontend, acessível apenas por usuários com a função de administrador (essa lógica é controlada no backend).
* Para testar as funcionalidades administrativas, você precisará criar um usuário com a propriedade `tipo` definida como `"admin"` no seu arquivo `admins.json` no backend (com a senha hasheada usando `bcrypt`).


## Autor

Carlos Roberto da Silva Filho


