import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaRocket, FaChartLine, FaUsers, FaCog, FaWhatsapp, FaCalculator, FaArrowRight } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || '';

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
        const response = await fetch(`${API_URL}/roi-calculator`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                faturamento_mensal: parseFloat(roiData.faturamento),
                margem_lucro: parseFloat(roiData.margem),
                investimento_marketing: parseFloat(roiData.investimento),
                plano_escolhido: roiData.plano,
                email: roiData.email
            })
        })

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`)
        }

        const result = await response.json()
        
        console.log('Resultado ROI:', result);
        
        setRoiResult(result)

        if (window.gtag) {
            window.gtag('event', 'roi_calculation', {
                event_category: 'engagement',
                event_label: roiData.plano
            });
        }

    } catch (error) {
        console.error('Erro no cálculo de ROI:', error)
        alert('Erro ao calcular ROI. Verifique sua conexão e tente novamente.')
    } finally {
        setIsCalculating(false)
    }
  }

  const handleInputChange = (field, value) => {
    setRoiData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetForm = () => {
    setRoiData({
      faturamento: '',
      margem: '',
      investimento: '',
      plano: '',
      email: ''
    })
    setRoiResult(null)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transforme Seu Negócio com IA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Soluções inteligentes em automação, chatbots e consultoria para acelerar seus resultados
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/solucoes"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaRocket className="text-xl" />
                Conhecer Soluções
              </Link>
              <a
                href="https://wa.me/5511940663895?text=Olá, gostaria de mais informações sobre os serviços da BN Soluções"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-xl" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Por que Escolher a BN Soluções?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combinamos tecnologia avançada com estratégias personalizadas para potencializar seus resultados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaRocket className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Automação Inteligente</h3>
              <p className="text-gray-600">
                Automatize processos repetitivos e foque no que realmente importa para seu negócio crescer
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaChartLine className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Resultados Mensuráveis</h3>
              <p className="text-gray-600">
                Acompanhe o crescimento do seu negócio com métricas claras e relatórios detalhados
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Suporte Especializado</h3>
              <p className="text-gray-600">
                Nossa equipe está sempre disponível para garantir o sucesso da sua implementação
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaCog className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Soluções Personalizadas</h3>
              <p className="text-gray-600">
                Cada negócio é único. Criamos soluções sob medida para suas necessidades específicas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <FaCalculator className="text-blue-600" />
                Calculadora de ROI
              </h2>
              <p className="text-xl text-gray-600">
                Descubra o potencial de retorno dos nossos serviços para seu negócio
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Faturamento Mensal (R$) *
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 50000"
                      value={roiData.faturamento}
                      onChange={(e) => handleInputChange('faturamento', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Margem de Lucro (%) *
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 20"
                      value={roiData.margem}
                      onChange={(e) => handleInputChange('margem', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Investimento em Marketing (R$) *
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 5000"
                      value={roiData.investimento}
                      onChange={(e) => handleInputChange('investimento', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Plano de Interesse *
                    </label>
                    <select
                      value={roiData.plano}
                      onChange={(e) => handleInputChange('plano', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecione um plano</option>
                      <option value="chatbot">Chatbot Inteligente</option>
                      <option value="automacao">Automação de Processos</option>
                      <option value="consultoria">Consultoria Completa</option>
                      <option value="personalizado">Solução Personalizada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={roiData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <button
                      onClick={calculateROI}
                      disabled={isCalculating}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isCalculating ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <FaCalculator />
                          Calcular ROI
                        </>
                      )}
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all duration-300"
                    >
                      Limpar
                    </button>
                  </div>

                  {roiResult && (
                    <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                      <h3 className="text-2xl font-bold text-green-600 mb-4">Resultados Projetados</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="font-semibold text-gray-700">ROI Estimado:</span>
                          <span className="text-2xl font-bold text-green-600">
                            {roiResult.roi_estimado}%
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="font-semibold text-gray-700">Aumento no Faturamento:</span>
                          <span className="text-xl font-bold text-blue-600">
                            R$ {roiResult.aumento_faturamento_estimado?.toLocaleString('pt-BR')}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="font-semibold text-gray-700">Economia Projetada:</span>
                          <span className="text-xl font-bold text-purple-600">
                            R$ {roiResult.economia_projetada?.toLocaleString('pt-BR')}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-2">
                          <span className="font-semibold text-gray-700">Payback:</span>
                          <span className="text-lg font-bold text-orange-600">
                            {roiResult.payback_meses} meses
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-3">
                          {roiResult.recomendacao}
                        </p>
                        <div className="flex gap-3">
                          <a
                            href="https://wa.me/5511940663895?text=Olá, acabei de usar a calculadora de ROI e gostaria de saber mais detalhes sobre as soluções"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                          >
                            <FaWhatsapp />
                            Falar com Especialista
                          </a>
                          <Link
                            to="/solucoes"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                          >
                            <FaArrowRight />
                            Ver Soluções
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {!roiResult && (
                    <div className="bg-gray-100 rounded-xl p-6 text-center">
                      <FaCalculator className="text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Preencha os campos ao lado e clique em "Calcular ROI" para ver os resultados projetados
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para Acelerar Seu Crescimento?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Junte-se a centenas de empresas que já transformaram seus negócios com nossas soluções
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5511940663895?text=Olá, gostaria de agendar uma conversa sobre as soluções da BN"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-xl" />
              Agendar Conversa
            </a>
            <Link
              to="/servicos"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaArrowRight className="text-xl" />
              Conhecer Serviços
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
