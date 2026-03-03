import { useNavigate } from 'react-router'
import { MOCK_DATA } from '../../data/mockData'
import { getNudgeIcon, getContentIcon } from '../../utils/helpers'

export default function EmployeeOverview() {
    const navigate = useNavigate()
    const employee = MOCK_DATA.employee

    return (
        <div>
            {/* Welcome */}
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-home text-primary-blue text-xl"></i>
                    Welcome, {employee.name.split(' ')[0]}!
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Your AI coaching journey continues</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { icon: 'bullseye', value: `${employee.goals.filter(g => g.status !== 'completed').length}`, label: 'Active Goals', change: `${employee.goals.filter(g => g.status === 'completed').length} completed` },
                    { icon: 'comments', value: employee.recentSessions.length, label: 'Sessions', change: 'This month', color: 'success' },
                    { icon: 'chart-line', value: `${Math.round(employee.goals.reduce((a, g) => a + g.progress, 0) / employee.goals.length)}%`, label: 'Avg Progress', change: 'Across all goals', color: 'info' },
                    { icon: 'star', value: `${employee.goals.filter(g => g.milestones?.some(m => m.completed)).length}`, label: 'Milestones', change: 'In progress', color: 'warning' },
                ].map((stat, i) => (
                    <div key={i} className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${stat.color ? `border-l-4 border-l-${stat.color}` : ''}`}>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm flex-shrink-0">
                                <i className={`fas fa-${stat.icon}`}></i>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900 leading-none mb-1">{stat.value}</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1.5">{stat.label}</div>
                                <div className="text-[9px] text-success font-bold uppercase tracking-tighter opacity-80">{stat.change}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Goals Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-bullseye text-primary-blue text-[10px]"></i> Active Progress
                            </h2>
                            <button className="text-[10px] text-primary-blue font-bold uppercase tracking-wider hover:underline bg-transparent border-none cursor-pointer">View Goals</button>
                        </div>
                        <div className="p-4 space-y-4">
                            {employee.goals.filter(g => g.status !== 'completed').map((goal) => (
                                <div key={goal.id} className="pb-4 border-b border-gray-50 last:border-b-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="text-[13px] font-bold text-gray-800 tracking-tight">{goal.title}</h4>
                                            <p className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5 line-clamp-1">{goal.description}</p>
                                        </div>
                                        <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${goal.status === 'on-track' ? 'bg-success/10 text-success' :
                                            goal.status === 'at-risk' ? 'bg-danger/10 text-danger' :
                                                'bg-warning/10 text-warning'
                                            }`}>{goal.status}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${goal.progress >= 70 ? 'bg-success' : goal.progress >= 40 ? 'bg-warning' : 'bg-danger'
                                                    }`}
                                                style={{ width: `${goal.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 w-8 text-right">{goal.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended Content Preview */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-book-open text-primary-blue text-[10px]"></i> Up Next in Learning
                            </h2>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {employee.contentRecommendations.slice(0, 2).map((content) => (
                                <div key={content.id} className="bg-gray-50/30 border border-gray-100 rounded-xl p-3 hover:border-primary-blue/30 transition-all group cursor-pointer">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 bg-white border border-gray-100 rounded flex items-center justify-center text-[10px] text-primary-blue">
                                            <i className={`fas fa-${getContentIcon(content.type)}`}></i>
                                        </div>
                                        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{content.type}</span>
                                    </div>
                                    <h4 className="text-[12px] font-bold text-gray-800 mb-1 group-hover:text-primary-blue transition-colors line-clamp-1">{content.title}</h4>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter"><i className="fas fa-clock mr-1"></i>{content.duration}m duration</span>
                                        <i className="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-primary-blue transform translate-x-0 group-hover:translate-x-1 transition-all"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* AI Coach Preview */}
                    <div className="bg-primary-blue rounded-2xl p-5 shadow-lg shadow-primary-blue/20 text-white overflow-hidden relative group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-xl">
                                <i className="fas fa-robot"></i>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold tracking-tight">AI Leadership Coach</h2>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">Online now</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-5 border border-white/10">
                            <p className="text-[11px] font-medium leading-relaxed italic text-white/90">
                                "Hi {employee.name.split(' ')[0]}! Ready to practice that feedback scenario?"
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/employee/chat')}
                            className="bg-white text-primary-blue border-none px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer w-full flex items-center justify-center gap-2 transition-all hover:bg-opacity-90 active:scale-95 shadow-sm"
                        >
                            <i className="fas fa-comments"></i> Start conversation
                        </button>
                    </div>


                    {/* Nudges */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-bell text-primary-blue text-[10px]"></i> Action Nudges
                            </h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {employee.nudges.map((nudge) => (
                                <div key={nudge.id} className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all hover:bg-gray-50/50 ${nudge.priority === 'high' ? 'bg-danger/5 border-danger/10' : 'bg-transparent border-transparent'}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${nudge.type === 'action' ? 'bg-blue-100 text-blue-600' :
                                        nudge.type === 'celebration' ? 'bg-amber-100 text-amber-600' :
                                            'bg-emerald-100 text-emerald-600'
                                        }`}>
                                        <i className={`fas fa-${getNudgeIcon(nudge.type)} text-xs`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div className="text-[11px] font-bold text-gray-800 leading-tight">{nudge.action || 'Attention Needed'}</div>
                                            {nudge.priority === 'high' && <span className="text-[7px] bg-danger text-white px-1 rounded uppercase font-bold">Urgent</span>}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-medium mt-0.5 leading-tight">{nudge.message}</div>
                                        <div className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter mt-1.5">{nudge.dueDate || nudge.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
