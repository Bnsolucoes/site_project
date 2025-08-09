import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Link } from 'react-router-dom'

const Blog = () => {
  const artigos = [
    {
      id: 1,
      titulo: "Como Aumentar suas Vendas Online em 2024",
      resumo: "Estratégias comprovadas para impulsionar seu e-commerce e gerar mais conversões usando as últimas tendências do marketing digital.",
      autor: "Bruno Rodrigues",
      data: "15 Jan 2024",
      categoria: "E-commerce",
      tags: ["vendas", "e-commerce", "conversão"],
      destaque: true,
      tempoLeitura: "8 min"
    },
    {
      id: 2,
      titulo: "IA no Marketing: Guia Completo para PMEs",
      resumo: "Descubra como a inteligência artificial pode revolucionar suas campanhas de marketing e automatizar processos para economizar tempo e dinheiro.",
      autor: "Carlos Santos",
      data: "12 Jan 2024",
      categoria: "Inteligência Artificial",
      tags: ["IA", "automação", "marketing"],
      destaque: false,
      tempoLeitura: "12 min"
    },
    {
      id: 3,
      titulo: "SEO Local: Como Dominar sua Região",
      resumo: "Técnicas avançadas de SEO local para fazer sua empresa aparecer primeiro no Google quando clientes procuram por serviços na sua cidade.",
      autor: "Ana Silva",
      data: "10 Jan 2024",
      categoria: "SEO",
      tags: ["SEO", "local", "Google"],
      destaque: false,
      tempoLeitura: "6 min"
    },
    {
      id: 4,
      titulo: "Redes Sociais que Convertem: Estratégias 2024",
      resumo: "As melhores práticas para transformar seus seguidores em clientes reais através de conteúdo estratégico e engajamento autêntico.",
      autor: "Maria Costa",
      data: "8 Jan 2024",
      categoria: "Social Media",
      tags: ["redes sociais", "engajamento", "conversão"],
      destaque: false,
      tempoLeitura: "10 min"
    },
    {
      id: 5,
      titulo: "Google Ads: Erros que Estão Queimando seu Dinheiro",
      resumo: "Os 10 erros mais comuns em campanhas do Google Ads que fazem você perder dinheiro e como corrigi-los para maximizar seu ROI.",
      autor: "Ana Silva",
      data: "5 Jan 2024",
      categoria: "Google Ads",
      tags: ["Google Ads", "ROI", "campanhas"],
      destaque: false,
      tempoLeitura: "7 min"
    },
    {
      id: 6,
      titulo: "Automação de Marketing: Por Onde Começar",
      resumo: "Guia prático para implementar automação de marketing na sua empresa, desde ferramentas básicas até estratégias avançadas.",
      autor: "Bruno Rodrigues",
      data: "3 Jan 2024",
      categoria: "Automação",
      tags: ["automação", "email marketing", "funis"],
      destaque: false,
      tempoLeitura: "9 min"
    }
  ]

  const categorias = [
    "Todos",
    "E-commerce",
    "SEO",
    "Social Media",
    "Google Ads",
    "Inteligência Artificial",
    "Automação"
  ]

  const artigoDestaque = artigos.find(artigo => artigo.destaque)
  const outrosArtigos = artigos.filter(artigo => !artigo.destaque)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Blog BN Soluções
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Insights, estratégias e tendências do marketing digital para fazer seu negócio crescer. 
              Conteúdo prático criado por especialistas.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Buscar artigos..." 
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categorias.map((categoria, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {categoria}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {artigoDestaque && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">Artigo em Destaque</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Leitura Recomendada
                </h2>
              </div>

              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-12 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Tag className="h-12 w-12 text-white" />
                      </div>
                      <Badge variant="outline" className="mb-2">
                        {artigoDestaque.categoria}
                      </Badge>
                      <p className="text-sm text-gray-600">
                        {artigoDestaque.tempoLeitura} de leitura
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{artigoDestaque.autor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{artigoDestaque.data}</span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl lg:text-3xl mb-4">
                        {artigoDestaque.titulo}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {artigoDestaque.resumo}
                      </CardDescription>
                    </CardHeader>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {artigoDestaque.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button asChild>
                      <Link to={`/blog/${artigoDestaque.id}`}>
                        Ler Artigo Completo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Últimos Artigos
              </h2>
              <p className="text-xl text-gray-600">
                Mantenha-se atualizado com as últimas tendências e estratégias
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {outrosArtigos.map((artigo) => (
                <Card key={artigo.id} className="hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{artigo.categoria}</Badge>
                      <span className="text-xs text-gray-500">{artigo.tempoLeitura}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {artigo.titulo}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {artigo.resumo}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{artigo.autor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{artigo.data}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {artigo.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to={`/blog/${artigo.id}`}>
                        Ler Mais
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Carregar Mais Artigos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary to-accent text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Receba Conteúdo Exclusivo
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Inscreva-se em nossa newsletter e receba semanalmente dicas, 
                  estratégias e insights direto no seu e-mail.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Seu melhor e-mail"
                    className="bg-white text-gray-900"
                  />
                  <Button variant="secondary" className="whitespace-nowrap">
                    Inscrever-se
                  </Button>
                </div>
                
                <p className="text-sm opacity-75 mt-4">
                  Sem spam. Cancele quando quiser.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Precisa de Ajuda Personalizada?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nossos especialistas estão prontos para criar uma estratégia 
            personalizada para o seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contato">
                Falar com Especialista
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
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

export default Blog

