import { useState } from 'react'
import { ArrowRight, Zap, Target, TrendingUp, Calculator, Star } from 'lucide-react'
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

  // URL base da API
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  const calculateROI = async () => {
    if (!roiData.faturamento || !roiData.margem || !roiData.investimento || !roiData.plano) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    setIsCalculating(true)

    try {
      const response = await fetch(`${API_URL}/roi-calculator`, {
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

      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`)

      const result = await response.json()
      setRoiResult(result)

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
      {/* Hero */}
      <section className="hero-gradient text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Tudo o que sua <span className="text-yellow-300">PME</span> precisa para <span className="text-yellow-300">crescer</span> — em <span className="text-yellow-300">um só lugar</span>.
            </h1>
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

      {/* Features */}
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

      {/* ROI Calculator */}
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
                {/* Formulário */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Campos */}
                  {/* ...mantido igual... */}
                </div>

                <Button onClick={calculateROI} disabled={isCalculating} className="w-full" size="lg">
                  {isCalculating ? 'Calculando...' : 'Calcular ROI'}
                </Button>

                {roiResult && (
                  <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                    {/* Resultado */}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials e CTA */}
      {/* ...mantido igual... */}
    </div>
  )
}

export default Home
