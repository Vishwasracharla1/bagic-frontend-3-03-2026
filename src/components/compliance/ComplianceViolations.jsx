import { MOCK_DATA } from '../../data/mockData'

export default function ComplianceViolations() {
    const compliance = MOCK_DATA.compliance
    const monitor = compliance.grmExplorer.violationMonitor

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-bell text-primary-blue text-xl"></i>
                    Violation Monitor
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Real-time boundary breach detection</p>
            </div>

            {/* Status Banner */}
            <div className="flex items-center gap-4 p-4 rounded-xl mb-4 bg-success/5 border border-success/10">
                <div className="w-10 h-10 bg-success/10 text-success rounded-full flex items-center justify-center text-xl">
                    <i className="fas fa-check-circle"></i>
                </div>
                <div>
                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">System Status: Compliant</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">All systems operating within boundaries</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { icon: 'shield-alt', value: monitor.totalViolations, label: 'Total Violations', cls: 'border-l-4 border-l-success' },
                    { icon: 'heartbeat', value: monitor.categories.clinicalBoundary, label: 'Clinical Boundary', cls: '' },
                    { icon: 'gavel', value: monitor.categories.legalRisk, label: 'Legal Risk', cls: '' },
                    { icon: 'user-shield', value: monitor.categories.confidentiality, label: 'Confidentiality', cls: '' },
                ].map((stat, i) => (
                    <div key={i} className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${stat.cls}`}>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm flex-shrink-0">
                                <i className={`fas fa-${stat.icon}`}></i>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900 leading-none mb-1">{stat.value}</div>
                                <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-tight">{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-success/5 text-success rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-success/10">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">No Recent Alerts</h3>
                <p className="text-sm text-gray-400 font-medium">All AI interactions are currently within safety protocols.</p>
                <div className="mt-6">
                    <button className="bg-gray-50 text-gray-500 border border-gray-100 px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-all">
                        Run Diagnostics
                    </button>
                </div>
            </div>
        </div>
    )
}
