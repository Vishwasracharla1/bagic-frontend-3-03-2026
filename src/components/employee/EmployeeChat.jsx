import { useState, useRef, useEffect } from 'react'
import { MOCK_DATA } from '../../data/mockData'

export default function EmployeeChat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [employees, setEmployees] = useState([])
    const initialId = localStorage.getItem('active_employee_id') || localStorage.getItem('user_id') || ''
    const [selectedEmployee, setSelectedEmployee] = useState(initialId)
    const initialName = localStorage.getItem('active_employee_name') || localStorage.getItem('user_name') || ''
    const [selectedEmployeeName, setSelectedEmployeeName] = useState(initialName)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isLoadingEmployees, setIsLoadingEmployees] = useState(false)
    const role = localStorage.getItem('user_role')
    const chatEndRef = useRef(null)

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (role === 'admin') {
            fetchEmployees()
        }
    }, [role])

    const fetchEmployees = async () => {
        setIsLoadingEmployees(true)
        try {
            const response = await fetch('https://igs.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/69a82b4442abf6674cbcb928/instances/list?size=1000', {
                method: 'POST',
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'authorization': `Bearer ${import.meta.env.VITE_API_AUTHORIZATION_TOKEN}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "dbType": "TIDB",
                    "distinctColumns": ["employee_id","first_name","last_name"]
                })
            })
            const data = await response.json()

            // Handle both flat array and { content: [] } responses
            const content = Array.isArray(data) ? data : (data?.content || [])

            if (Array.isArray(content)) {
                // Ensure unique objects by employee_id
                const uniqueEmployees = []
                const seenIds = new Set()
                
                content.forEach(item => {
                    if (item.employee_id && !seenIds.has(item.employee_id)) {
                        seenIds.add(item.employee_id)
                        uniqueEmployees.push(item)
                    }
                })

                setEmployees(uniqueEmployees)
                if (uniqueEmployees.length > 0) {
                    const currentId = localStorage.getItem('active_employee_id');
                    const currentEmp = uniqueEmployees.find(e => e.employee_id === currentId) || uniqueEmployees[0];
                    
                    setSelectedEmployee(currentEmp.employee_id);
                    setSelectedEmployeeName(`${currentEmp.first_name} ${currentEmp.last_name}`);
                }
            }
        } catch (error) {
            console.error("Error fetching employees", error)
        } finally {
            setIsLoadingEmployees(false)
        }
    }

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

        // Try to find a nice voice
        const voices = window.speechSynthesis.getVoices()
        // Prefer Google voices or high-quality female voices
        const preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
            voices.find(v => v.name.includes(' ') && v.lang.startsWith('en')) ||
            voices.find(v => v.lang.startsWith('en-US')) ||
            voices[0]

        if (preferredVoice) {
            utterance.voice = preferredVoice
        }

        // Adjust for a "nicer" less robotic tone
        utterance.pitch = 1.1 // Slightly higher pitch for a friendlier tone
        utterance.rate = 1.0   // Natural speed
        utterance.volume = 1.0

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        window.speechSynthesis.speak(utterance)
    }

    const handleSend = async () => {
        if (!input.trim()) return
        if (!selectedEmployee) {
            alert("Please select an employee first")
            return
        }

        const userMessageText = input
        const newUserMessage = {
            sender: 'user',
            message: userMessageText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, newUserMessage])
        setInput('')

        try {
            const chatUrl = `https://ig.gov-cloud.ai/ai-coach-agents/coach/chat?employeeId=${selectedEmployee}&message=${encodeURIComponent(userMessageText)}`
            const response = await fetch(chatUrl, {
                method: 'POST',
                headers: {
                    'accept': 'application/json'
                },
                body: ''
            })

            const data = await response.json()
            const aiMessage = data?.reply?.replyText || (typeof data === 'string' ? data : (data.message || "I'm sorry, I couldn't process that."))

            const aiResponse = {
                sender: 'ai',
                message: aiMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, aiResponse])
            speakText(aiMessage)
        } catch (error) {
            console.error("Error calling chat API", error)
            const errorResponse = {
                sender: 'ai',
                message: "Sorry, I had trouble connecting to my brain. Please try again.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, errorResponse])
        }
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[500px]">
                {/* Header */}
                <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/20 flex-shrink-0">
                    <div className="flex items-center gap-6">
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

                        {/* Show searchable dropdown only for Admin */}
                        {role === 'admin' ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-700 flex items-center gap-3 hover:border-primary-blue/30 transition-all shadow-sm group"
                                >
                                    <span className="opacity-40 uppercase tracking-widest text-[9px]">Employee:</span>
                                    <span className="text-primary-blue">{selectedEmployeeName || 'Select...'}</span>
                                    <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} text-[9px] opacity-40 group-hover:opacity-100`}></i>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] max-h-[400px] flex flex-col">
                                        <div className="p-2 sticky top-0 bg-white border-b border-gray-50">
                                            <input
                                                type="text"
                                                placeholder="Search employee..."
                                                className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary-blue/20"
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={(e) => {
                                                    const term = e.target.value.toLowerCase()
                                                    const items = document.querySelectorAll('.chat-emp-item')
                                                    items.forEach(item => {
                                                        const text = item.textContent.toLowerCase()
                                                        item.style.display = text.includes(term) ? 'flex' : 'none'
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="overflow-y-auto">
                                            {employees.map((emp, i) => (
                                                <button
                                                    key={`${emp.employee_id}-${i}`}
                                                    className="chat-emp-item w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-primary-blue/5 hover:text-primary-blue flex items-center justify-between transition-all border-b border-gray-50 last:border-0"
                                                    onClick={() => {
                                                        const name = `${emp.first_name} ${emp.last_name}`
                                                        setSelectedEmployee(emp.employee_id)
                                                        setSelectedEmployeeName(name)
                                                        localStorage.setItem('active_employee_id', emp.employee_id)
                                                        localStorage.setItem('active_employee_name', name)
                                                        setIsDropdownOpen(false)
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                                                            {emp.first_name?.[0]}{emp.last_name?.[0]}
                                                        </div>
                                                        <div>
                                                            <div className="text-gray-800">{emp.first_name} {emp.last_name}</div>
                                                            <div className="text-[9px] opacity-60 font-medium">ID: {emp.employee_id}</div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Just show the name for Employee role
                            <div className="flex items-center gap-3 bg-gray-50/50 px-3 py-1.5 rounded-lg border border-gray-50">
                                <span className="opacity-40 uppercase tracking-widest text-[9px] font-bold text-gray-700">Employee:</span>
                                <span className="text-[11px] font-bold text-gray-600">{selectedEmployeeName}</span>
                            </div>
                        )}
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

