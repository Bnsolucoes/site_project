import { BarChart3, Users, Zap, Target, TrendingUp, Globe, Smartphone, Bot, BarChart, Search, Facebook, Mail, MessageSquare, LineChart, Palette, Globe2, ShoppingCart, Zap as ZapIcon, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Link } from 'react-router-dom'

const Solucoes = () => {
  const solucoes = [
    {
      icon: <BarChart3 className="h-12 w-12 text-primary" />,
      titulo: "Marketing Digital Completo",
      descricao: "Estratégia 360° para dominar o mercado digital",
      features: [
        "Gestão completa de redes sociais",
        "Campanhas pagas otimizadas",
        "SEO e SEM avançado",
        "E-mail marketing automatizado",
        "Análise de concorrência",
        "Relatórios detalhados"
      ],
      beneficios: "Aumento médio de 250% no tráfego e 180% nas conversões",
      categoria: "Marketing"
    },
    {
      icon: <Bot className="h-12 w-12 text-accent" />,
      titulo: "Automação com IA",
      descricao: "Inteligência artificial para otimizar processos e resultados",
      features: [
        "Chatbots inteligentes",
        "Automação de campanhas",
        "Segmentação automática",
        "Otimização de anúncios",
        "Análise preditiva",
        "Personalização em massa"
      ],
      beneficios: "Redução de 60% no tempo de gestão e 40% de aumento no ROI",
      categoria: "IA"
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      titulo: "Gestão de Redes Sociais",
      descricao: "Presença digital profissional e engajamento real",
      features: [
        "Criação de conteúdo estratégico",
        "Design profissional",
        "Gestão de comunidade",
        "Influencer marketing",
        "Stories e Reels",
        "Monitoramento 24/7"
      ],
      beneficios: "Crescimento médio de 300% no engajamento e 150% em seguidores",
      categoria: "Social Media"
    },
    {
      icon: <Target className="h-12 w-12 text-red-600" />,
      titulo: "Campanhas Pagas",
      descricao: "Anúncios que convertem e geram resultados reais",
      features: [
        "Google Ads otimizado",
        "Facebook e Instagram Ads",
        "LinkedIn Ads B2B",
        "YouTube Ads",
        "Remarketing avançado",
        "Testes A/B contínuos"
      ],
      beneficios: "ROI médio de 400% e redução de 50% no custo por aquisição",
      categoria: "Ads"
    },
    {
      icon: <Globe className="h-12 w-12 text-green-600" />,
      titulo: "SEO e Presença Online",
      descricao: "Domine o Google e seja encontrado pelos seus clientes",
      features: [
        "Otimização técnica completa",
        "Criação de conteúdo SEO",
        "Link building estratégico",
        "Google My Business",
        "Análise de palavras-chave",
        "Monitoramento de rankings"
      ],
      beneficios: "Aumento médio de 400% no tráfego orgânico em 6 meses",
      categoria: "SEO"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-purple-600" />,
      titulo: "E-commerce e Vendas",
      descricao: "Transforme visitantes em clientes fiéis",
      features: [
        "Otimização de conversão",
        "Funis de vendas automatizados",
        "Recuperação de carrinho",
        "Upsell e cross-sell",
        "Análise de comportamento",
        "Integração com CRM"
      ],
      beneficios: "Aumento médio de 220% na taxa de conversão",
      categoria: "E-commerce"
    }
  ]

  const processos = [
    {
      numero: "01",
      titulo: "Análise e Diagnóstico",
      descricao: "Avaliação completa do seu negócio, concorrência e oportunidades de mercado"
    },
    {
      numero: "02",
      titulo: "Estratégia Personalizada",
      descricao: "Desenvolvimento de plano estratégico customizado para seus objetivos"
    },
    {
      numero: "03",
      titulo: "Implementação",
      descricao: "Execução das estratégias com acompanhamento em tempo real"
    },
    {
      numero: "04",
      titulo: "Otimização Contínua",
      descricao: "Análise de resultados e ajustes para maximizar performance"
    }
  ]

  const resultados = [
    { numero: "250%", descricao: "Aumento médio no tráfego" },
    { numero: "180%", descricao: "Crescimento nas conversões" },
    { numero: "400%", descricao: "ROI médio das campanhas" },
    { numero: "98%", descricao: "Taxa de satisfação dos clientes" }
  ]

  const tecnologias = [
    { nome: "Google Analytics", icon: <BarChart className="h-8 w-8 text-blue-600" /> },
    { nome: "Google Ads", icon: <Search className="h-8 w-8 text-red-600" /> },
    { nome: "Facebook Ads", icon: <Facebook className="h-8 w-8 text-blue-700" /> },
    { nome: "HubSpot", icon: <Globe2 className="h-8 w-8 text-orange-600" /> },
    { nome: "Mailchimp", icon: <Mail className="h-8 w-8 text-yellow-600" /> },
    { nome: "Hootsuite", icon: <MessageSquare className="h-8 w-8 text-green-600" /> },
    { nome: "SEMrush", icon: <LineChart className="h-8 w-8 text-purple-600" /> },
    { nome: "Canva", icon: <Palette className="h-8 w-8 text-blue-500" /> },
    { nome: "WordPress", icon: <Globe className="h-8 w-8 text-blue-800" /> },
    { nome: "Shopify", icon: <ShoppingCart className="h-8 w-8 text-green-700" /> },
    { nome: "Zapier", icon: <ZapIcon className="h-8 w-8 text-orange-500" /> },
    { nome: "Hotjar", icon: <Eye className="h-8 w-8 text-red-500" /> }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Nossas Soluções
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Soluções completas e integradas para acelerar o crescimento do seu negócio. 
              Combinamos estratégia, tecnologia e criatividade para gerar resultados excepcionais.
            </p>
          </div>
        </div>
      </section>

      {/* Resultados Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Resultados que Comprovam
            </h2>
            <p className="text-xl text-gray-600">
              Números reais de clientes que confiaram em nossas soluções
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {resultados.map((resultado, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {resultado.numero}
                </div>
                <p className="text-gray-600">{resultado.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soluções Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Soluções Especializadas
            </h2>
            <p className="text-xl text-gray-600">
              Cada solução é desenvolvida para atender necessidades específicas do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {solucoes.map((solucao, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                        {solucao.icon}
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {solucao.categoria}
                        </Badge>
                        <CardTitle className="text-xl">{solucao.titulo}</CardTitle>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base mt-4">
                    {solucao.descricao}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">O que está incluído:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {solucao.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Resultados Esperados:</h4>
                      <p className="text-green-700 text-sm">{solucao.beneficios}</p>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to="/contato">
                        Solicitar Proposta
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Nosso Processo
            </h2>
            <p className="text-xl text-gray-600">
              Metodologia comprovada para garantir o sucesso do seu projeto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processos.map((processo, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    {processo.numero}
                  </div>
                  {index < processos.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -translate-y-0.5"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-3">{processo.titulo}</h3>
                <p className="text-gray-600 text-sm">{processo.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnologias Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tecnologias que Utilizamos
            </h2>
            <p className="text-xl text-gray-600">
              Ferramentas de ponta para maximizar seus resultados
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {tecnologias.map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto mb-3">
                  {tech.icon}
                </div>
                <p className="text-sm font-medium">{tech.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para Transformar seu Negócio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Escolha as soluções ideais para sua empresa e comece a ver resultados em 30 dias. 
            Nossa equipe está pronta para criar uma estratégia personalizada para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link to="/contato">
                Solicitar Consultoria Gratuita
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/servicos">
                Ver Planos e Preços
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Solucoes