import { useNavigate } from 'react-router-dom'
import { MOCK_DATA } from '../../data/mockData'

export default function HRPrograms() {
    const navigate = useNavigate()
    const hr = MOCK_DATA.hr

    return (
        <div>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                        <i className="fas fa-list text-primary-blue text-xl"></i>
                        Active Programs
                    </h1>
                    <p className="text-gray-400 text-sm font-medium tracking-wide">Manage and monitor all coaching programs</p>
                </div>
                <button
                    onClick={() => navigate('/hr/studio')}
                    className="bg-primary-blue text-white border-none px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2 hover:bg-primary-dark transition-all shadow-sm shadow-primary-blue/20"
                >
                    <i className="fas fa-plus text-[9px]"></i> Create New
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {hr.programs.map((program) => (
                    <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:border-primary-blue/20 transition-all">
                        <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                            <div>
                                <h2 className="text-sm font-bold text-gray-800 tracking-tight flex items-center gap-3">
                                    {program.name}
                                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest ${program.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'}`}>
                                        {program.status}
                                    </span>
                                </h2>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{program.eligibility}</p>
                            </div>
                            <button className="text-gray-300 hover:text-primary-blue transition-colors bg-transparent border-none cursor-pointer">
                                <i className="fas fa-ellipsis-v text-xs"></i>
                            </button>
                        </div>
                        <div className="p-5">
                            {/* Stats Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {[
                                    { label: 'Start Date', value: new Date(program.startDate).toLocaleDateString(), icon: 'calendar' },
                                    { label: 'Duration', value: `${program.duration}d`, icon: 'clock' },
                                    { label: 'Size', value: `${program.enrolled} Enrolled`, icon: 'users' },
                                    { label: 'Coverage', value: program.targetBUs[0], icon: 'building' },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-primary-blue/50 text-xs border border-gray-100/50">
                                            <i className={`fas fa-${stat.icon}`}></i>
                                        </div>
                                        <div>
                                            <div className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter leading-none mb-1">{stat.label}</div>
                                            <div className="text-[11px] font-bold text-gray-700 tracking-tight leading-none">{stat.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-4 gap-2 mb-6">
                                {[
                                    { value: `${program.metrics.activeRate}%`, label: 'Active', color: 'primary-blue' },
                                    { value: `${program.metrics.completionRate}%`, label: 'Compl.', color: 'success' },
                                    { value: program.metrics.avgSessions, label: 'Avg Sess', color: 'warning' },
                                    { value: `$${program.metrics.costPerEmployee}`, label: 'Cost/Emp', color: 'success' },
                                ].map((m, i) => (
                                    <div key={i} className={`text-center p-2 rounded-xl bg-${m.color}/5 border border-${m.color}/10`}>
                                        <div className={`text-[13px] font-bold text-${m.color} tracking-tight`}>{m.value}</div>
                                        <div className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter opacity-70">{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Goals */}
                            {program.goals && (
                                <div className="mb-6">
                                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <i className="fas fa-bullseye text-[10px]"></i> Logic Nodes
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {program.goals.map((goal, i) => (
                                            <span key={i} className="bg-gray-50 border border-gray-100 text-gray-600 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-tight">
                                                {goal}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex gap-4">
                                    <button className="text-[10px] font-bold text-primary-blue uppercase tracking-widest hover:underline bg-transparent border-none cursor-pointer">Performance Matrix</button>
                                    <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer">Configuration</button>
                                </div>
                                <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary-blue bg-transparent border-none cursor-pointer">
                                    <i className="fas fa-file-download mr-1.5"></i> Export
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
