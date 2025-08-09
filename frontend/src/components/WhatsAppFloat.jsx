import { MessageCircle } from 'lucide-react'

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá, gostaria de informações sobre soluções para meu negócio')
    const whatsappUrl = `https://wa.me/5511940663895?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  )
}

export default WhatsAppFloat

