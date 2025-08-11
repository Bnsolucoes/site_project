// ✅ CÓDIGO CORRIGIDO
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
      
      // ✅ VERIFICAR SE OS DADOS ESTÃO VINDO CORRETAMENTE
      console.log('Resultado ROI:', result); // Para debug
      
      setRoiResult(result)

      // ✅ ANALYTICS
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
