import { MOCK_DATA } from '../../data/mockData'

export default function ComplianceAudit() {
    const compliance = MOCK_DATA.compliance
    const reports = compliance.auditReports

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-clipboard-check text-primary-blue text-xl"></i>
                    Audit Reports
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Quarterly compliance documentation</p>
            </div>

            <div className="flex flex-col gap-4">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                            <div>
                                <h2 className="text-sm font-bold text-gray-800 tracking-tight flex items-center gap-2">
                                    <i className="fas fa-file-alt text-primary-blue/50 text-xs"></i>
                                    Audit Report - {report.period}
                                </h2>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Generated: {new Date(report.generated).toLocaleDateString()}</p>
                            </div>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${report.status === 'PASS' ? 'bg-success/10 text-success border border-success/10' : 'bg-warning/10 text-warning border border-warning/10'
                                }`}>{report.status} Status</span>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                                <div className="bg-gray-50/50 p-3 rounded-lg border border-gray-100/50">
                                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Total Events</div>
                                    <div className="text-lg font-bold text-gray-800 leading-none tracking-tight">{report.totalEvents.toLocaleString()}</div>
                                </div>
                                <div className="bg-success/5 p-3 rounded-lg border border-success/10">
                                    <div className="text-[9px] text-success/60 font-bold uppercase tracking-widest mb-1.5">Violations</div>
                                    <div className="text-lg font-bold text-success leading-none tracking-tight">{report.violations}</div>
                                </div>
                                <div className="bg-gray-50/50 p-3 rounded-lg border border-gray-100/50">
                                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Escalations</div>
                                    <div className="text-lg font-bold text-gray-800 leading-none tracking-tight">{report.escalations}</div>
                                </div>
                                <div className="bg-primary-blue/5 p-3 rounded-lg border border-primary-blue/10">
                                    <div className="text-[9px] text-primary-blue/60 font-bold uppercase tracking-widest mb-1.5">Policy Score</div>
                                    <div className="text-lg font-bold text-primary-blue leading-none tracking-tight">{report.policyCompliance}%</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button className="bg-primary-blue text-white border-none px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                                        <i className="fas fa-download mr-1.5 text-[9px]"></i> Download PDF
                                    </button>
                                    <button className="bg-white text-gray-400 border border-gray-100 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-50 hover:text-gray-600 transition-all">
                                        <i className="fas fa-file-csv mr-1.5 text-[9px]"></i> CSV Export
                                    </button>
                                </div>
                                <button className="text-gray-300 bg-transparent border-none text-[10px] font-bold cursor-pointer hover:text-primary-blue transition-colors uppercase tracking-widest">
                                    View Full Logs
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
