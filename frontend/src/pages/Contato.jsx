import { useState } from 'react'
import { Mail, Phone, MessageCircle, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    mensagem: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.nome || !formData.email || !formData.mensagem) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          empresa: formData.empresa,
          mensagem: `Assunto: ${formData.assunto}\n\n${formData.mensagem}`,
          origem: 'website'
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          empresa: '',
          assunto: '',
          mensagem: ''
        })

        // Google Analytics tracking
        if (window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form'
          })
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const contatos = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      titulo: "E-mail",
      info: "bn.solucoes20@gmail.com",
      link: "mailto:bn.solucoes20@gmail.com",
      descricao: "Resposta em até 24 horas"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      titulo: "Telefone",
      info: "(11) 93271-3209",
      link: "tel:+5511940663895",
      descricao: "Seg a Sex, 9h às 18h"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-green-500" />,
      titulo: "WhatsApp",
      info: "(11) 94066-3895",
      link: "https://wa.me/5511940663895?text=Olá, gostaria de informações sobre soluções para meu negócio",
      descricao: "Atendimento imediato"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      titulo: "Localização",
      info: "São Paulo, SP",
      link: null,
      descricao: "Atendimento presencial sob agendamento"
    }
  ]

  const horarios = [
    { dia: "Segunda a Sexta", horario: "9h às 18h" },
    { dia: "Sábado", horario: "9h às 13h" },
    { dia: "Domingo", horario: "Fechado" }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Estamos aqui para ajudar seu negócio a crescer. 
              Entre em contato conosco e descubra como podemos transformar sua empresa.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contatos.map((contato, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    {contato.icon}
                  </div>
                  <CardTitle className="text-lg">{contato.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  {contato.link ? (
                    <a 
                      href={contato.link}
                      target={contato.link.startsWith('http') ? '_blank' : '_self'}
                      rel={contato.link.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                      {contato.info}
                    </a>
                  ) : (
                    <p className="font-semibold">{contato.info}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">{contato.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e entraremos em contato em breve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome *</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input
                        id="empresa"
                        value={formData.empresa}
                        onChange={(e) => handleInputChange('empresa', e.target.value)}
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="assunto">Assunto</Label>
                    <Select value={formData.assunto} onValueChange={(value) => handleInputChange('assunto', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orcamento">Solicitar Orçamento</SelectItem>
                        <SelectItem value="duvidas">Dúvidas sobre Serviços</SelectItem>
                        <SelectItem value="suporte">Suporte Técnico</SelectItem>
                        <SelectItem value="parceria">Proposta de Parceria</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mensagem">Mensagem *</Label>
                    <Textarea
                      id="mensagem"
                      value={formData.mensagem}
                      onChange={(e) => handleInputChange('mensagem', e.target.value)}
                      placeholder="Conte-nos mais sobre seu projeto ou dúvida..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-semibold">
                        Mensagem enviada com sucesso!
                      </p>
                      <p className="text-green-600 text-sm mt-1">
                        Entraremos em contato em breve.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-semibold">
                        Erro ao enviar mensagem
                      </p>
                      <p className="text-red-600 text-sm mt-1">
                        Tente novamente ou entre em contato pelo WhatsApp.
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Horários */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Horários de Atendimento</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {horarios.map((horario, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{horario.dia}</span>
                        <span className="font-semibold">{horario.horario}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp CTA */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    Precisa de Atendimento Imediato?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 mb-4">
                    Fale conosco pelo WhatsApp e receba atendimento personalizado agora mesmo!
                  </p>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <a 
                      href="https://wa.me/5511940663895?text=Olá, gostaria de informações sobre soluções para meu negócio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Falar no WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ Quick */}
              <Card>
                <CardHeader>
                  <CardTitle>Dúvidas Frequentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm">Quanto tempo para ver resultados?</h4>
                      <p className="text-sm text-gray-600">
                        Primeiros resultados em 30-60 dias, resultados consistentes em 3-6 meses.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Vocês atendem todo o Brasil?</h4>
                      <p className="text-sm text-gray-600">
                        Sim! Atendemos empresas de todo o território nacional de forma remota.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Como funciona a consultoria?</h4>
                      <p className="text-sm text-gray-600">
                        Análise gratuita do seu negócio e proposta personalizada sem compromisso.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contato

