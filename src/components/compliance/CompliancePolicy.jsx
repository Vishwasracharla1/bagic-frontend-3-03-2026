import { MOCK_DATA } from '../../data/mockData'

export default function CompliancePolicy() {
    const compliance = MOCK_DATA.compliance
    const policies = compliance.policyManagement.activePolicies

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-file-contract text-primary-blue text-xl"></i>
                    Policy Management
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Manage guardrails and compliance rules</p>
            </div>

            <div className="flex flex-col gap-4">
                {policies.map((policy) => (
                    <div key={policy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:border-primary-blue/30 transition-all">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-primary-blue/10 text-primary-blue rounded-lg flex items-center justify-center text-sm">
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">{policy.name}</h2>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="bg-primary-blue/5 text-primary-blue text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{policy.category}</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">v{policy.version}</span>
                                    </div>
                                </div>
                            </div>
                            <span className="bg-success/10 text-success text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-success/10">{policy.status} Active</span>
                        </div>
                        <div className="p-4">
                            <p className="text-[11px] text-gray-500 mb-5 leading-relaxed font-medium">{policy.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                {/* Triggers */}
                                {policy.triggers && (
                                    <div>
                                        <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-bolt text-warning text-[10px]"></i> AI Triggers
                                        </h3>
                                        <div className="flex flex-wrap gap-1">
                                            {policy.triggers.map((trigger, i) => (
                                                <span key={i} className="bg-warning/5 text-warning/80 text-[10px] px-2 py-0.5 rounded border border-warning/10 font-bold uppercase tracking-tight">{trigger}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Principles */}
                                {policy.principles && (
                                    <div>
                                        <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-heart text-danger text-[10px]"></i> Principles
                                        </h3>
                                        <div className="flex flex-wrap gap-1">
                                            {policy.principles.map((principle, i) => (
                                                <span key={i} className="bg-success/5 text-success/80 text-[10px] px-2 py-0.5 rounded border border-success/10 font-bold uppercase tracking-tight">{principle}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Row */}
                            <div className="bg-gray-50/50 rounded-lg p-2.5 mb-5 border border-gray-100 flex items-center gap-3">
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Enforcement:</span>
                                <span className="text-[11px] font-bold text-gray-700 tracking-tight leading-none">{policy.action}</span>
                            </div>

                            {/* Stats & Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Success Rate</span>
                                        <strong className="text-[11px] text-success leading-none">{policy.testsPassed} Tests</strong>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Violations</span>
                                        <strong className="text-[11px] text-gray-800 leading-none">{policy.violations} Found</strong>
                                    </div>
                                    <div className="flex flex-col hidden sm:flex">
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Last Updated</span>
                                        <strong className="text-[11px] text-gray-500 leading-none">{new Date(policy.lastUpdated).toLocaleDateString()}</strong>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="bg-primary-blue text-white border-none px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                                        Configure
                                    </button>
                                    <button className="bg-white text-gray-400 border border-gray-100 px-3 py-1.5 rounded-lg text-xs cursor-pointer hover:bg-gray-50 transition-all">
                                        <i className="fas fa-ellipsis-h text-[10px]"></i>
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
