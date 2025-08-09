import { Link } from 'react-router-dom'
import { Mail, Phone, MessageCircle, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import logoImage from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo, Nome e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 select-none mb-4">
              <img
                src={logoImage}
                alt="BN Soluções"
                className="h-12 w-auto drop-shadow-sm"
                loading="lazy"
              />
              <span className="font-extrabold text-xl tracking-tight text-green-700 uppercase">
                BN
                <span className="text-primary lowercase font-semibold">soluções</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Soluções completas em marketing digital para PMEs.
              Tudo em um lugar com IA para seu negócio crescer.
            </p>
            {/* Contatos */}
            <div className="space-y-3">
              <a
                href="mailto:bn.solucoes20@gmail.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={18} />
                <span>bn.solucoes20@gmail.com</span>
              </a>
              <a
                href="tel:+5511940663895"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <Phone size={18} />
                <span>(11) 94066-3895</span>
              </a>
              <a
                href="https://wa.me/5511940663895?text=Olá, gostaria de informações sobre soluções para meu negócio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={18} />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-white transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/solucoes" className="text-gray-300 hover:text-white transition-colors">
                  Soluções
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Marketing Digital</li>
              <li className="text-gray-300">Gestão de Redes Sociais</li>
              <li className="text-gray-300">SEO & SEM</li>
              <li className="text-gray-300">Campanhas Pagas</li>
              <li className="text-gray-300">Automação</li>
              <li className="text-gray-300">Consultoria IA</li>
            </ul>
          </div>
        </div>

        {/* Redes Sociais e Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2024 BNsoluções. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Desenvolvido com ❤️ para PMEs brasileiras
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
