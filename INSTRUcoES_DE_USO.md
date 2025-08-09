# Instruções de Uso - BN Soluções

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- NPM ou Yarn
- Chave da API OpenAI

### 1. Configuração Inicial

#### Backend
```bash
cd backend
npm install
```

Edite o arquivo `.env` e adicione sua chave da API OpenAI:
```
OPENAI_API_KEY=sua_chave_aqui
PORT=3001
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Executando o Projeto

#### Iniciar o Backend (Terminal 1)
```bash
cd backend
npm start
```
O backend estará rodando em: http://localhost:3001

#### Iniciar o Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
O frontend estará rodando em: http://localhost:3000

### 3. Testando as Funcionalidades

#### Chatbot com IA
1. Acesse o site em http://localhost:3000
2. Clique no ícone do robô no canto inferior direito
3. Digite uma mensagem e teste a resposta da IA
4. Verifique se as respostas estão sendo geradas corretamente

#### Calculadora de ROI
1. Na página inicial, role até a seção "Calculadora de ROI"
2. Preencha os campos:
   - Faturamento Mensal (ex: 50000)
   - Margem de Lucro (ex: 20)
   - Investimento em Marketing (ex: 5000)
   - Plano Escolhido (selecione um dos três)
3. Clique em "Calcular ROI"
4. Verifique se os resultados são exibidos corretamente

### 4. Estrutura do Projeto

```
bn-solucoes-projeto/
├── backend/
│   ├── server.js          # Servidor principal
│   ├── package.json       # Dependências do backend
│   └── .env              # Variáveis de ambiente
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/        # Páginas do site
│   │   └── App.jsx       # Componente principal
│   ├── package.json      # Dependências do frontend
│   └── vite.config.js    # Configuração do Vite
└── shared/               # Arquivos compartilhados
```

### 5. Endpoints da API

#### Chatbot
- **URL:** `POST http://localhost:3001/chat`
- **Body:**
```json
{
  "prompt": "Sua mensagem aqui",
  "session_id": "id_da_sessao"
}
```

#### Calculadora de ROI
- **URL:** `POST http://localhost:3001/roi-calculator`
- **Body:**
```json
{
  "faturamento_mensal": 50000,
  "margem_lucro": 20,
  "investimento_marketing": 5000,
  "plano_escolhido": "estrategico",
  "email": "opcional@email.com"
}
```

### 6. Solução de Problemas

#### Backend não inicia
- Verifique se a porta 3001 não está em uso
- Confirme se a chave da API OpenAI está configurada
- Execute `npm install` novamente

#### Frontend não carrega
- Verifique se a porta 3000 não está em uso
- Execute `npm install` novamente
- Limpe o cache do navegador

#### Chatbot não responde
- Verifique se o backend está rodando
- Confirme se a chave da API OpenAI é válida
- Verifique os logs do console do navegador

#### Calculadora não funciona
- Verifique se o backend está rodando
- Confirme se todos os campos estão preenchidos
- Verifique os logs do console do navegador

### 7. Deploy em Produção

Para deploy em produção (Vercel, Netlify, etc.):

1. **Frontend:** Execute `npm run build` na pasta frontend
2. **Backend:** Configure as variáveis de ambiente na plataforma de deploy
3. **URLs:** Atualize as URLs da API no frontend para o domínio de produção

### 8. Suporte

Em caso de dúvidas ou problemas:
1. Verifique os logs do console
2. Confirme se todas as dependências estão instaladas
3. Verifique se as portas estão disponíveis
4. Teste cada componente separadamente

