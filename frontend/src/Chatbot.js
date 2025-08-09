const handleSendMessage = async (message = inputValue) => {
    if (!message.trim()) return;
  
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message
    };
  
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const botContent = await response.text(); // Recebe a resposta como texto simples
  
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botContent,
        suggestions: ['Mais detalhes sobre planos?', 'Contato agora?'],
        actions: [
          {
            type: 'contact_whatsapp',
            label: 'WhatsApp',
            url: 'https://wa.me/5511940663895?text=Olá, gostaria de mais informações sobre os serviços da BN Soluções'
          }
        ]
      };
  
      setMessages(prev => [...prev, botMessage]);
  
    } catch (error) {
      console.error('Erro no chatbot:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Desculpe, estou com dificuldades no momento. Nossa equipe está disponível via WhatsApp: (11) 94066-3895',
        actions: [
          {
            type: 'contact_whatsapp',
            label: 'WhatsApp',
            url: 'https://wa.me/5511940663895'
          }
        ]
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  