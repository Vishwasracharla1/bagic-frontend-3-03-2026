import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MOCK_DATA } from '../../data/mockData'

/**
 * A floating chatbot component that appears in the bottom right corner.
 * Designed with premium aesthetics, glassmorphism, and smooth animations.
 */
export default function FloatingChatbot() {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    
    // Don't show chatbot on login page
    if (location.pathname === '/login') {
        return null
    }

    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            message: "Hi! I'm your AI Coach. How can I help you today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const chatEndRef = useRef(null)

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (isOpen) {
            scrollToBottom()
        }
    }, [messages, isOpen])

    const formatMessage = (text) => {
        if (typeof text !== 'string') return text;
        
        // Regex to find session/entity IDs
        const idRegex = /((?:S-|RE-|BAJ)\d+)/g;
        
        return (
            <div className="space-y-1">
                {text.split('\n').map((line, lineIdx) => {
                    const lineParts = line.split(idRegex);
                    return (
                        <p key={lineIdx} className="m-0">
                            {lineParts.map((part, i) => {
                                if (/^S-\d+$/.test(part)) {
                                    return (
                                        <span key={i} className="inline-flex items-center bg-blue-50 text-primary-blue px-2 py-0.5 rounded-lg border border-blue-100 font-bold text-[11px] mx-0.5 shadow-sm">
                                            <i className="fas fa-calendar-check mr-1.5 text-[9px] opacity-70"></i>
                                            {part}
                                        </span>
                                    );
                                }
                                if (/^RE-\d+$/.test(part)) {
                                    return (
                                        <span key={i} className="inline-flex items-center bg-green-50 text-green-600 px-2 py-0.5 rounded-lg border border-green-100 font-bold text-[11px] mx-0.5 shadow-sm">
                                            <i className="fas fa-clipboard-list mr-1.5 text-[9px] opacity-70"></i>
                                            {part}
                                        </span>
                                    );
                                }
                                if (/^BAJ\d+$/.test(part)) {
                                    return (
                                        <span key={i} className="inline-flex items-center bg-purple-50 text-purple-600 px-2 py-0.5 rounded-lg border border-purple-100 font-bold text-[11px] mx-0.5 shadow-sm">
                                            <i className="fas fa-id-badge mr-1.5 text-[9px] opacity-70"></i>
                                            {part}
                                        </span>
                                    );
                                }
                                return part;
                            })}
                        </p>
                    );
                })}
            </div>
        );
    };

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = {
            sender: 'user',
            message: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsTyping(true)

        try {
            const response = await fetch('https://ig.gov-cloud.ai/chatbot-ai-coach/chat', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "question": userMessage.message
                })
            })

            const data = await response.json()
            const aiReplyText = data?.answer || data?.reply?.replyText || (typeof data === 'string' ? data : (data.message || "I'm here to help with your coaching needs."))

            const aiResponse = {
                sender: 'ai',
                message: aiReplyText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            
            setTimeout(() => {
                setMessages(prev => [...prev, aiResponse])
                setIsTyping(false)
            }, 600)
        } catch (error) {
            console.error("Chatbot error:", error)
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    sender: 'ai',
                    message: "I'm having a bit of trouble connecting to my knowledge base. How else can I assist?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }])
                setIsTyping(false)
            }, 600)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[400px] h-[580px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden transition-all duration-300 ease-out transform origin-bottom-right">
                    {/* Header */}
                    <div className="p-4 bg-primary-blue text-white flex items-center justify-between shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-inner">
                                <i className="fas fa-robot text-xl"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-tight">BAGIC AI Coach</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Active Intelligence</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-all relative z-10"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-5 overflow-y-auto bg-gray-50/40 flex flex-col gap-5 custom-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && (
                                    <div className="w-7 h-7 bg-primary-blue/10 text-primary-blue rounded-lg flex items-center justify-center mr-2 flex-shrink-0 text-[10px] border border-primary-blue/5">
                                        <i className="fas fa-robot"></i>
                                    </div>
                                )}
                                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] font-medium leading-relaxed shadow-sm transition-all hover:shadow-md ${
                                    msg.sender === 'user' 
                                        ? 'bg-primary-blue text-white rounded-br-none shadow-primary-blue/10' 
                                        : 'bg-white text-gray-800 border border-gray-100/50 rounded-bl-none'
                                }`}>
                                    {msg.sender === 'ai' ? formatMessage(msg.message) : msg.message}
                                    <div className={`text-[9px] mt-2 opacity-40 font-bold uppercase tracking-tighter ${msg.sender === 'user' ? 'text-right text-white' : 'text-left text-gray-500'}`}>
                                        {msg.timestamp}
                                    </div>
                                </div>
                                {msg.sender === 'user' && (
                                    <div className="w-7 h-7 bg-gray-200 text-gray-500 rounded-lg flex items-center justify-center ml-2 flex-shrink-0 text-[10px] border border-gray-300/20">
                                        <i className="fas fa-user-circle"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="w-7 h-7 bg-primary-blue/10 rounded-lg mr-2 flex-shrink-0"></div>
                                <div className="bg-white border border-gray-100 p-3.5 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-primary-blue/40 rounded-full animate-bounce [animation-duration:0.6s]"></span>
                                    <span className="w-1.5 h-1.5 bg-primary-blue/40 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-primary-blue/40 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 bg-gray-50 border border-transparent rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-primary-blue/30 focus:ring-4 focus:ring-primary-blue/5 transition-all"
                            />
                            <button 
                                onClick={handleSend}
                                className="w-10 h-10 bg-primary-blue text-white rounded-xl shadow-lg shadow-primary-blue/20 flex items-center justify-center hover:bg-primary-dark transition-all transform active:scale-95"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-90 ${
                    isOpen 
                        ? 'bg-gray-800 text-white rotate-90' 
                        : 'bg-primary-blue text-white'
                }`}
            >
                {isOpen ? (
                    <i className="fas fa-times text-xl"></i>
                ) : (
                    <div className="relative">
                        <i className="fas fa-comment-dots text-2xl"></i>
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                    </div>
                )}
            </button>
        </div>
    )
}
