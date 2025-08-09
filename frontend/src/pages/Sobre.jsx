import { Users, Target, Award, Heart, Zap, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

const Sobre = () => {
  const valores = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      titulo: "Foco em Resultados",
      descricao: "Cada estratégia é desenvolvida com foco em gerar resultados mensuráveis e impacto real no seu negócio."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      titulo: "Paixão pelo que Fazemos",
      descricao: "Amamos ajudar empresas a crescerem e nos dedicamos integralmente ao sucesso de cada cliente."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      titulo: "Inovação Constante",
      descricao: "Sempre buscamos as mais novas tecnologias e tendências para manter nossos clientes à frente da concorrência."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      titulo: "Parceria Verdadeira",
      descricao: "Não somos apenas fornecedores, somos parceiros estratégicos no crescimento do seu negócio."
    }
  ]

  const equipe = [
    {
      nome: "Bruno Rodrigues",       
      cargo: "CEO & Fundador",
      descricao: "Especialista em marketing digital com mais de 8 anos de experiência ajudando PMEs a crescerem online.",
      especialidades: ["Estratégia Digital", "Growth Hacking", "Liderança"]
    },
    {
      nome: "Ana Silva",
      cargo: "Diretora de Marketing",
      descricao: "Expert em campanhas pagas e automação, responsável por gerar milhões em ROI para nossos clientes.",
      especialidades: ["Google Ads", "Facebook Ads", "Automação"]
    },
    {
      nome: "Carlos Santos",
      cargo: "Especialista em IA",
      descricao: "Desenvolvedor e especialista em inteligência artificial aplicada ao marketing e vendas.",
      especialidades: ["Machine Learning", "Chatbots", "Automação IA"]
    },
    {
      nome: "Maria Costa",
      cargo: "Designer & Social Media",
      descricao: "Criativa responsável por designs que convertem e estratégias de redes sociais que engajam.",
      especialidades: ["Design Gráfico", "Social Media", "Branding"]
    }
  ]

  const numeros = [
    { numero: "500+", descricao: "Clientes Atendidos" },
    { numero: "8", descricao: "Anos de Experiência" },
    { numero: "R$ 50M+", descricao: "Faturamento Gerado" },
    { numero: "98%", descricao: "Satisfação dos Clientes" }
  ]

  const diferenciais = [
    {
      titulo: "Especialização em PMEs",
      descricao: "Entendemos os desafios únicos das pequenas e médias empresas brasileiras."
    },
    {
      titulo: "Tecnologia de Ponta",
      descricao: "Utilizamos as mais avançadas ferramentas de IA e automação do mercado."
    },
    {
      titulo: "Suporte Humanizado",
      descricao: "Atendimento personalizado com profissionais dedicados ao seu sucesso."
    },
    {
      titulo: "Resultados Comprovados",
      descricao: "Histórico sólido de crescimento e transformação digital de empresas."
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Sobre a BN Soluções
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Somos uma empresa especializada em transformação digital para PMEs, 
              combinando estratégia, tecnologia e criatividade para acelerar o crescimento dos nossos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Nossa História
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    A BN Soluções nasceu em 2016 com uma missão clara: democratizar o marketing digital 
                    para pequenas e médias empresas brasileiras. Fundada por Bruno Rodrigues, 
                    a empresa surgiu da necessidade de oferecer soluções profissionais e acessíveis 
                    para empresas que não tinham acesso a grandes agências.
                  </p>
                  <p>
                    Ao longo dos anos, evoluímos de uma pequena consultoria para uma empresa completa 
                    de transformação digital, sempre mantendo nosso foco nas PMEs e na entrega de 
                    resultados reais e mensuráveis.
                  </p>
                  <p>
                    Hoje, somos reconhecidos como uma das principais empresas de marketing digital 
                    para PMEs em São Paulo, com clientes em todo o Brasil e um histórico comprovado 
                    de sucesso e crescimento.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {numeros.map((numero, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {numero.numero}
                      </div>
                      <p className="text-gray-600 text-sm">{numero.descricao}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Missão, Visão e Valores
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Missão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Democratizar o marketing digital para PMEs brasileiras, 
                    oferecendo soluções profissionais, acessíveis e que geram resultados reais.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Visão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ser a principal referência em transformação digital para PMEs no Brasil, 
                    reconhecida pela excelência e inovação em nossas soluções.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Propósito</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Acelerar o crescimento de empresas brasileiras através da tecnologia, 
                    contribuindo para o desenvolvimento econômico do país.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Valores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valores.map((valor, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {valor.icon}
                    </div>
                    <CardTitle className="text-lg">{valor.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {valor.descricao}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Nossa Equipe
              </h2>
              <p className="text-xl text-gray-600">
                Profissionais especializados e apaixonados por resultados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {equipe.map((membro, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {membro.nome.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{membro.nome}</CardTitle>
                    <CardDescription className="text-primary font-semibold">
                      {membro.cargo}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{membro.descricao}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {membro.especialidades.map((esp, espIndex) => (
                        <span 
                          key={espIndex}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {esp}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Diferenciais */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Nossos Diferenciais
              </h2>
              <p className="text-xl text-gray-600">
                O que nos torna únicos no mercado
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {diferenciais.map((diferencial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <span>{diferencial.titulo}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{diferencial.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificações e Parcerias */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Certificações e Parcerias
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Reconhecidos pelas principais plataformas do mercado
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {["Google Partner", "Facebook Partner", "HubSpot Certified", "Microsoft Partner", "Shopify Partner", "WordPress Expert"].map((certification, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg shadow-md flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="text-sm font-medium">{certification}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Quer Conhecer Melhor Nosso Trabalho?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agende uma conversa sem compromisso e descubra como podemos 
            ajudar sua empresa a crescer no digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link to="/contato">
                Agendar Conversa
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/servicos">
                Ver Nossos Serviços
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sobre