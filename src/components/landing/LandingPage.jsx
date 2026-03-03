import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-br from-primary-dark to-primary-blue text-white min-h-screen py-12 px-6">
                <div className="max-w-[1400px] mx-auto">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 text-2xl font-bold mb-4">
                            <i className="fas fa-shield-alt text-3xl"></i>
                            <span>BAGIC</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-3 tracking-tight">AI Leadership Coach Platform</h1>
                        <p className="text-lg opacity-80 font-light">Democratizing Professional Coaching Through Graph-Aware AI</p>
                    </div>

                    {/* Value Props */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                        {[
                            { icon: 'dollar-sign', value: '$2.2M', label: 'Annual Savings' },
                            { icon: 'chart-line', value: '+23%', label: 'Manager Effectiveness' },
                            { icon: 'users', value: '5,000', label: 'Employees Supported' },
                            { icon: 'clock', value: '24/7', label: 'AI Coaching Access' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white/5 backdrop-blur-md p-5 rounded-xl text-center border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                            >
                                <div className="text-2xl mb-2 opacity-70">
                                    <i className={`fas fa-${item.icon}`}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-1">{item.value}</h3>
                                <p className="text-[11px] uppercase tracking-widest opacity-60 font-medium">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Persona Selector */}
                    <div className="bg-white p-8 rounded-2xl my-8 text-gray-900 shadow-xl">
                        <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">Select Demo Persona</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    id: 'employee', icon: 'user', title: 'Employee/Coachee',
                                    name: 'Rahul Sharma', role: 'Claims Team Lead',
                                    features: [
                                        { icon: 'comments', text: 'AI Chat' },
                                        { icon: 'bullseye', text: 'Goal Tracking' },
                                        { icon: 'book', text: 'Content Feed' },
                                    ],
                                },
                                {
                                    id: 'manager', icon: 'user-tie', title: 'Manager/Coach',
                                    name: 'Priya Mehta', role: 'Senior Claims Manager',
                                    features: [
                                        { icon: 'users', text: 'Team View' },
                                        { icon: 'chart-bar', text: 'Analytics' },
                                        { icon: 'clipboard-list', text: 'Session Prep' },
                                    ],
                                },
                                {
                                    id: 'hr', icon: 'briefcase', title: 'HR Program Owner',
                                    name: 'Neha Kapoor', role: 'L&D Head',
                                    features: [
                                        { icon: 'cogs', text: 'Program Studio' },
                                        { icon: 'tachometer-alt', text: 'ROI Dashboard' },
                                        { icon: 'search', text: 'GRM Explorer' },
                                    ],
                                },
                                {
                                    id: 'compliance', icon: 'shield-alt', title: 'Risk/Compliance',
                                    name: 'Arjun Patel', role: 'Compliance Officer',
                                    features: [
                                        { icon: 'project-diagram', text: 'GRM Explorer' },
                                        { icon: 'bell', text: 'Violations Monitor' },
                                        { icon: 'download', text: 'Audit Export' },
                                    ],
                                },
                            ].map((persona) => (
                                <div
                                    key={persona.id}
                                    onClick={() => navigate(`/${persona.id}`)}
                                    className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-primary-blue/30 hover:bg-white hover:shadow-lg group"
                                >
                                    <div className="w-14 h-14 bg-gray-100 text-primary-blue rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                                        <i className={`fas fa-${persona.icon}`}></i>
                                    </div>
                                    <h3 className="text-base font-semibold mb-1 text-gray-800">{persona.title}</h3>
                                    <p className="text-sm font-medium text-primary-blue mb-0.5">{persona.name}</p>
                                    <p className="text-[11px] text-gray-500 mb-4">{persona.role}</p>
                                    <div className="flex flex-col gap-1.5 mb-5 text-left border-t border-gray-100 pt-4">
                                        {persona.features.map((f, idx) => (
                                            <span key={idx} className="flex items-center gap-2 text-[11px] text-gray-600">
                                                <i className={`fas fa-${f.icon} text-primary-blue/70 w-4`}></i>
                                                {f.text}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-full bg-primary-blue/5 text-primary-blue border border-primary-blue/10 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-primary-blue hover:text-white">
                                        Enter Dashboard
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Platform Architecture */}
                    <div className="bg-white p-8 rounded-2xl text-gray-900 shadow-xl">
                        <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">Platform Architecture</h2>
                        <div className="max-w-[900px] mx-auto">
                            {[
                                { title: 'User Experience Layer', boxes: ['Employee Portal', 'Manager Console', 'HR Studio', 'Compliance Hub'] },
                                { title: 'Intelligence Layer', boxes: ['Knowledge Graph', 'GNN Models', 'RAG Engine', 'Explainability'] },
                                { title: 'Data Layer', boxes: ['HRMS Integration', 'LMS Content', '360 Feedback', 'Policy DB'] },
                            ].map((layer, i) => (
                                <div key={i}>
                                    <div className="bg-gray-50 p-4 rounded-xl mb-3 border border-gray-100">
                                        <h4 className="text-center mb-3 text-primary-blue text-sm font-semibold uppercase tracking-wider">{layer.title}</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {layer.boxes.map((box, j) => (
                                                <div key={j} className="bg-white py-2 px-3 rounded-lg border border-gray-200 text-center text-xs font-medium text-gray-700 shadow-sm">
                                                    {box}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {i < 2 && (
                                        <div className="text-center text-xl text-primary-blue opacity-30 my-2">
                                            <i className="fas fa-arrow-down"></i>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
