# Guia de Deploy - BN Soluções

Este guia fornece instruções detalhadas para fazer deploy do site da BN Soluções em diferentes plataformas.

## 🎯 Opções de Deploy

1. **Vercel** (Recomendado) - Fácil e gratuito
2. **Heroku** - Plataforma robusta
3. **VPS/Servidor Próprio** - Controle total
4. **Netlify** - Alternativa ao Vercel

## 🚀 Deploy no Vercel (Recomendado)

### Pré-requisitos
- Conta no GitHub
- Conta no Vercel
- Git Desktop instalado

### Passo 1: Preparar o Projeto

```bash
# 1. Build do frontend
cd frontend
npm run build

# 2. Copiar arquivos para o backend
cp -r dist/* ../backend/src/static/

# 3. Criar arquivo vercel.json na raiz
cd ..
```

Crie o arquivo `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/src/main.py"
    },
    {
      "src": "/(.*)",
      "dest": "backend/src/main.py"
    }
  ],
  "env": {
    "FLASK_ENV": "production"
  }
}
```

### Passo 2: Configurar Git Desktop

1. **Abra o Git Desktop**
2. **Clone o repositório** (se ainda não fez):
   - File > Clone Repository
   - URL: https://github.com/seu-usuario/bn-solucoes
   - Local Path: escolha uma pasta

3. **Adicione os arquivos:**
   - Copie todos os arquivos do projeto para a pasta clonada
   - No Git Desktop, verá as mudanças

4. **Faça o commit:**
   - Summary: "Deploy inicial BN Soluções"
   - Description: "Site completo com frontend React e backend Flask"
   - Clique em "Commit to main"

5. **Push para GitHub:**
   - Clique em "Push origin"

### Passo 3: Deploy no Vercel

1. **Acesse:** https://vercel.com/
2. **Faça login** com sua conta GitHub
3. **Clique em "New Project"**
4. **Importe o repositório** bn-solucoes
5. **Configure as variáveis de ambiente:**

```env
FLASK_ENV=production
SECRET_KEY=sua_chave_secreta_super_segura
PERPLEXITY_API_KEY=pplx-sua-chave-real
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bn.solucoes20@gmail.com
SMTP_PASSWORD=sua_senha_de_app_gmail
```

6. **Clique em "Deploy"**

### Passo 4: Configurar Domínio (Opcional)

1. **No painel do Vercel:**
   - Vá em Settings > Domains
   - Adicione seu domínio personalizado
   - Configure DNS conforme instruções

## 🔧 Deploy no Heroku

### Pré-requisitos
- Conta no Heroku
- Heroku CLI instalado

### Passo 1: Preparar Projeto

```bash
# 1. Instalar Heroku CLI
# Windows: https://devcenter.heroku.com/articles/heroku-cli
# macOS: brew install heroku/brew/heroku
# Ubuntu: sudo snap install heroku --classic

# 2. Login no Heroku
heroku login

# 3. Criar aplicação
heroku create bn-solucoes-app
```

### Passo 2: Configurar Arquivos

**Procfile** (na raiz):
```
web: cd backend && python src/main.py
```

**runtime.txt** (na raiz):
```
python-3.9.16
```

**requirements.txt** (mover para raiz):
```bash
cp backend/requirements.txt .
```

### Passo 3: Deploy

```bash
# 1. Adicionar remote do Heroku
heroku git:remote -a bn-solucoes-app

# 2. Configurar variáveis de ambiente
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=sua_chave_secreta
heroku config:set PERPLEXITY_API_KEY=pplx-sua-chave
heroku config:set SMTP_USERNAME=bn.solucoes20@gmail.com
heroku config:set SMTP_PASSWORD=sua_senha_app

# 3. Deploy
git add .
git commit -m "Deploy para Heroku"
git push heroku main
```

## 🖥️ Deploy em VPS/Servidor Próprio

### Pré-requisitos
- Servidor Ubuntu 20.04+
- Acesso SSH
- Domínio configurado (opcional)

### Passo 1: Configurar Servidor

```bash
# 1. Conectar via SSH
ssh usuario@seu-servidor.com

# 2. Atualizar sistema
sudo apt update && sudo apt upgrade -y

# 3. Instalar dependências
sudo apt install python3 python3-pip python3-venv nginx git -y

# 4. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Passo 2: Clonar e Configurar Projeto

```bash
# 1. Clonar repositório
cd /var/www
sudo git clone https://github.com/seu-usuario/bn-solucoes.git
sudo chown -R $USER:$USER bn-solucoes
cd bn-solucoes

