import { MOCK_DATA } from '../../data/mockData'

export default function HRGRM() {
    const hr = MOCK_DATA.hr

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-search text-primary-blue text-xl"></i>
                    GRM Explorer
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Graph Reasoning Machine - Audit and explain AI decisions</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
                <div className="p-4 bg-gray-50/20">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                            <input
                                type="text"
                                placeholder="Audit AI thinking... e.g., 'Why suggest SBI to Claims?'"
                                className="w-full pl-8 pr-3 py-2 bg-white border border-gray-100 rounded-lg text-xs outline-none focus:border-primary-blue/30 focus:ring-4 focus:ring-primary-blue/5 transition-all font-medium"
                            />
                        </div>
                        <button className="bg-primary-blue text-white border-none px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                            Execute Query
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Queries */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <i className="fas fa-history text-primary-blue text-[10px]"></i> Audit History
                    </h2>
                </div>
                <div className="p-4 space-y-4">
                    {hr.grmQueries.map((query, idx) => (
                        <div key={idx} className="border border-gray-50 rounded-xl p-4 bg-gray-50/20 group hover:border-primary-blue/20 transition-all">
                            <div className="flex items-start justify-between mb-3 border-b border-gray-100/50 pb-2">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800 tracking-tight group-hover:text-primary-blue transition-colors mb-1">{query.query}</h3>
                                    <div className="flex items-center gap-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                                        <span><i className="fas fa-user-circle mr-1 text-[10px]"></i>{query.user}</span>
                                        <span><i className="fas fa-clock mr-1 text-[10px]"></i>{query.timestamp}</span>
                                    </div>
                                </div>
                            </div>

                            {query.results.reasoningEventId ? (
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                                        <div className="text-[9px] text-primary-blue font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                            <i className="fas fa-gavel text-[10px]"></i> Decision Explained
                                        </div>
                                        <p className="text-[11px] font-bold text-gray-700 leading-snug mb-2">{query.results.decision}</p>
                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                                            <span className="text-[9px] text-gray-400 font-bold uppercase">ID: {query.results.reasoningEventId}</span>
                                            {query.results.employee && <span className="text-[9px] text-gray-400 font-bold uppercase">Target: {query.results.employee}</span>}
                                        </div>
                                    </div>

                                    {query.results.evidenceChain && (
                                        <div className="px-1">
                                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                                <i className="fas fa-link text-[10px]"></i> Evidence Path
                                            </div>
                                            <div className="space-y-1.5 border-l border-gray-100 ml-1.5 pl-3">
                                                {query.results.evidenceChain.map((evidence, i) => (
                                                    <div key={i} className="relative flex items-center gap-2 py-0.5">
                                                        <div className="absolute -left-[15px] w-2 h-2 rounded-full border border-gray-100 bg-white shadow-sm"></div>
                                                        <span className="text-[10px] font-bold text-primary-blue uppercase tracking-tighter whitespace-nowrap opacity-60">{evidence.type}:</span>
                                                        <span className="text-[10px] text-gray-600 font-medium truncate">{evidence.data}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-3 bg-white/50 rounded-lg px-2 border border-gray-100/30">
                                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-white border border-gray-50 shadow-sm">
                                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Relevance</span>
                                            <span className="text-[10px] font-bold text-gray-800">{query.results.score}</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-white border border-gray-50 shadow-sm">
                                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Confidence</span>
                                            <span className="text-[10px] font-bold text-gray-800">{query.results.confidence}</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-white border border-gray-50 shadow-sm col-span-2 md:col-span-1">
                                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">Security Pass</span>
                                            <span className={`text-[10px] font-bold ${query.results.policyCompliance === 'PASS' ? 'text-success' : 'text-danger'}`}>{query.results.policyCompliance}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                        <div className="text-sm font-bold text-primary-blue tracking-tight">{query.results.count}</div>
                                        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Employees</div>
                                    </div>
                                    {query.results.avgNudgeResponseRate && (
                                        <div className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                            <div className="text-sm font-bold text-success tracking-tight">{query.results.avgNudgeResponseRate}%</div>
                                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Response</div>
                                        </div>
                                    )}
                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                        <div className="text-sm font-bold text-warning tracking-tight">{(query.results.completionRate || 85)}%</div>
                                        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Completion</div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100/50">
                                <div className="flex gap-4">
                                    <button className="text-primary-blue bg-transparent border-none text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:underline">Full Details</button>
                                    <button className="text-gray-400 bg-transparent border-none text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-primary-blue transition-colors">Export Results</button>
                                </div>
                                <span className="text-[9px] text-gray-300 font-bold italic">AI-Generated Reasoning</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Export Panel Section */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <i className="fas fa-download text-primary-blue text-[10px]"></i> Audit Data Package
                        </h2>
                    </div>
                    <div className="p-4 flex flex-wrap items-end gap-3">
                        <div className="flex-1 min-w-[150px]">
                            <label className="block mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time range</label>
                            <select className="w-full p-2 bg-gray-50 border border-gray-100 rounded text-[11px] font-bold text-gray-700 outline-none">
                                <option>Current Quarter (Q4)</option>
                                <option>Last Quarter (Q3)</option>
                                <option>Custom Range...</option>
                            </select>
                        </div>
                        <div className="flex-shrink-0">
                            <button className="bg-primary-blue text-white border-none px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                                <i className="fas fa-file-export mr-2 text-[9px]"></i> Export reasoning events
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
