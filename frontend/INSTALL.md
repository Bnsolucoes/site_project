# Guia de Instalação - BN Soluções

Este guia fornece instruções passo a passo para instalar e configurar o site da BN Soluções em diferentes ambientes.

## 📋 Requisitos do Sistema

### Mínimos
- **Sistema Operacional:** Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **RAM:** 4GB mínimo, 8GB recomendado
- **Espaço em Disco:** 2GB livres
- **Conexão:** Internet banda larga

### Software Necessário
- **Python:** 3.8 ou superior
- **Node.js:** 16.0 ou superior
- **npm:** 7.0 ou superior (incluído com Node.js)
- **Git:** Última versão estável

## 🔧 Instalação Passo a Passo

### Passo 1: Verificar Pré-requisitos

**Verificar Python:**
```bash
python --version
# ou
python3 --version
```
Deve retornar Python 3.8.x ou superior.

**Verificar Node.js:**
```bash
node --version
npm --version
```
Deve retornar Node v16.x.x ou superior e npm 7.x.x ou superior.

**Verificar Git:**
```bash
git --version
```

### Passo 2: Download do Projeto

**Opção A - Via Git (Recomendado):**
```bash
git clone https://github.com/seu-usuario/bn-solucoes.git
cd bn-solucoes
```

**Opção B - Download ZIP:**
1. Baixe o arquivo ZIP do projeto
2. Extraia em uma pasta de sua escolha
3. Abra o terminal na pasta extraída

### Passo 3: Configuração do Backend

```bash
# Navegue para o diretório do backend
cd backend

# Crie o ambiente virtual Python
python -m venv venv

# Ative o ambiente virtual
# No Windows:
venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate

# Atualize o pip
pip install --upgrade pip

# Instale as dependências
pip install -r requirements.txt
```

### Passo 4: Configuração do Frontend

```bash
# Navegue para o diretório do frontend (em novo terminal)
cd frontend

# Instale as dependências
npm install

# Ou usando yarn (se preferir)
yarn install
```

### Passo 5: Configuração de Variáveis de Ambiente

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
FLASK_ENV=development
SECRET_KEY=sua_chave_secreta_muito_segura_aqui
DATABASE_URL=sqlite:///leads.db
PERPLEXITY_API_KEY=pplx-SUA_CHAVE_AQUI
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bn.solucoes20@gmail.com
SMTP_PASSWORD=sua_senha_de_app_gmail
CORS_ORIGINS=http://localhost:3000,http://localhost:5000
```

**Frontend (.env.local):**
```bash
cd frontend
cp .env.example .env.local
```

Edite o arquivo `.env.local`:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_WHATSAPP_NUMBER=5511940663895
```

### Passo 6: Inicialização do Banco de Dados

```bash
cd backend
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

python -c "
from src.models.lead import db
db.create_all()
print('Banco de dados criado com sucesso!')
"
```

## 🚀 Executando a Aplicação

### Modo Desenvolvimento (Recomendado para desenvolvimento)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

python src/main.py
```
✅ Backend rodando em: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# ou
yarn start
```
✅ Frontend rodando em: http://localhost:3000

### Modo Produção Local

```bash
# 1. Build do frontend
cd frontend
npm run build

# 2. Copiar arquivos para o backend
cp -r dist/* ../backend/src/static/  # Linux/Mac
# ou no Windows:
xcopy /E /I dist\* ..\backend\src\static\

# 3. Executar apenas o backend
cd ../backend
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

python src/main.py
```
✅ Aplicação completa em: http://localhost:5000

## 🔑 Configurações Importantes

### 1. Configuração do Gmail para E-mails

1. **Acesse sua conta Gmail**
2. **Ative a verificação em duas etapas:**
   - Vá em Configurações > Segurança
   - Ative "Verificação em duas etapas"

3. **Gere uma senha de app:**
   - Vá em Configurações > Segurança > Senhas de app
   - Selecione "E-mail" e "Outro"
   - Digite "BN Soluções Site"
   - Copie a senha gerada

4. **Configure no .env:**
   ```env
   SMTP_USERNAME=seu-email@gmail.com
   SMTP_PASSWORD=senha_de_app_gerada
   ```

### 2. Configuração da Perplexity API

