# BN Soluções - Projeto Corrigido para Deploy no Vercel

Este projeto foi analisado e corrigido para funcionar perfeitamente no Vercel via GitHub.

## 🔧 Correções Realizadas

### 1. Configuração do Vercel
- ✅ **`vercel.json` corrigido para evitar conflito entre `functions` e `builds`:**
  - A configuração agora usa `@vercel/node` diretamente dentro de `builds` para o backend, eliminando a necessidade da seção `functions` separada.
  - A propriedade `distDir` para o frontend foi atualizada para `outputDirectory`.
- ✅ Removido arquivo `vercel.js.json` incorreto (configuração Python)
- ✅ Configurado build do frontend React
- ✅ Configurado serverless functions para o backend Node.js

### 2. Estrutura do Projeto
- ✅ Adicionado `package.json` na raiz para gerenciamento geral
- ✅ Configurado scripts de build para Vercel
- ✅ Atualizado `.gitignore` com todas as exclusões necessárias

### 3. Backend (Node.js/Express)
- ✅ Configurado CORS para produção e desenvolvimento
- ✅ Adicionado export para serverless functions do Vercel
- ✅ Mantida compatibilidade para desenvolvimento local

### 4. Frontend (React/Vite)
- ✅ Adicionado script `vercel-build` no package.json
- ✅ Build testado e funcionando corretamente
- ✅ Configuração do Vite mantida para desenvolvimento

## 🚀 Como Fazer Deploy no Vercel

### Pré-requisitos
- Conta no GitHub
- Conta no Vercel (gratuita)
- GitHub Desktop ou Git Bash instalado

### Passo 1: Subir para o GitHub

#### Usando GitHub Desktop:
1. Abra o GitHub Desktop
2. Clique em "Add an Existing Repository from your Hard Drive"
3. Selecione a pasta do projeto
4. Clique em "Create Repository"
5. Adicione um nome para o repositório (ex: "bn-solucoes-site")
6. Clique em "Publish repository"
7. Marque "Keep this code private" se desejar (opcional)
8. Clique em "Publish Repository"

#### Usando Git Bash:
```bash
# Navegue até a pasta do projeto
cd caminho/para/seu/projeto

# Inicialize o repositório Git
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "Projeto inicial - BN Soluções"

# Conecte com o repositório remoto (substitua SEU_USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/bn-solucoes-site.git

# Envie para o GitHub
git push -u origin main
```

### Passo 2: Deploy no Vercel

1. **Acesse o Vercel:**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com sua conta do GitHub

2. **Importe o Projeto:**
   - Clique em "New Project"
   - Selecione o repositório que você criou
   - Clique em "Import"

3. **Configuração Automática:**
   - O Vercel detectará automaticamente que é um projeto React e Node.js.
   - As configurações do `vercel.json` serão aplicadas automaticamente.
   - Clique em "Deploy"

4. **Aguarde o Deploy:**
   - O processo levará alguns minutos
   - Você verá o progresso em tempo real

5. **Acesse seu Site:**
   - Após o deploy, você receberá uma URL (ex: `https://seu-projeto.vercel.app`)
   - Seu site estará online e funcionando!

### Passo 3: Configurar Variáveis de Ambiente (Importante!)

1. **No Painel do Vercel:**
   - Vá para o seu projeto
   - Clique em "Settings"
   - Clique em "Environment Variables"

2. **Adicione as Variáveis:**
   ```
   OPENAI_API_KEY=sua_chave_da_openai
   EMAIL_USER=seu_email_smtp
   EMAIL_PASS=sua_senha_smtp
   WHATSAPP_TOKEN=seu_token_whatsapp (se aplicável)
   ```

3. **Redeploy:**
   - Após adicionar as variáveis, clique em "Deployments"
   - Clique nos três pontos do último deploy
   - Clique em "Redeploy"

## 🔄 Atualizações Futuras

Para atualizar o site após mudanças:

### GitHub Desktop:
1. Faça suas alterações no código
2. Abra o GitHub Desktop
3. Veja as mudanças na aba "Changes"
4. Adicione uma descrição do commit
5. Clique em "Commit to main"
6. Clique em "Push origin"
7. O Vercel fará o deploy automaticamente

### Git Bash:
```bash
# Adicione as mudanças
git add .

# Faça o commit
git commit -m "Descrição das mudanças"

# Envie para o GitHub
git push
```

## 📁 Estrutura do Projeto

```
projeto/
├── frontend/          # Aplicação React
│   ├── src/          # Código fonte
│   ├── dist/         # Build de produção
│   └── package.json  # Dependências do frontend
├── backend/          # API Node.js/Express
│   ├── server.js     # Servidor principal
│   └── package.json  # Dependências do backend
├── vercel.json       # Configuração do Vercel
├── package.json      # Configuração geral
└── README.md         # Este arquivo
```

## 🛠️ Desenvolvimento Local

Para rodar o projeto localmente:

```bash
# Instalar dependências do frontend
cd frontend
npm install

# Instalar dependências do backend
cd ../backend
npm install

# Rodar frontend (em um terminal)
cd frontend
npm run dev

# Rodar backend (em outro terminal)
cd backend
npm start
```

## 🆘 Solução de Problemas

### Build Falha no Vercel
- Verifique se todas as dependências estão no `package.json`
- Certifique-se de que não há erros no código
- Verifique os logs de build no painel do Vercel

### API não Funciona
- Verifique se as variáveis de ambiente estão configuradas
- Confirme se o arquivo `vercel.json` está correto
- Verifique os logs de função no painel do Vercel

### Site não Carrega
- Verifique se o build foi bem-sucedido
- Confirme se os arquivos estão na pasta `dist/`
- Verifique se não há erros no console do navegador

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no painel do Vercel
2. Confirme se seguiu todos os passos
3. Verifique se as variáveis de ambiente estão corretas
4. Teste o projeto localmente primeiro

---

**✅ Projeto testado e funcionando!**
O site foi testado localmente e está pronto para deploy no Vercel.

