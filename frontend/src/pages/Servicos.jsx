import { Check, Star, Zap, Target, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Link } from 'react-router-dom'

const Servicos = () => {
  const planos = [
    {
      nome: "BN - Essencial",
      preco: 399,
      setup: "R$ 500",
      popular: false,
      descricao: "Ideal para pequenas empresas que estão começando no digital",
      features: [
        "PDV Básico",
        "Cardápio Digital (Visualização)",
        "Google Meu Negócio",
        "KDS Android",
        "Suporte Remoto Básico",
        "Chatbot configurado",
        "Suporte por WhatsApp"
      ],
      cor: "border-gray-200"
    },
    {
      nome: "BN - Inteligente",
      preco: 699,
      setup: "R$ 1.000",
      popular: true,
      descricao: "Para empresas que querem crescer de forma consistente",
      features: [
        "ERP + PDV Completo",
        "Hub Delivery Centralizado",
        "Cardápio Digital (com Pedido)",
        "Campanhas pagas (Google/Meta)",
        "Relatórios detalhados",
        "Suporte prioritário",
        "SEO avançado (15 palavras-chave)",
        "Automação básica",
        "Chatbot configurado"
      ],
      cor: "border-primary"
    },
    {
      nome: "BN - Completo",
      preco: 1199,
      setup: "R$ 2.000",
      popular: false,
      descricao: "Solução completa para empresas que querem dominar o mercado",
      features: [
        "Todas funcionalidades anteriores",
        " KDS e relatório",
        "3  PDV - Frente de Caixa",
        "Painel Senha",
        "PDV Android",
        "Campanhas pagas otimizadas",
        "Landing pages personalizadas",
        "Automação avançada",
        "IA para otimização",
        "Consultoria estratégica mensal",
        "SEO completo (30 palavras-chave)",
        "Suporte 24/7",
        "Relatórios em tempo real"
      ],
      cor: "border-accent"
    }
  ]

  const servicosAdicionais = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      titulo: "Automação com IA",
      descricao: "Automatize processos repetitivos e otimize campanhas com inteligência artificial",
      preco: "A partir de R$ 299/mês"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      titulo: "Consultoria Estratégica",
      descricao: "Sessões personalizadas para definir estratégias de crescimento",
      preco: "R$ 500/sessão"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      titulo: "Análise de Concorrência",
      descricao: "Relatório completo sobre seus concorrentes e oportunidades de mercado",
      preco: "R$ 800/relatório"
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Planos e Serviços
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Escolha o plano ideal para o seu negócio e comece a crescer hoje mesmo. 
              Todos os planos incluem suporte especializado e resultados garantidos.
            </p>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Nossos Planos
            </h2>
            <p className="text-xl text-gray-600">
              Soluções escaláveis para empresas de todos os tamanhos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {planos.map((plano, index) => (
              <Card 
                key={index} 
                className={`relative ${plano.cor} ${plano.popular ? 'ring-2 ring-primary shadow-xl scale-105' : 'hover:shadow-lg'} transition-all duration-300`}
              >
                {plano.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Mais Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plano.nome}</CardTitle>
                  <CardDescription className="text-base">{plano.descricao}</CardDescription>
                  
                  <div className="mt-6">
                    <div className="text-4xl font-bold text-primary">
                      R$ {plano.preco}
                      <span className="text-lg font-normal text-gray-600">/mês</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Setup: {plano.setup}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plano.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={plano.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link to="/contato">
                      Escolher {plano.nome}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Garantia */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-800 px-6 py-3 rounded-full">
              <Star className="h-5 w-5" />
              <span className="font-semibold">Garantia de 30 dias ou seu dinheiro de volta</span>
            </div>
          </div>

          {/* Seção de Planos Modulares */}
          <div className="text-center mt-20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Planos Modulares e Personalizados
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Não encontrou o plano ideal? Entendemos que cada negócio é único. 
              Além dos nossos pacotes, oferecemos soluções modulares que se adaptam 
              perfeitamente às suas necessidades. Vamos conversar para montar um plano exclusivo para você.
            </p>
            <Button size="lg" asChild>
              <a 
                href="https://wa.me/5511940663895?text=Olá! Gostaria de montar um plano personalizado para meu negócio." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Monte seu Plano Personalizado
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Serviços Adicionais */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Serviços Adicionais
            </h2>
            <p className="text-xl text-gray-600">
              Complemente seu plano com serviços especializados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicosAdicionais.map((servico, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    {servico.icon}
                  </div>
                  <CardTitle className="text-xl">{servico.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {servico.descricao}
                  </CardDescription>
                  <div className="text-lg font-semibold text-primary mb-4">
                    {servico.preco}
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/contato">
                      Saiba Mais
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Posso trocar de plano a qualquer momento?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                    As mudanças entram em vigor no próximo ciclo de cobrança.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Como funciona a taxa de setup?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    A taxa de setup é cobrada apenas uma vez e inclui a configuração inicial de todas as ferramentas, 
                    criação de contas, integração de sistemas e treinamento da equipe.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Vocês trabalham com contratos de fidelidade?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Não exigimos contratos de fidelidade. Você pode cancelar seu plano a qualquer momento 
                    com 30 dias de antecedência.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Que tipo de suporte vocês oferecem?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Oferecemos suporte via e-mail, WhatsApp e telefone. O tempo de resposta varia conforme o plano: 
                    Essencial (24h), Estratégico (12h), Premium (2h).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Escolha seu plano e comece a transformar seu negócio hoje mesmo. 
            Nossa equipe está pronta para ajudar você a crescer!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link to="/contato">
                Falar com Consultor
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/">
                Calcular ROI
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Servicos