1. **Acesse:** https://www.perplexity.ai/
2. **Crie uma conta** ou faça login
3. **Vá para API Settings**
4. **Gere uma nova API Key**
5. **Configure no .env:**
   ```env
   PERPLEXITY_API_KEY=pplx-sua-chave-real-aqui
   ```

### 3. Configuração do Google Analytics

1. **Acesse:** https://analytics.google.com/
2. **Crie uma propriedade** para o site
3. **Copie o Measurement ID** (formato: G-XXXXXXXXXX)
4. **Configure no .env.local:**
   ```env
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

## 🧪 Testando a Instalação

### Teste Básico
```bash
# Teste se o backend está respondendo
curl http://localhost:5000/api/health

# Deve retornar: {"status": "ok"}
```

### Teste Completo
```bash
# Execute o script de teste
chmod +x test_installation.sh
./test_installation.sh
```

### Teste Manual
1. **Acesse:** http://localhost:3000 (dev) ou http://localhost:5000 (prod)
2. **Verifique:**
   - ✅ Página carrega corretamente
   - ✅ Menu de navegação funciona
   - ✅ Calculadora de ROI responde
   - ✅ Formulário de contato envia
   - ✅ Botão WhatsApp redireciona

## 🐛 Solução de Problemas

### Problema: "Python não encontrado"
**Solução:**
```bash
# Windows - Instale via Microsoft Store ou python.org
# macOS - Instale via Homebrew:
brew install python3
# Ubuntu/Debian:
sudo apt update && sudo apt install python3 python3-pip
```

### Problema: "Node não encontrado"
**Solução:**
```bash
# Instale via Node Version Manager (recomendado)
# Windows:
winget install OpenJS.NodeJS
# macOS:
brew install node
# Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Problema: "Erro ao instalar dependências Python"
**Solução:**
```bash
# Atualize pip e setuptools
pip install --upgrade pip setuptools wheel

# Instale dependências uma por uma se necessário
pip install flask flask-cors sqlite3
```

### Problema: "Erro ao instalar dependências Node"
**Solução:**
```bash
# Limpe o cache do npm
npm cache clean --force

# Delete node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Problema: "Porta já em uso"
**Solução:**
```bash
# Encontre o processo usando a porta
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

### Problema: "Banco de dados não criado"
**Solução:**
```bash
cd backend
source venv/bin/activate
python -c "
import os
from src.models.lead import db, app
with app.app_context():
    db.create_all()
    print('Banco criado!')
"
```

## 📱 Configuração Mobile/Responsivo

O site é totalmente responsivo, mas para melhor experiência:

1. **Teste em diferentes dispositivos:**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

2. **Use ferramentas de desenvolvimento:**
   - Chrome DevTools (F12)
   - Responsive Design Mode

## 🔒 Configurações de Segurança

### Desenvolvimento
```env
FLASK_ENV=development
DEBUG=True
```

### Produção
```env
FLASK_ENV=production
DEBUG=False
SECRET_KEY=chave_muito_segura_e_aleatoria
```

## 📊 Monitoramento

### Logs
```bash
# Logs do Flask
tail -f backend/logs/app.log

# Logs do sistema
tail -f /var/log/syslog
```

### Performance
- Use Chrome DevTools > Lighthouse
- Monitore tempo de carregamento
- Verifique uso de memória

## 🆘 Suporte

Se encontrar problemas durante a instalação:

1. **Verifique os logs** de erro
2. **Consulte a seção** de solução de problemas
3. **Entre em contato:**
   - E-mail: bn.solucoes20@gmail.com
   - WhatsApp: (11) 94066-3895

## ✅ Checklist de Instalação

- [ ] Python 3.8+ instalado
- [ ] Node.js 16+ instalado
- [ ] Projeto baixado/clonado
- [ ] Ambiente virtual Python criado
- [ ] Dependências Python instaladas
- [ ] Dependências Node.js instaladas
- [ ] Arquivo .env configurado
- [ ] Arquivo .env.local configurado
- [ ] Banco de dados inicializado
- [ ] Backend rodando (porta 5000)
- [ ] Frontend rodando (porta 3000)
- [ ] Testes básicos passando
- [ ] Gmail configurado
- [ ] Perplexity API configurada
- [ ] Google Analytics configurado

---

**Instalação concluída com sucesso! 🎉**

