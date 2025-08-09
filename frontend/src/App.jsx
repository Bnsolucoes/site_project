import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// Componentes
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Chatbot from './components/Chatbot'

// Páginas
import Home from './pages/Home'
import Servicos from './pages/Servicos'
import Solucoes from './pages/Solucoes'
import Sobre from './pages/Sobre'
import Blog from './pages/Blog'
import Contato from './pages/Contato'
import Dashboard from './pages/Dashboard'

function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
        
        {/* WhatsApp Float Button */}
        <WhatsAppFloat />
        
        {/* Chatbot */}
        <Chatbot isOpen={chatbotOpen} onToggle={() => setChatbotOpen(!chatbotOpen)} />
      </div>
    </Router>
  )
}

export default App
