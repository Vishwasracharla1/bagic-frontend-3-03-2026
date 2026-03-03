import { MOCK_DATA } from '../../data/mockData'

export default function EmployeeSessions() {
    const employee = MOCK_DATA.employee

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-calendar text-primary-blue text-xl"></i>
                    Session History
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Review your past coaching sessions</p>
            </div>

            <div className="flex flex-col gap-4">
                {employee.recentSessions.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                            <div>
                                <h2 className="text-sm font-bold text-gray-800 tracking-tight flex items-center gap-2">
                                    <i className="fas fa-comments text-primary-blue text-xs"></i>
                                    {session.topic}
                                </h2>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-3">
                                    <span><i className="fas fa-calendar mr-1"></i>{new Date(session.date).toLocaleDateString()}</span>
                                    <span><i className="fas fa-clock mr-1"></i>{session.duration} min</span>
                                </p>
                            </div>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${session.type === 'AI' ? 'bg-info/10 text-info border border-info/10' :
                                session.type === 'Reflection' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                    'bg-success/10 text-success border border-success/10'
                                }`}>{session.type}</span>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100/50">
                                    <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Framework</span>
                                    <p className="text-[11px] font-bold text-gray-700 mt-1">{session.framework || 'N/A'}{session.stage ? ` • ${session.stage}` : ''}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100/50">
                                    <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Outcome</span>
                                    <p className="text-[11px] font-bold text-gray-700 mt-1 truncate">{session.outcome}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100/50">
                                    <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Experience</span>
                                    <p className={`text-[11px] font-bold mt-1 uppercase flex items-center gap-1.5 ${session.sentiment === 'positive' ? 'text-success' : 'text-warning'}`}>
                                        <i className={`fas fa-${session.sentiment === 'positive' ? 'smile' : 'meh'} text-[12px]`}></i>
                                        {session.sentiment}
                                    </p>
                                </div>
                            </div>
                            {session.actionItems && (
                                <div className="mb-5 bg-primary-blue/5 p-3 rounded-lg border border-primary-blue/5">
                                    <span className="text-[9px] text-primary-blue/60 uppercase tracking-widest font-bold mb-2 block">AI Transcribed Actions</span>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                                        {session.actionItems.map((item, i) => (
                                            <div key={i} className="flex items-start gap-2 text-[11px] text-gray-600 font-medium">
                                                <i className="fas fa-check-circle text-success text-[10px] mt-0.5"></i>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex gap-2">
                                    <button className="bg-primary-blue text-white border-none px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                                        Transcript
                                    </button>
                                    <button className="bg-white text-gray-500 border border-gray-100 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-50 hover:text-gray-700 transition-all">
                                        <i className="fas fa-redo mr-1 text-[9px]"></i> Continue
                                    </button>
                                </div>
                                <button className="text-primary-blue bg-transparent border-none text-[10px] font-bold cursor-pointer hover:underline uppercase tracking-wider">
                                    Add Reflection
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
