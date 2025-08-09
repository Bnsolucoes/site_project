# BN Soluções - Site Full-Stack

Um projeto completo de site institucional para a BN Soluções, empresa especializada em marketing digital para PMEs. O projeto inclui frontend em React.js, backend em Flask/Python, banco de dados SQLite, integração com IA via Perplexity API, sistema de leads, chatbot e calculadora de ROI.

## 🚀 Características Principais

- **Frontend React.js** com design responsivo e moderno
- **Backend Flask/Python** com APIs RESTful
- **Banco SQLite** para armazenamento de leads e dados
- **Integração Perplexity API** para funcionalidades de IA
- **Sistema de Leads** com notificações por e-mail
- **Calculadora de ROI** interativa
- **Chatbot** com escalação para WhatsApp
- **SEO otimizado** para palavras-chave "soluções PMEs SP"
- **Compliance LGPD** implementado
- **Google Analytics** configurado

## 📋 Pré-requisitos

- Python 3.8+ instalado
- Node.js 16+ instalado
- npm ou yarn
- Git (para deploy via Git Desktop)

## 🛠️ Instalação Local

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd bn_solucoes
```

### 2. Configuração do Backend

```bash
# Navegue para o diretório do backend
cd backend

# Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instale as dependências
pip install -r requirements.txt

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 3. Configuração do Frontend

```bash
# Navegue para o diretório do frontend
cd ../frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações
```

## 🚀 Executando Localmente

### Opção 1: Desenvolvimento (Frontend e Backend separados)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python src/main.py
```
O backend estará disponível em: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
O frontend estará disponível em: http://localhost:3000

### Opção 2: Produção Local (Integrado)

```bash
# Build do frontend
cd frontend
npm run build

