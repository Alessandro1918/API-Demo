# blogpostAPI

## 🚀 Projeto
Um protótipo de API para salvar, ler, editar e deletar posts de diferentes autores em um blog

## 🛠️ Tecnologias
- [JWT](https://jwt.io) (Autenticação de usuários por meio de tokens assinados pelo servidor da API)
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org)

## 🗂️ Utilização

### 🐑🐑 Clonando o repositório:

```bash
  $ git clone https://github.com/Alessandro1918/blogpostAPI.git
```

### 📥 Baixando as dependências:

```bash
  $ cd blogpostAPI

  # Download dependencies to node_modules
  $ npm install
```

### ▶️ Rodando o App:

```bash
  # Start the project:
  $ npm start
  
  # Login
  # Check usage and comments at file services/authService.js
  $ POST http://localhost:3000/login       # Search the user in the db and returns a jtw token used to access authenticated routes. 
  
  # Non-authenticated routes
  # Check usage and comments at file services/postsService.js
  $ GET http://localhost:3000/posts/                  # Returns all posts from the db
  $ GET http://localhost:3000/posts/bolo-de-laranja   # Returns a single post from the db, filtered by it's slug
  
  # Authenticated routes
  # Check usage and comments at file services/postsService.js
  $ POST   http://localhost:3000/posts/                  # Save a post in the db
  $ PUT    http://localhost:3000/posts/bolo-de-laranja   # Edit a post, filtered by it's slug
  $ DELETE http://localhost:3000/posts/bolo-de-laranja   # Removes a post from the db, filtered by it's slug
```
