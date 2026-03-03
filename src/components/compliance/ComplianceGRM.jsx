import { MOCK_DATA } from '../../data/mockData'

export default function ComplianceGRM() {
    const compliance = MOCK_DATA.compliance
    const grm = compliance.grmExplorer

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-project-diagram text-primary-blue text-xl"></i>
                    GRM Explorer
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Deep dive into AI reasoning chains</p>
            </div>

            <div className="flex flex-col gap-4">
                {grm.recentQueries.map((query) => (
                    <div key={query.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                            <div>
                                <h2 className="text-sm font-bold text-gray-800 tracking-tight flex items-center gap-2">
                                    <i className="fas fa-microchip text-primary-blue/50 text-xs"></i>
                                    Event: {query.id}
                                </h2>
                                <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                    <span><i className="fas fa-user mr-1 text-[9px]"></i>{query.employee}</span>
                                    <span><i className="fas fa-clock mr-1 text-[9px]"></i>{query.timestamp}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Confidence</div>
                                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${query.confidence >= 80 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                                    }`}>{query.confidence}%</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column: Decision & Evidence */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                                            <i className="fas fa-gavel text-primary-blue text-[10px]"></i> AI Decision
                                        </h3>
                                        <div className="bg-primary-blue/5 rounded-lg p-3 border border-primary-blue/10">
                                            <p className="text-[13px] font-bold text-gray-800 leading-snug m-0">{query.decision}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                                            <i className="fas fa-link text-primary-blue text-[10px]"></i> Evidence Chain
                                        </h3>
                                        <div className="space-y-1.5">
                                            {query.evidenceGraph.nodes.map((node, i) => (
                                                <div key={i} className="flex items-center gap-2.5 bg-gray-50/50 p-2 rounded-lg border border-gray-100/50">
                                                    <div className="w-6 h-6 bg-white border border-gray-100/50 text-primary-blue rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                                        {i + 1}
                                                    </div>
                                                    <div>
                                                        <div className="text-[9px] font-bold text-primary-blue/60 uppercase tracking-tight leading-none mb-0.5">{node.type}</div>
                                                        <div className="text-[11px] text-gray-700 font-medium leading-tight">{node.label}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Rules & Policies */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                                            <i className="fas fa-list-alt text-primary-blue text-[10px]"></i> Rules Applied
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {query.rulesApplied.map((rule, i) => (
                                                <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 py-1.5 px-2 bg-gray-50 rounded border border-gray-100">
                                                    <i className="fas fa-check-circle text-success text-[10px]"></i> {rule}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                                            <i className="fas fa-shield-alt text-primary-blue text-[10px]"></i> Policy Checks
                                        </h3>
                                        <div className="space-y-2">
                                            {query.policyChecks.map((check, i) => (
                                                <div key={i} className={`p-2.5 rounded-lg border-l-2 ${check.status === 'PASS'
                                                    ? 'bg-success/5 border-l-success border-r border-y border-success/10'
                                                    : 'bg-warning/5 border-l-warning border-r border-y border-warning/10'
                                                    }`}>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <strong className="text-[11px] font-bold tracking-tight">{check.policy}</strong>
                                                        <span className={`text-[10px] font-bold flex items-center gap-1 ${check.status === 'PASS' ? 'text-success' : 'text-warning'
                                                            }`}>
                                                            <i className={`fas fa-${check.status === 'PASS' ? 'check-circle' : 'exclamation-triangle'} text-[10px]`}></i>
                                                            {check.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 font-medium m-0 leading-tight">{check.note}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Outcome Summary */}
                            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Outcome Status</span>
                                        <strong className="text-[11px] text-gray-800 uppercase tracking-tight">{query.outcome}</strong>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Verification</span>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                                            <strong className="text-[11px] text-gray-800 uppercase tracking-tight">{query.humanReview}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="bg-primary-blue/5 text-primary-blue border border-primary-blue/10 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary-blue hover:text-white transition-all">
                                        Export Graph
                                    </button>
                                    <button className="bg-gray-50 text-gray-400 border border-gray-100 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-gray-600 transition-all">
                                        Challenge AI
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