# Copiar arquivos para o backend
cp -r dist/* ../backend/src/static/

# Executar apenas o backend
cd ../backend
source venv/bin/activate
python src/main.py
```
Aplicação completa disponível em: http://localhost:5000

## 📁 Estrutura do Projeto

```
bn_solucoes/
├── backend/                 # Backend Flask
│   ├── src/
│   │   ├── main.py         # Arquivo principal
│   │   ├── models/         # Modelos de dados
│   │   ├── routes/         # Rotas da API
│   │   ├── static/         # Arquivos estáticos (frontend build)
│   │   └── templates/      # Templates HTML
│   ├── venv/               # Ambiente virtual Python
│   ├── requirements.txt    # Dependências Python
│   └── .env               # Variáveis de ambiente
├── frontend/               # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── assets/        # Imagens e recursos
│   │   └── App.jsx        # Componente principal
│   ├── dist/              # Build de produção
│   ├── package.json       # Dependências Node.js
│   └── .env.local         # Variáveis de ambiente
├── logo.png               # Logo da empresa
├── favicon.png            # Favicon
└── README.md              # Esta documentação
```

## ⚙️ Configuração

### Variáveis de Ambiente

**Backend (.env):**
```env
FLASK_ENV=development
SECRET_KEY=sua_chave_secreta_aqui
DATABASE_URL=sqlite:///leads.db
PERPLEXITY_API_KEY=pplx-SUA_CHAVE_AQUI
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bn.solucoes20@gmail.com
SMTP_PASSWORD=sua_senha_app_gmail
```

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Configuração do E-mail

1. Acesse sua conta Gmail
2. Ative a verificação em duas etapas
3. Gere uma senha de app específica
4. Use essa senha no arquivo .env do backend

### Configuração da Perplexity API

1. Acesse https://www.perplexity.ai/
2. Crie uma conta e obtenha sua API key
3. Substitua 'pplx-SUA_CHAVE_AQUI' no arquivo .env

## 🧪 Testes

### Testes do Backend
```bash
cd backend
source venv/bin/activate
python -m pytest tests/
```

### Testes do Frontend
```bash
cd frontend
npm test
```

### Teste Manual Completo
```bash
# Execute o script de teste
chmod +x test_complete.sh
./test_complete.sh
```

## 📱 Funcionalidades

### Páginas Implementadas
- **Home** - Hero banner, features, calculadora ROI, testimonials
- **Serviços** - Planos (Essencial, Estratégico, Premium), FAQ
- **Soluções** - Infográficos e casos de uso
- **Sobre** - História da empresa, equipe, valores
- **Blog** - Artigos sobre marketing digital
- **Contato** - Formulário, informações de contato

### Funcionalidades Especiais
- **Calculadora ROI** - Calcula retorno sobre investimento
- **Sistema de Leads** - Captura e notificação automática
- **Chatbot IA** - Atendimento automatizado com escalação
- **WhatsApp Integration** - Botão flutuante e redirecionamento
- **Google Analytics** - Rastreamento de interações
- **SEO Otimizado** - Meta tags, sitemap, estrutura semântica

### Integrações
- **Perplexity API** - IA para chatbot e automações
- **Gmail SMTP** - Notificações de leads por e-mail
- **WhatsApp Business** - Atendimento direto
- **Google Analytics** - Métricas e conversões

## 🌐 Deploy

### Deploy no Vercel (Recomendado)

1. **Preparação:**
```bash
# Build do frontend
cd frontend
npm run build
cp -r dist/* ../backend/src/static/
```

2. **Git Desktop:**
- Abra o Git Desktop
- Clone este repositório
- Faça commit das alterações
- Push para o repositório remoto

3. **Vercel:**
- Conecte sua conta GitHub ao Vercel
- Importe o repositório
- Configure as variáveis de ambiente
- Deploy automático

### Deploy Manual

1. **Servidor VPS:**
```bash
# Instale dependências no servidor
sudo apt update
sudo apt install python3 python3-pip nginx

# Clone e configure o projeto
git clone <seu-repositorio>
cd bn_solucoes

# Configure o backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure nginx
sudo cp nginx.conf /etc/nginx/sites-available/bn-solucoes
sudo ln -s /etc/nginx/sites-available/bn-solucoes /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# Execute com gunicorn
gunicorn --bind 0.0.0.0:5000 src.main:app
```

## 📊 Monitoramento

### Google Analytics
- Configurado para rastrear:
  - Pageviews
  - Conversões de leads
  - Interações com calculadora
  - Cliques no WhatsApp
  - Downloads e formulários

### Logs do Sistema
```bash
# Logs do backend
tail -f backend/logs/app.log

# Logs do nginx (se usando)
tail -f /var/log/nginx/access.log
```

## 🔒 Segurança e LGPD

### Medidas Implementadas
- **Criptografia** de dados sensíveis
- **Validação** de entrada em todos os formulários
- **Rate limiting** nas APIs
- **HTTPS** obrigatório em produção
- **Política de Privacidade** implementada
- **Consentimento** de cookies e dados
- **Direito ao esquecimento** via API

### Compliance LGPD
- Coleta mínima de dados necessários
- Consentimento explícito do usuário
- Opção de exclusão de dados
- Relatório de dados coletados
- Notificação de vazamentos (se aplicável)

## 🛠️ Manutenção

### Backup do Banco
```bash
# Backup automático diário
sqlite3 backend/leads.db ".backup backup_$(date +%Y%m%d).db"
```

### Atualizações
```bash
# Atualizar dependências Python
cd backend
pip install -r requirements.txt --upgrade

# Atualizar dependências Node.js
cd frontend
npm update
```

### Monitoramento de Performance
- Use ferramentas como New Relic ou DataDog
- Configure alertas para downtime
- Monitore uso de recursos

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o projeto:

- **E-mail:** bn.solucoes20@gmail.com
- **WhatsApp:** (11) 94066-3895
- **Documentação:** Consulte este README
- **Issues:** Use o sistema de issues do GitHub

## 📄 Licença

Este projeto é propriedade da BN Soluções. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a BN Soluções**

