import { useState } from 'react'
import { ArrowRight, Zap, Target, TrendingUp, Calculator, Star, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Link } from 'react-router-dom'

const Home = () => {
  const [roiData, setRoiData] = useState({
    faturamento: '',
    margem: '',
    investimento: '',
    plano: '',
    email: ''
  })
  const [roiResult, setRoiResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateROI = async () => {
    if (!roiData.faturamento || !roiData.margem || !roiData.investimento || !roiData.plano) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    setIsCalculating(true)

    try {
      const response = await fetch("http://localhost:3001/api/roi-calculator", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          faturamento_mensal: parseFloat(roiData.faturamento),
          margem_lucro: parseFloat(roiData.margem),
          investimento_marketing: parseFloat(roiData.investimento),
          plano_escolhido: roiData.plano,
          email: roiData.email
        })
      })

      const result = await response.json()
      setRoiResult(result)

      // Google Analytics tracking
      if (window.gtag) {
        window.gtag('event', 'roi_calculation', {
          event_category: 'engagement',
          event_label: roiData.plano,
          value: result.roi_estimado
        })
      }

    } catch (error) {
      console.error('Erro no cálculo de ROI:', error)
      alert('Erro ao calcular ROI. Tente novamente.')
    } finally {
      setIsCalculating(false)
    }
  }

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "IA Integrada",
      description: "Automação inteligente para otimizar suas campanhas e gerar mais resultados"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Foco em Resultados",
      description: "Estratégias baseadas em dados para maximizar seu ROI e conversões"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Crescimento Escalável",
      description: "Soluções que crescem junto com seu negócio, sem complicações"
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      company: "Boutique Fashion",
      text: "Aumentamos 300% nossas vendas online em apenas 3 meses com a BN Soluções!",
      rating: 5
    },
    {
      name: "João Santos",
      company: "Tech Solutions",
      text: "O suporte é excepcional e os resultados superaram nossas expectativas.",
      rating: 5
    },
    {
      name: "Ana Costa",
      company: "Clínica Bem Estar",
      text: "Finalmente encontramos uma empresa que entende as necessidades de PMEs.",
      rating: 5
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">              Tudo o que sua <span class="text-yellow-300">PME</span> precisa para <span class="text-yellow-300">crescer</span> — em <span class="text-yellow-300">um só lugar</span>.           </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-100">
              Marketing digital completo com automação inteligente.
              Atraia, converta e escale sem depender de vários fornecedores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contato">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                <Link to="/servicos">
                  Ver Planos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Por que escolher a BN Soluções?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combinamos tecnologia de ponta com estratégias comprovadas para acelerar o crescimento do seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Calculadora de ROI
              </h2>
              <p className="text-xl text-gray-600">
                Descubra quanto você pode economizar e ganhar com nossas soluções
              </p>
            </div>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-6 w-6" />
                  <span>Calcule seu Retorno sobre Investimento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="faturamento">Faturamento Mensal (R$) *</Label>
                    <Input
                      id="faturamento"
                      type="number"
                      placeholder="Ex: 50000"
                      value={roiData.faturamento}
                      onChange={(e) => setRoiData({...roiData, faturamento: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="margem">Margem de Lucro (%) *</Label>
                    <Input
                      id="margem"
                      type="number"
                      placeholder="Ex: 20"
                      value={roiData.margem}
                      onChange={(e) => setRoiData({...roiData, margem: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="investimento">Investimento em Marketing (R$) *</Label>
                    <Input
                      id="investimento"
                      type="number"
                      placeholder="Ex: 5000"
                      value={roiData.investimento}
                      onChange={(e) => setRoiData({...roiData, investimento: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="plano">Plano Escolhido *</Label>
                    <Select value={roiData.plano} onValueChange={(value) => setRoiData({...roiData, plano: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="essencial">Essencial - R$399/mês</SelectItem>
                        <SelectItem value="estrategico">Estratégico - R$699/mês</SelectItem>
                        <SelectItem value="premium">Premium - R$1.199/mês</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="email">E-mail (opcional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={roiData.email}
                      onChange={(e) => setRoiData({...roiData, email: e.target.value})}
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateROI} 
                  disabled={isCalculating}
                  className="w-full"
                  size="lg"
                >
                  {isCalculating ? 'Calculando...' : 'Calcular ROI'}
                </Button>

                {roiResult && (
                  <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">
                      Resultado da Análise
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-green-600">ROI Estimado</p>
                        <p className="text-2xl font-bold text-green-800">
                          {roiResult.roi_estimado}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-green-600">Aumento de Faturamento</p>
                        <p className="text-2xl font-bold text-green-800">
                          R$ {roiResult.aumento_faturamento_estimado?.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button asChild>
                        <Link to="/contato">
                          Quero Começar Agora
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reais de empresas que confiaram na BN Soluções
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já estão crescendo com a BN Soluções. 
            Comece hoje mesmo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link to="/contato">
                Falar com Especialista
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/servicos">
                Ver Todos os Planos
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home