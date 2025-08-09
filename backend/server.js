const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const cors = require('cors');
const { enviarNotificacaoLead, enviarConfirmacaoCliente, initializeTransporter } = require('./emailService');

// Carregar variáveis de ambiente PRIMEIRO
dotenv.config();

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-domain.vercel.app', 'https://*.vercel.app']
    : 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.json());

// Array para armazenar leads (simulando banco de dados)
let leads = [];

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Inicializar transporter de e-mail
initializeTransporter();

// ================= ROTAS =================

// Enviar lead
app.post('/api/leads', async (req, res) => {
  const { nome, email, telefone, empresa, mensagem, origem } = req.body;
  try {
    if (!nome || !email || !mensagem) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    const lead = {
      id: Date.now(),
      nome,
      email,
      telefone: telefone || 'Não informado',
      empresa: empresa || 'Não informado',
      mensagem,
      origem: origem || 'website',
      status: 'novo',
      data_criacao: new Date().toISOString(),
      data_atualizacao: new Date().toISOString()
    };

    leads.push(lead);

    Promise.all([
      enviarNotificacaoLead(lead).catch(() => false),
      enviarConfirmacaoCliente(lead).catch(() => false)
    ]);

    res.status(200).json({ success: true, message: 'Mensagem recebida com sucesso!', lead_id: lead.id });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Listar leads
app.get('/api/leads', (req, res) => {
  try {
    const leadsOrdenados = leads.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
    res.json({ success: true, total: leads.length, leads: leadsOrdenados });
  } catch {
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
});

// Atualizar lead
app.put('/api/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, observacoes } = req.body;
    const leadIndex = leads.findIndex(lead => lead.id === parseInt(id));

    if (leadIndex === -1) return res.status(404).json({ error: 'Lead não encontrado' });

    leads[leadIndex] = {
      ...leads[leadIndex],
      status: status || leads[leadIndex].status,
      observacoes: observacoes || leads[leadIndex].observacoes,
      data_atualizacao: new Date().toISOString()
    };

    res.json({ success: true, message: 'Lead atualizado com sucesso', lead: leads[leadIndex] });
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar lead' });
  }
});

// Estatísticas
app.get('/api/dashboard/stats', (req, res) => {
  try {
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

    const leadsHoje = leads.filter(lead => new Date(lead.data_criacao).toDateString() === hoje.toDateString()).length;
    const leadsMes = leads.filter(lead => new Date(lead.data_criacao) >= inicioMes).length;

    const statusCount = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});

    const origemCount = leads.reduce((acc, lead) => {
      acc[lead.origem] = (acc[lead.origem] || 0) + 1;
      return acc;
    }, {});

    res.json({ success: true, stats: { total: leads.length, hoje: leadsHoje, mes: leadsMes, porStatus: statusCount, porOrigem: origemCount } });
  } catch {
    res.status(500).json({ error: 'Erro ao gerar estatísticas' });
  }
});

// WhatsApp
app.post('/api/whatsapp/notify', (req, res) => {
  try {
    const { leadId, mensagem } = req.body;
    const lead = leads.find(l => l.id === parseInt(leadId));
    if (!lead) return res.status(404).json({ error: 'Lead não encontrado' });

    const whatsappUrl = `https://wa.me/5511940663895?text=${encodeURIComponent(`Olá! Recebemos um lead de ${lead.nome} (${lead.email}). ${mensagem || ''}`)}`;
    res.json({ success: true, whatsapp_url: whatsappUrl });
  } catch {
    res.status(500).json({ error: 'Erro ao gerar URL do WhatsApp' });
  }
});

// Chat
app.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
      temperature: 0.7
    });
    res.json({ answer: response.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ error: `Erro ao processar requisição: ${error.message}` });
  }
});

// Calculadora de ROI
app.post('/api/roi-calculator', (req, res) => {
  try {
    const { faturamento_mensal, margem_lucro, investimento_marketing, plano_escolhido } = req.body;
    const faturamento = parseFloat(faturamento_mensal);
    const margem = parseFloat(margem_lucro) / 100;
    const investimento = parseFloat(investimento_marketing);

    const multiplicadores = { essencial: 1.2, estrategico: 1.5, premium: 2.0 };
    const multiplicador = multiplicadores[plano_escolhido] || 1.2;

    const lucro_atual = faturamento * margem;
    const aumento_estimado = investimento * multiplicador;
    const novo_faturamento = faturamento + aumento_estimado;
    const novo_lucro = novo_faturamento * margem;
    const roi_estimado = ((novo_lucro - lucro_atual - investimento) / investimento) * 100;

    res.json({
      roi_estimado: Math.round(roi_estimado),
      aumento_faturamento_estimado: Math.round(aumento_estimado),
      novo_faturamento_estimado: Math.round(novo_faturamento),
      plano_recomendado: plano_escolhido,
      economia_anual: Math.round((novo_lucro - lucro_atual) * 12)
    });
  } catch (error) {
    res.status(500).json({ error: `Erro ao calcular ROI: ${error.message}` });
  }
});

// Porta local apenas se não estiver na Vercel
const PORT = process.env.PORT || 3001;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
}

module.exports = app;
