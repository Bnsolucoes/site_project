# 📧 Configuração de E-mail e WhatsApp - BN Soluções

## 🚀 Funcionalidades Implementadas

### ✅ 1. Envio de E-mail Automático
- **Notificação para a empresa:** E-mail detalhado com informações do lead
- **Confirmação para o cliente:** E-mail de agradecimento e informações de contato
- **Templates profissionais:** Design responsivo e personalizado

### ✅ 2. Integração com WhatsApp
- **URL automática:** Geração de link personalizado para cada lead
- **Mensagem pré-formatada:** Texto personalizado com dados do lead
- **Acesso direto:** Botão no dashboard para contato imediato

### ✅ 3. Dashboard Admin
- **Visualização de leads:** Lista completa com filtros
- **Estatísticas:** Métricas em tempo real
- **Gerenciamento:** Edição de status e observações
- **Exportação:** Download em CSV

## ⚙️ Configuração Necessária

### 1. Configuração do Gmail

#### Passo 1: Ativar Verificação em Duas Etapas
1. Acesse sua conta Gmail
2. Vá em **Configurações** > **Segurança**
3. Ative **"Verificação em duas etapas"**

#### Passo 2: Gerar Senha de App
1. Vá em **Configurações** > **Segurança** > **Senhas de app**
2. Selecione **"E-mail"** e **"Outro"**
3. Digite **"BN Soluções Site"**
4. Copie a senha gerada (16 caracteres)

#### Passo 3: Configurar no Backend
Crie um arquivo `.env` na pasta `backend/`:

```env
# Configurações do Servidor
PORT=3001

# OpenAI API (para o chatbot)
OPENAI_API_KEY=sua_chave_openai_aqui

# Configurações de E-mail (Gmail)
SMTP_USERNAME=bn.solucoes20@gmail.com
SMTP_PASSWORD=sua_senha_de_app_gerada_aqui

# Configurações do WhatsApp
WHATSAPP_NUMBER=5511940663895

# Configurações de CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5000
```

### 2. Instalar Dependências

```bash
cd backend
npm install
```

### 3. Reiniciar o Servidor

```bash
cd backend
npm start
```

## 📧 Como Funciona o Sistema de E-mails

### E-mail para a Empresa
- **Assunto:** 🎯 Novo Lead Recebido - [Nome]
- **Conteúdo:**
  - Dados completos do lead
  - Mensagem original
  - Botões para WhatsApp e E-mail
  - Metadados (origem, data/hora)

### E-mail para o Cliente
- **Assunto:** ✅ Mensagem Recebida - BN Soluções
- **Conteúdo:**
  - Agradecimento
  - Horários de atendimento
  - Link para WhatsApp
  - Informações da empresa

## 📱 Como Funciona a Integração WhatsApp

### No Dashboard
1. Clique em **"WhatsApp"** em qualquer lead
2. Abre automaticamente o WhatsApp com mensagem personalizada
3. Mensagem inclui nome e e-mail do lead

### URL Gerada
```
https://wa.me/5511940663895?text=Olá! Vi que recebemos um lead de João (joao@email.com). Posso ajudar com o atendimento?
```

## 🎛️ Como Usar o Dashboard

### Acessar Dashboard
- URL: `http://localhost:3000/dashboard`
- Visualização completa de todos os leads

### Funcionalidades Disponíveis
- **Visualizar leads:** Lista com todos os dados
- **Editar status:** Novo, Contatado, Proposta, Fechado, Perdido
- **Adicionar observações:** Notas sobre cada lead
- **Exportar CSV:** Download de todos os leads
- **Estatísticas:** Métricas em tempo real

### Status dos Leads
- 🆕 **Novo:** Lead recebido, aguardando contato
- 📞 **Contatado:** Primeiro contato realizado
- 📋 **Proposta:** Proposta enviada
- ✅ **Fechado:** Negócio fechado
- ❌ **Perdido:** Lead perdido

## 🔧 Endpoints da API

### Leads
- `POST /api/leads` - Criar novo lead
- `GET /api/leads` - Listar todos os leads
- `PUT /api/leads/:id` - Atualizar lead

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas

### WhatsApp
- `POST /api/whatsapp/notify` - Gerar URL do WhatsApp

## 🧪 Testando o Sistema

### 1. Teste de E-mail
1. Preencha o formulário de contato
2. Verifique o console do backend
3. Confirme se os e-mails foram enviados

### 2. Teste do Dashboard
1. Acesse `http://localhost:3000/dashboard`
2. Verifique se os leads aparecem
3. Teste editar status e observações

### 3. Teste do WhatsApp
1. No dashboard, clique em "WhatsApp"
2. Confirme se abre o WhatsApp com mensagem correta

## 🐛 Solução de Problemas

### E-mail não enviando
- Verifique se a senha de app está correta
- Confirme se a verificação em duas etapas está ativa
- Verifique os logs no console do backend

### Dashboard não carrega
- Confirme se o backend está rodando na porta 3001
- Verifique se o proxy está configurado no Vite
- Limpe o cache do navegador

### WhatsApp não abre
- Verifique se o número está correto
- Confirme se o WhatsApp está instalado
- Teste a URL manualmente

## 📊 Monitoramento

### Logs Importantes
```
🎯 Novo lead recebido: { dados do lead }
📧 Status dos e-mails: { notificação: ✅, confirmação: ✅ }
✅ E-mail de notificação enviado: messageId
✅ E-mail de confirmação enviado para o cliente: messageId
```

### Métricas do Dashboard
- Total de leads
- Leads hoje
- Leads do mês
- Leads por status
- Leads por origem

## 🔒 Segurança

### Recomendações
- Use senhas de app (não senha normal do Gmail)
- Mantenha o arquivo `.env` seguro
- Não compartilhe credenciais
- Use HTTPS em produção

### Variáveis Sensíveis
- `SMTP_PASSWORD`: Senha de app do Gmail
- `OPENAI_API_KEY`: Chave da API OpenAI
- `WHATSAPP_NUMBER`: Número do WhatsApp

## 🚀 Próximos Passos

### Melhorias Futuras
1. **Banco de dados:** Substituir array por banco real
2. **Autenticação:** Login para o dashboard
3. **Notificações push:** Alertas em tempo real
4. **Relatórios:** Gráficos e análises avançadas
5. **Integração CRM:** Conexão com sistemas externos

---

**Sistema configurado com sucesso! 🎉**

Para suporte: bn.solucoes20@gmail.com 