# 2. Configurar backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 3. Configurar frontend
cd ../frontend
npm install
npm run build
cp -r dist/* ../backend/src/static/

# 4. Configurar variáveis de ambiente
cd ../backend
cp .env.example .env
nano .env  # Editar com suas configurações
```

### Passo 3: Configurar Nginx

```bash
# 1. Criar configuração do Nginx
sudo nano /etc/nginx/sites-available/bn-solucoes
```

Conteúdo do arquivo:
```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static {
        alias /var/www/bn-solucoes/backend/src/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# 2. Ativar site
sudo ln -s /etc/nginx/sites-available/bn-solucoes /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Passo 4: Configurar Serviço Systemd

```bash
# 1. Criar arquivo de serviço
sudo nano /etc/systemd/system/bn-solucoes.service
```

Conteúdo:
```ini
[Unit]
Description=BN Soluções Flask App
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/bn-solucoes/backend
Environment="PATH=/var/www/bn-solucoes/backend/venv/bin"
ExecStart=/var/www/bn-solucoes/backend/venv/bin/python src/main.py
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# 2. Ativar serviço
sudo systemctl daemon-reload
sudo systemctl enable bn-solucoes
sudo systemctl start bn-solucoes
sudo systemctl status bn-solucoes
```

### Passo 5: Configurar SSL (Opcional)

```bash
# 1. Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# 2. Obter certificado SSL
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com

# 3. Configurar renovação automática
sudo crontab -e
# Adicionar linha:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🌐 Deploy no Netlify

### Para Frontend Estático

```bash
# 1. Build do frontend
cd frontend
npm run build

# 2. Criar arquivo _redirects em dist/
echo "/* /index.html 200" > dist/_redirects

# 3. Deploy via Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

## 🔄 Atualizações e Manutenção

### Atualização via Git Desktop

1. **Faça as alterações** no código local
2. **No Git Desktop:**
   - Veja as mudanças
   - Escreva um commit message
   - Clique em "Commit to main"
   - Clique em "Push origin"

3. **Deploy automático** (Vercel/Netlify)
   - O deploy acontece automaticamente
   - Monitore o status no painel

### Atualização Manual (VPS)

```bash
# 1. Conectar ao servidor
ssh usuario@seu-servidor.com

# 2. Atualizar código
cd /var/www/bn-solucoes
git pull origin main

# 3. Atualizar dependências (se necessário)
cd backend
source venv/bin/activate
pip install -r requirements.txt

# 4. Rebuild frontend (se necessário)
cd ../frontend
npm install
npm run build
cp -r dist/* ../backend/src/static/

# 5. Reiniciar serviço
sudo systemctl restart bn-solucoes
```

## 📊 Monitoramento Pós-Deploy

### Verificações Essenciais

```bash
# 1. Teste de conectividade
curl -I https://seu-site.com

# 2. Teste de APIs
curl https://seu-site.com/api/health

# 3. Teste de formulários
# Use Postman ou similar para testar endpoints
```

### Monitoramento Contínuo

1. **Configure alertas** no Vercel/Heroku
2. **Use Google Analytics** para métricas
3. **Configure uptime monitoring:**
   - UptimeRobot (gratuito)
   - Pingdom
   - StatusCake

## 🐛 Solução de Problemas de Deploy

### Erro: "Build Failed"
```bash
# Verifique logs de build
# Vercel: vá no painel > Functions > View Logs
# Heroku: heroku logs --tail
```

### Erro: "Environment Variables"
```bash
# Verifique se todas as variáveis estão configuradas
# Vercel: Settings > Environment Variables
# Heroku: heroku config
```

### Erro: "Database Connection"
```bash
# Para SQLite, certifique-se que o arquivo existe
# Para PostgreSQL, verifique a string de conexão
```

### Erro: "Static Files Not Loading"
```bash
# Verifique se o build do frontend foi copiado
# Verifique configuração do nginx/servidor
```

## 🔒 Configurações de Produção

### Variáveis de Ambiente Obrigatórias

```env
FLASK_ENV=production
SECRET_KEY=chave_super_segura_aleatoria
PERPLEXITY_API_KEY=pplx-sua-chave-real
SMTP_USERNAME=bn.solucoes20@gmail.com
SMTP_PASSWORD=senha_de_app_gmail
DATABASE_URL=sqlite:///leads.db
CORS_ORIGINS=https://seu-dominio.com
```

### Configurações de Segurança

```python
# Em produção, sempre use:
DEBUG = False
TESTING = False
SSL_REQUIRED = True
```

## 📈 Otimizações de Performance

### Frontend
- Minificação automática no build
- Compressão de imagens
- Lazy loading implementado
- CDN para assets estáticos

### Backend
- Gunicorn para produção
- Cache de respostas
- Compressão gzip
- Rate limiting

## ✅ Checklist de Deploy

- [ ] Código testado localmente
- [ ] Build do frontend criado
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados inicializado
- [ ] SSL configurado (produção)
- [ ] Domínio configurado
- [ ] Monitoramento ativo
- [ ] Backup configurado
- [ ] Logs funcionando
- [ ] Performance testada

---

**Deploy realizado com sucesso! 🚀**

Para suporte: bn.solucoes20@gmail.com

