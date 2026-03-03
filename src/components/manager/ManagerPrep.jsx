import { MOCK_DATA } from '../../data/mockData'

export default function ManagerPrep() {
    const manager = MOCK_DATA.manager

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-clipboard-list text-primary-blue text-xl"></i>
                    Session Preparation
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">AI-powered coaching support for your 1:1s</p>
            </div>

            <div className="flex flex-col gap-4">
                {manager.sessionPrep.upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-primary-blue/10 text-primary-blue rounded-lg flex items-center justify-center text-sm">
                                    <i className="fas fa-calendar"></i>
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">1:1 with {meeting.employee}</h2>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                        {new Date(meeting.date + ' ' + meeting.time).toLocaleDateString()} • {meeting.time} ({meeting.duration} min)
                                    </p>
                                </div>
                            </div>
                            <span className="bg-info/10 text-info text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Upcoming</span>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column: Framework & Topics */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-lightbulb text-warning text-[10px]"></i> AI Framework
                                        </h3>
                                        <div className="bg-primary-blue/5 rounded-lg p-3 border border-primary-blue/10">
                                            <div className="text-xs font-bold text-primary-blue mb-0.5">{meeting.aiSuggestions.framework}</div>
                                            <div className="text-[10px] text-primary-blue/70 font-medium">{meeting.aiSuggestions.stage} Stage</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-list text-primary-blue text-[10px]"></i> Discussion Topics
                                        </h3>
                                        <div className="grid grid-cols-1 gap-1.5">
                                            {meeting.aiSuggestions.topics.map((topic, i) => (
                                                <div key={i} className="flex items-center gap-2 text-[11px] text-gray-600 font-medium py-1 px-2 bg-gray-50 rounded border border-gray-100">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-success/60"></div> {topic}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Questions & Alerts */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-question text-primary-blue text-[10px]"></i> Recommended Questions
                                        </h3>
                                        <div className="space-y-2">
                                            {meeting.aiSuggestions.questions.map((question, i) => (
                                                <div key={i} className="flex items-start gap-2.5 p-2 bg-gray-50/50 rounded-lg border border-gray-100/50 group hover:border-primary-blue/20 transition-all">
                                                    <span className="w-5 h-5 bg-primary-blue/10 text-primary-blue rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{question}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {meeting.aiSuggestions.alerts && (
                                        <div>
                                            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <i className="fas fa-exclamation-triangle text-warning text-[10px]"></i> AI Observations
                                            </h3>
                                            {meeting.aiSuggestions.alerts.map((alert, i) => (
                                                <div key={i} className="bg-warning/5 border-l-2 border-l-warning text-warning p-2 rounded-r-md text-[10px] font-bold mb-1.5 flex items-start gap-2">
                                                    <i className="fas fa-info-circle text-[11px] mt-0.5"></i>
                                                    <span>{alert}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button className="bg-primary-blue text-white border-none px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                                        Start Session
                                    </button>
                                    <button className="bg-gray-50 text-gray-500 border border-gray-100 px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-all">
                                        Download Prep
                                    </button>
                                </div>
                                <button className="text-primary-blue bg-transparent border-none text-[10px] font-bold cursor-pointer hover:underline uppercase tracking-wider">
                                    View Progress Record
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
