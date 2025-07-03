# 🚀 Como Executar o Projeto LetterBooks

## Pré-requisitos
- Node.js 16+
- PostgreSQL
- npm ou yarn

## 📋 Passos para Execução

### 1. Configurar Banco de Dados
```bash
# Instalar dependências do backend
cd backend
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env no diretório backend com:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/letterbooks"
SECRET="sua_chave_secreta_jwt"

# Gerar cliente Prisma e aplicar migrações
npx prisma generate
npx prisma db push
```

### 2. Executar Backend
```bash
# No diretório backend
npm run dev
```
O backend estará rodando em: `http://localhost:3000`

### 3. Executar Frontend
```bash
# Em outro terminal, no diretório frontend
cd frontend
npm install
npm start
```
O frontend estará rodando em: `http://localhost:3001`

### 4. Acessar a Aplicação
- Frontend: `http://localhost:3001`
- Backend API: `http://localhost:3000`

## 🔧 Solução de Problemas Comuns

### Erro de CORS
Se houver problemas de CORS, verifique se o backend tem o middleware CORS configurado.

### Erro de Conexão com Banco
Verifique se:
1. PostgreSQL está rodando
2. As credenciais no DATABASE_URL estão corretas
3. O banco de dados existe

### Erro de Porta em Uso
Se a porta 3000 estiver ocupada:
- O React automaticamente usará a porta 3001
- Certifique-se de que o backend está na porta 3000

### Erro de Dependências
```bash
# Limpar e reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

## 📝 Testando a Aplicação

1. **Criar uma conta**: Acesse `/register` e crie um usuário
2. **Fazer login**: Use as credenciais criadas
3. **Adicionar livros**: Se for admin, use o botão "Adicionar Livro"
4. **Favoritar livros**: Clique no coração nos cards dos livros
5. **Ver favoritos**: Acesse a página de favoritos

## 🎯 Funcionalidades Testadas

- ✅ Registro e login de usuários
- ✅ CRUD de livros (para admins)
- ✅ Sistema de favoritos
- ✅ Painel administrativo
- ✅ Interface responsiva
- ✅ Autenticação JWT 