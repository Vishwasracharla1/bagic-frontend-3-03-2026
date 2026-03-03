import { MOCK_DATA } from '../../data/mockData'

export default function ManagerTeam() {
    const manager = MOCK_DATA.manager

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-users text-primary-blue text-xl"></i>
                    Team Overview
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Monitor and support your team's coaching journey</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { icon: 'users', value: manager.team.length, label: 'Team Members', cls: '' },
                    { icon: 'check-circle', value: `${Math.round(manager.team.reduce((a, m) => a + m.progress, 0) / manager.team.length)}%`, label: 'Avg Progress', cls: 'border-l-4 border-l-success' },
                    { icon: 'exclamation-triangle', value: manager.team.filter(m => m.riskLevel === 'high' || m.riskLevel === 'medium').length, label: 'Attention', cls: 'border-l-4 border-l-danger' },
                    { icon: 'comments', value: manager.team.reduce((a, m) => a + m.sessionsThisMonth, 0), label: 'Sessions', cls: 'border-l-4 border-l-info' },
                ].map((stat, i) => (
                    <div key={i} className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${stat.cls}`}>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm flex-shrink-0">
                                <i className={`fas fa-${stat.icon}`}></i>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900 leading-none mb-1">{stat.value}</div>
                                <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {manager.team.map((member) => (
                    <div key={member.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${member.riskLevel === 'high' ? 'border-l-4 border-l-danger' :
                        member.riskLevel === 'medium' ? 'border-l-4 border-l-warning' : ''
                        }`}>
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${member.riskLevel === 'high' ? 'bg-danger' :
                                    member.riskLevel === 'medium' ? 'bg-warning' : 'bg-success'
                                    }`}>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800">{member.name}</h3>
                                    <p className="text-[11px] text-gray-500">{member.role}</p>
                                </div>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight ${member.riskLevel === 'low' ? 'bg-success/10 text-success' :
                                member.riskLevel === 'medium' ? 'bg-warning/10 text-[#F57C00]' :
                                    'bg-danger/10 text-danger'
                                }`}>{member.riskLevel}</span>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-3 gap-3 mb-3">
                                <div className="text-center">
                                    <div className="text-[10px] text-gray-400 uppercase font-medium">Goals</div>
                                    <div className="text-sm font-bold text-gray-800">{member.goalsActive}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] text-gray-400 uppercase font-medium">Progress</div>
                                    <div className="text-sm font-bold text-gray-800">{member.progress}%</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] text-gray-400 uppercase font-medium">Sessions</div>
                                    <div className="text-sm font-bold text-gray-800">{member.sessionsThisMonth}</div>
                                </div>
                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${member.progress >= 70 ? 'bg-success' : member.progress >= 40 ? 'bg-warning' : 'bg-danger'
                                        }`}
                                    style={{ width: `${member.progress}%` }}
                                ></div>
                            </div>

                            {member.alerts && member.alerts.length > 0 && (
                                <div className="mb-4">
                                    {member.alerts.map((alert, i) => (
                                        <div key={i} className="text-[11px] text-danger flex items-center gap-1.5 mb-1 bg-danger/5 p-1.5 rounded border border-danger/10">
                                            <i className="fas fa-exclamation-circle"></i>{alert}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button className="flex-1 bg-primary-blue/5 text-primary-blue border border-primary-blue/10 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-primary-blue hover:text-white transition-all">
                                    View Analytics
                                </button>
                                <button className="flex-1 bg-gray-50 text-gray-500 border border-gray-100 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-all">
                                    Prep Session
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
