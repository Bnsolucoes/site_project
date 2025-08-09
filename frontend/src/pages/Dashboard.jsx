import { useState, useEffect } from 'react'
import {
  Users,
  Mail,
  Phone,
  Building,
  Calendar,
  MessageSquare,
  TrendingUp,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Download
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'

const Dashboard = () => {
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState(null)
  const [editingLead, setEditingLead] = useState(null)

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      setLoading(true)
      
      // Carregar leads
      const leadsResponse = await fetch('/api/leads')
      const leadsData = await leadsResponse.json()
      
      // Carregar estatísticas
      const statsResponse = await fetch('/api/dashboard/stats')
      const statsData = await statsResponse.json()
      
      if (leadsData.success) {
        setLeads(leadsData.leads)
      }
      
      if (statsData.success) {
        setStats(statsData.stats)
      }
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const atualizarStatusLead = async (leadId, novoStatus, observacoes) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: novoStatus,
          observacoes: observacoes
        })
      })

      if (response.ok) {
        await carregarDados() // Recarregar dados
        setEditingLead(null)
      }
    } catch (error) {
      console.error('Erro ao atualizar lead:', error)
    }
  }

  // FUNÇÃO CORRIGIDA: gerarWhatsAppUrl agora constrói o link diretamente
  const gerarWhatsAppUrl = (phoneNumber, message) => {
    if (!phoneNumber) {
      console.error('Número de telefone do lead não disponível.');
      return;
    }

    // Remove caracteres não numéricos e adiciona o código do país (55 para Brasil)
    const formattedPhoneNumber = '55' + phoneNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message || "Olá, vi seu contato e gostaria de ajudar com sua dúvida.");
    const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'novo': return 'bg-blue-100 text-blue-800'
      case 'contatado': return 'bg-yellow-100 text-yellow-800'
      case 'proposta': return 'bg-purple-100 text-purple-800'
      case 'fechado': return 'bg-green-100 text-green-800'
      case 'perdido': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'novo': return <Clock className="h-4 w-4" />
      case 'contatado': return <Phone className="h-4 w-4" />
      case 'proposta': return <MessageSquare className="h-4 w-4" />
      case 'fechado': return <CheckCircle className="h-4 w-4" />
      case 'perdido': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleString('pt-BR')
  }

  const exportarLeads = () => {
    const csvContent = [
      ['ID', 'Nome', 'E-mail', 'Telefone', 'Empresa', 'Status', 'Data Criação', 'Mensagem'],
      ...leads.map(lead => [
        lead.id,
        lead.nome,
        lead.email,
        lead.telefone,
        lead.empresa,
        lead.status,
        formatarData(lead.data_criacao),
        lead.mensagem
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard de Leads</h1>
              <p className="text-gray-600 mt-1">Gerencie todos os leads recebidos</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={carregarDados} variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button onClick={exportarLeads}>
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                Todos os tempos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Hoje</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.hoje || 0}</div>
              <p className="text-xs text-muted-foreground">
                Últimas 24 horas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads do Mês</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.mes || 0}</div>
              <p className="text-xs text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.porStatus?.novo || 0}</div>
              <p className="text-xs text-muted-foreground">
                Aguardando contato
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Leads Recebidos</CardTitle>
            <CardDescription>
              {leads.length} leads encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhum lead encontrado</p>
                </div>
              ) : (
                leads.map((lead) => (
                  <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{lead.nome}</h3>
                          <Badge className={getStatusColor(lead.status)}>
                            {getStatusIcon(lead.status)}
                            <span className="ml-1 capitalize">{lead.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{lead.email}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{lead.telefone}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-gray-500" />
                            <span>{lead.empresa}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{formatarData(lead.data_criacao)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-gray-700 bg-gray-100 p-3 rounded-lg">
                            {lead.mensagem}
                          </p>
                        </div>
                        
                        {lead.observacoes && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-600">
                              <strong>Observações:</strong> {lead.observacoes}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingLead(editingLead === lead.id ? null : lead.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => gerarWhatsAppUrl(lead.telefone, `Olá ${lead.nome}! Vi que você entrou em contato conosco. Posso ajudar?`)}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                    
                    {/* Formulário de Edição */}
                    {editingLead === lead.id && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold mb-3">Editar Lead</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <Select 
                              value={lead.status} 
                              onValueChange={(value) => {
                                const updatedLead = { ...lead, status: value }
                                setLeads(leads.map(l => l.id === lead.id ? updatedLead : l))
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="novo">Novo</SelectItem>
                                <SelectItem value="contatado">Contatado</SelectItem>
                                <SelectItem value="proposta">Proposta Enviada</SelectItem>
                                <SelectItem value="fechado">Fechado</SelectItem>
                                <SelectItem value="perdido">Perdido</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Observações</label>
                            <Textarea
                              value={lead.observacoes || ''}
                              onChange={(e) => {
                                const updatedLead = { ...lead, observacoes: e.target.value }
                                setLeads(leads.map(l => l.id === lead.id ? updatedLead : l))
                              }}
                              placeholder="Adicione observações sobre este lead..."
                              rows={2}
                            />
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-4">
                          <Button
                            size="sm"
                            onClick={() => atualizarStatusLead(lead.id, lead.status, lead.observacoes)}
                          >
                            Salvar Alterações
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingLead(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard