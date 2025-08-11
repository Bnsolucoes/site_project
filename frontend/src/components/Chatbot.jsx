import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUser, FiBot } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || '';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage = {
                id: Date.now(),
                type: 'bot',
                content: 'Olá! 👋 Sou o assistente da BN Soluções. Como posso ajudá-lo hoje?',
                suggestions: [
                    'Quais serviços vocês oferecem?',
                    'Como funciona a consultoria?',
                    'Quero falar com um especialista'
                ],
                actions: [{
                    type: 'contact_whatsapp',
                    label: 'WhatsApp',
                    url: 'https://wa.me/5511940663895?text=Olá, gostaria de mais informações sobre os serviços da BN Soluções'
                }]
            };
            setMessages([welcomeMessage]);
        }
    }, [isOpen]);

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
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: data.answer || data.response || 'Desculpe, não consegui processar sua mensagem.',
                suggestions: [
                    'Mais detalhes sobre planos?',
                    'Contato agora?'
                ],
                actions: [{
                    type: 'contact_whatsapp',
                    label: 'WhatsApp',
                    url: 'https://wa.me/5511940663895?text=Olá, gostaria de mais informações sobre os serviços da BN Soluções'
                }]
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error('Erro no chatbot:', error);
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: 'Desculpe, estou com dificuldades no momento. Nossa equipe está disponível via WhatsApp: (11) 94066-3895',
                actions: [{
                    type: 'contact_whatsapp',
                    label: 'WhatsApp',
                    url: 'https://wa.me/5511940663895'
                }]
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        handleSendMessage(suggestion);
    };

    const handleActionClick = (action) => {
        if (action.type === 'contact_whatsapp') {
            window.open(action.url, '_blank');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Abrir chat"
                >
                    <FiMessageCircle size={24} />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FiBot size={20} />
                            <span className="font-semibold">Assistente BN</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 transition-colors"
                            aria-label="Fechar chat"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs px-4 py-2 rounded-lg ${
                                        message.type === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    <div className="flex items-start gap-2">
                                        {message.type === 'bot' && <FiBot size={16} className="mt-1 flex-shrink-0" />}
                                        {message.type === 'user' && <FiUser size={16} className="mt-1 flex-shrink-0" />}
                                        <div>
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            
                                            {/* Suggestions */}
                                            {message.suggestions && message.suggestions.length > 0 && (
                                                <div className="mt-2 space-y-1">
                                                    {message.suggestions.map((suggestion, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleSuggestionClick(suggestion)}
                                                            className="block w-full text-left text-xs bg-white text-blue-600 border border-blue-600 rounded px-2 py-1 hover:bg-blue-50 transition-colors"
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Actions */}
                                            {message.actions && message.actions.length > 0 && (
                                                <div className="mt-2 space-y-1">
                                                    {message.actions.map((action, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleActionClick(action)}
                                                            className="block w-full text-left text-xs bg-green-600 text-white rounded px-2 py-1 hover:bg-green-700 transition-colors"
                                                        >
                                                            📱 {action.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                                    <div className="flex items-center gap-2">
                                        <FiBot size={16} />
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Digite sua mensagem..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim() || isLoading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg px-3 py-2 transition-colors"
                            >
                                <FiSend size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
