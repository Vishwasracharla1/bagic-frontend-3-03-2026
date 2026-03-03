import { useState, useRef, useEffect } from 'react'
import { MOCK_DATA } from '../../data/mockData'

export default function EmployeeChat() {
    const employee = MOCK_DATA.employee
    const [messages, setMessages] = useState(employee.chatHistory || [])
    const [input, setInput] = useState('')
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const chatEndRef = useRef(null)

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Speech Recognition Setup
    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            alert("Your browser does not support speech recognition.")
            return
        }

        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onstart = () => {
            setIsListening(true)
        }

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            setInput(transcript)
        }

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error)
            setIsListening(false)
        }

        recognition.onend = () => {
            setIsListening(false)
        }

        recognition.start()
    }

    // Text to Speech
    const speakText = (text) => {
        if (!window.speechSynthesis) {
            alert("Your browser does not support text to speech.")
            return
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        window.speechSynthesis.speak(utterance)
    }

    const handleSend = () => {
        if (!input.trim()) return

        const newUserMessage = {
            sender: 'user',
            message: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, newUserMessage])
        setInput('')

        // Simulate AI Response
        setTimeout(() => {
            const aiResponses = [
                "That's a great observation. How do you plan to address this with your team?",
                "I've analyzed your progress on the 'SBI Feedback' goal. You're doing well, but let's focus on the 'Impact' part next.",
                "Would you like to role-play a difficult conversation now?",
                "I've updated your learning path with a new module on 'Active Listening'."
            ]
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
            const aiResponse = {
                sender: 'ai',
                message: randomResponse,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, aiResponse])

            // Auto speak the AI response
            speakText(randomResponse)
        }, 1000)
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-comments text-primary-blue text-xl"></i>
                    AI Coach Chat
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Your personal AI coaching assistant</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px]">
                {/* Header */}
                <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/20 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary-blue text-white rounded-lg flex items-center justify-center text-sm shadow-sm">
                            <i className="fas fa-robot"></i>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-800 tracking-tight">BAGIC AI Coach</h2>
                            <span className="text-[10px] text-success font-bold flex items-center gap-1 uppercase tracking-wider">
                                <i className="fas fa-circle text-[4px]"></i> AI Active
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-white text-gray-400 border border-gray-100 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:text-gray-600 transition-all">
                            <i className="fas fa-file-export mr-1"></i> Export
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-5 overflow-y-auto bg-gray-50/30 flex flex-col gap-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && (
                                <div className="w-7 h-7 bg-primary-blue/10 text-primary-blue rounded-lg flex items-center justify-center mr-2.5 flex-shrink-0 text-xs border border-primary-blue/5">
                                    <i className="fas fa-robot"></i>
                                </div>
                            )}
                            <div className={`max-w-[75%] p-3.5 rounded-2xl text-[13px] font-medium leading-[1.6] relative group ${msg.sender === 'user'
                                ? 'bg-primary-blue text-white rounded-br-sm shadow-sm'
                                : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100 shadow-sm'
                                }`}>
                                {msg.sender === 'ai' && (
                                    <button
                                        onClick={() => speakText(msg.message)}
                                        className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-primary-blue bg-white w-6 h-6 rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-[10px]"
                                        title="Speak message"
                                    >
                                        <i className="fas fa-volume-up"></i>
                                    </button>
                                )}
                                <p className="m-0">{msg.message}</p>
                                <span className={`text-[9px] mt-2 block font-bold uppercase tracking-tighter ${msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                                    {msg.timestamp}
                                </span>
                            </div>
                            {msg.sender === 'user' && (
                                <div className="w-7 h-7 bg-success/10 text-success rounded-lg flex items-center justify-center ml-2.5 flex-shrink-0 text-xs border border-success/5">
                                    <i className="fas fa-user-circle"></i>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-50 bg-white flex-shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={isListening ? "Listening..." : "Ask any leadership question..."}
                                className={`w-full p-2.5 bg-gray-50 border border-transparent rounded-xl text-sm outline-none focus:bg-white focus:border-primary-blue/30 focus:ring-4 focus:ring-primary-blue/5 transition-all font-medium text-gray-800 pr-10 ${isListening ? 'ring-2 ring-primary-blue/20 bg-primary-blue/5' : ''}`}
                            />
                            <button
                                onClick={startListening}
                                className={`absolute right-3 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer transition-colors ${isListening ? 'text-danger animate-pulse' : 'text-gray-400 hover:text-primary-blue'}`}
                                title="Voice input"
                            >
                                <i className={`fas fa-${isListening ? 'microphone' : 'microphone'}`}></i>
                            </button>
                        </div>
                        <button
                            onClick={handleSend}
                            className="bg-primary-blue text-white border-none px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2 hover:bg-primary-dark transition-all shadow-sm shadow-primary-blue/20"
                        >
                            <i className="fas fa-paper-plane"></i> Send
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                            {['Practice feedback', 'Review my goals', 'Suggest content'].map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(q)}
                                    className="whitespace-nowrap bg-gray-50 text-gray-400 border border-gray-100/50 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary-blue/5 hover:text-primary-blue hover:border-primary-blue/20 transition-all"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {isSpeaking && (
                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary-blue uppercase tracking-widest animate-pulse">
                                <i className="fas fa-volume-up"></i> Speaking
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

