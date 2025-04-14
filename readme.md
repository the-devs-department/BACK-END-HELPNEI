
# 🧠 Helpnei Back-end

Este é o back-end do projeto **Helpnei**, desenvolvido com **Node.js**, **Express**, **TypeScript** e **TypeORM**, usando **MySQL** como banco de dados. O projeto cria automaticamente o banco e popula dados iniciais (seeds) ao iniciar.

---
  

## 🚀 Requisitos

Antes de começar, você precisa ter instalado na máquina:

- [Node.js](https://nodejs.org/en) (versão recomendada: 18+)

- [MySQL](https://dev.mysql.com/downloads/mysql/) (versão 8+)

- [Git](https://git-scm.com/)

---

## Passo a passo para rodar o projeto localmente
### 1. Clone o repositório

```bash
git  clone  https://github.com/<<SEU-USUARIO>>/back-end-helpnei.git
```

### 2. Instale as dependências

```bash
cd back-end-helpnei
npm install
```

### 3. Configure o Banco de Dados (Arquivo .env)

**Crie um arquivo .env na raiz do projeto com os seguintes dados (modifique conforme seu ambiente MySQL):**
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario <- MODIFICAR
DB_PASSWORD=sua_senha <- MODIFICAR
DB_NAME=HelpneiDB
```

> Dica: o projeto está configurado para dropar e recriar o banco toda vez que roda, então use um banco exclusivo para testes locais!

### 4. Rode o projeto em modo de desenvolvimento
```bash
npm run dev
```  

> O banco de dados será automaticamente criado e populado com os dados iniciais (seeds).

*O servidor ficará disponível em: http://localhost:3000*

### 🗃️ Estrutura dos diretórios
src/
├── config/            # Configurações do banco e reset do banco
├── entity/            # Entidades do TypeORM
├── seed/              # Scripts para popular o banco
├── index.ts           # Ponto de entrada da aplicação