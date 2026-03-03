import { MOCK_DATA } from '../../data/mockData'

export default function ManagerAlerts() {
    const manager = MOCK_DATA.manager
    const atRiskMembers = manager.team.filter(m => m.alerts && m.alerts.length > 0)

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-exclamation-triangle text-primary-blue text-xl"></i>
                    Team Alerts & Risks
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Proactive monitoring for your team</p>
            </div>

            {/* Alert Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-danger">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center text-danger text-sm">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-900 leading-none mb-1">{atRiskMembers.length}</div>
                            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">High Risk Members</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm">
                            <i className="fas fa-user-times"></i>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-900 leading-none mb-1">{manager.team.filter(m => m.sessionsThisMonth === 0).length}</div>
                            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Zero Sessions</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hidden lg:block">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-900 leading-none mb-1">{manager.team.filter(m => m.progress < 30).length}</div>
                            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Low Progress (&lt;30%)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alert Cards */}
            <div className="flex flex-col gap-4">
                {atRiskMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">{member.name}</h2>
                                    <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{member.role}</p>
                                </div>
                            </div>
                            <span className="bg-danger/10 text-danger text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                {member.riskLevel} Risk
                            </span>
                        </div>
                        <div className="p-4">
                            {/* Alerts */}
                            <div className="space-y-1.5 mb-4">
                                {member.alerts.map((alert, i) => (
                                    <div key={i} className="bg-danger/5 border border-danger/10 text-danger p-2 rounded-lg flex items-center gap-2 text-[11px] font-bold">
                                        <i className="fas fa-exclamation-circle text-[12px]"></i>{alert}
                                    </div>
                                ))}
                            </div>

                            {/* Alert Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-4 bg-gray-50/50 rounded-xl p-3 border border-gray-100/50">
                                <div>
                                    <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Progress</span>
                                    <div className="font-bold text-gray-800 text-sm tracking-tight">{member.progress}%</div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Sessions</span>
                                    <div className="font-bold text-gray-800 text-sm tracking-tight">{member.sessionsThisMonth}</div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Last Activity</span>
                                    <div className="font-bold text-gray-800 text-sm tracking-tight">{new Date(member.lastSession).toLocaleDateString()}</div>
                                </div>
                            </div>

                            {/* Recommended Actions */}
                            <div className="mb-5">
                                <h4 className="font-bold text-[11px] text-gray-400 uppercase tracking-widest mb-2.5">AI Recommendations:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {member.riskLevel === 'high' ? (
                                        <>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-calendar text-primary-blue text-[10px]"></i> Schedule 1:1
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-user-tie text-primary-blue text-[10px]"></i> HR Check-in
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-list text-primary-blue text-[10px]"></i> Review Goals
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-bell text-primary-blue text-[10px]"></i> Send Nudge
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-calendar text-primary-blue text-[10px]"></i> Regular 1:1
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-book text-primary-blue text-[10px]"></i> Share Content
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex gap-2">
                                    <button className="bg-primary-blue text-white border-none px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                                        Take Action
                                    </button>
                                    <button className="bg-gray-50 text-gray-500 border border-gray-100 px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-all">
                                        Dismiss
                                    </button>
                                </div>
                                <button className="text-primary-blue bg-transparent border-none text-[10px] font-bold cursor-pointer hover:underline uppercase tracking-wider">
                                    View Timeline
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {atRiskMembers.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Team is on Track</h3>
                        <p className="text-sm text-gray-400 font-medium">No immediate alerts or risks detected by AI.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
