import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_DATA } from '../../data/mockData'
import * as echarts from 'echarts'

export default function ComplianceOverview() {
    const navigate = useNavigate()
    const compliance = MOCK_DATA.compliance
    const overview = compliance.complianceOverview
    const chartRef = useRef(null)
    const chartInstance = useRef(null)

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) chartInstance.current.dispose()
            chartInstance.current = echarts.init(chartRef.current)

            const option = {
                grid: { left: 50, right: 20, top: 40, bottom: 40 },
                tooltip: { trigger: 'axis', axisPointer: { type: 'line' } },
                legend: { top: 0, textStyle: { fontSize: 10 }, icon: 'circle' },
                xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], splitLine: { show: false }, axisLabel: { fontSize: 9 } },
                yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed', opacity: 0.3 } }, axisLabel: { fontSize: 9 } },
                series: [{
                    name: 'Audit Events',
                    type: 'line',
                    smooth: true,
                    data: [6234, 7891, 9234, 12847],
                    itemStyle: { color: '#5470C6' },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(84, 112, 198, 0.3)' },
                            { offset: 1, color: 'rgba(84, 112, 198, 0.05)' }
                        ])
                    },
                    symbol: 'circle',
                    symbolSize: 6
                }]
            }

            chartInstance.current.setOption(option)
        }

        const handleResize = () => chartInstance.current?.resize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            chartInstance.current?.dispose()
        }
    }, [overview])

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-shield-alt text-primary-blue text-xl"></i>
                    Compliance Overview
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Q4 2023 - Comprehensive audit status</p>
            </div>

            {/* Status Banner */}
            <div className={`flex items-center gap-4 p-4 rounded-xl mb-4 border shadow-sm ${overview.violations === 0 ? 'bg-success/5 border-success/10' : 'bg-warning/5 border-warning/10'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${overview.violations === 0 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    <i className={`fas fa-${overview.violations === 0 ? 'check-circle' : 'exclamation-triangle'}`}></i>
                </div>
                <div className="flex-1">
                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">{overview.violations === 0 ? 'All Systems Compliant' : 'Attention Required'}</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                        {overview.violations === 0
                            ? `${overview.totalReasoningEvents.toLocaleString()} events audited - 0 boundary breaches.`
                            : `${overview.violations} violation(s) detected. Immediate review required.`}
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { icon: 'check-circle', value: overview.totalReasoningEvents.toLocaleString(), label: 'Reasoning Events', change: 'Q4 2023' },
                    { icon: 'shield-alt', value: overview.violations, label: 'Violations', change: '100% Pass', color: 'success' },
                    { icon: 'exclamation-circle', value: overview.escalations, label: 'Escalations', change: `${((overview.escalations / overview.totalReasoningEvents) * 100).toFixed(2)}% rate` },
                    { icon: 'clipboard-check', value: `${overview.auditPassRate}%`, label: 'Pass Rate', change: 'Validated', color: 'success' },
                ].map((stat, i) => (
                    <div key={i} className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${stat.color ? `border-l-4 border-l-${stat.color}` : ''}`}>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm">
                                <i className={`fas fa-${stat.icon}`}></i>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-gray-800 leading-none mb-1">{stat.value}</div>
                                <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">{stat.label}</div>
                                <div className="text-[8px] text-success font-bold tracking-tighter uppercase">{stat.change}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Boundary Protection */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-shield-alt text-primary-blue text-[10px]"></i> Boundary Protection
                            </h2>
                        </div>
                        <div className="p-4 space-y-4">
                            {Object.entries(overview.boundaryCategories).map(([category, data]) => (
                                <div key={category} className="pb-4 border-b border-gray-50 last:border-b-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h3 className="text-[12px] font-bold text-gray-800 tracking-tight">{category.charAt(0).toUpperCase() + category.slice(1)} Boundary</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Checks: {data.checks.toLocaleString()}</span>
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Errors: {data.violations}</span>
                                            </div>
                                        </div>
                                        <div className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${data.violations === 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                                            {data.violations === 0 ? 'Secure' : 'Alert'}
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-1 relative overflow-hidden">
                                        <div className="bg-success h-full rounded-full transition-all duration-700" style={{ width: `${((data.checks - data.violations) / data.checks * 100)}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trend Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-chart-line text-primary-blue text-[10px]"></i> Volume Trend
                            </h2>
                        </div>
                        <div className="p-4 h-[200px]" ref={chartRef}></div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Utility Bench */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-tasks text-primary-blue text-[10px]"></i> Quick Access
                            </h2>
                        </div>
                        <div className="p-3 grid grid-cols-1 gap-2">
                            {[
                                { icon: 'search', label: 'Explore GRM', tab: 'grm' },
                                { icon: 'file-export', label: 'Audit Assets', tab: 'audit' },
                                { icon: 'cog', label: 'Manage Policy', tab: 'policy' },
                                { icon: 'bell', label: 'Monitor Live', tab: 'violations' },
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigate(`/compliance/${action.tab}`)}
                                    className="flex items-center gap-3 p-2 bg-gray-50/50 rounded-xl border border-transparent hover:border-primary-blue/30 hover:bg-white transition-all text-left cursor-pointer group"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center group-hover:bg-primary-blue/5">
                                        <i className={`fas fa-${action.icon} text-primary-blue text-[10px]`}></i>
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-700 group-hover:text-primary-blue">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* System Status Mini */}
                    <div className="bg-primary-blue/5 rounded-xl border border-primary-blue/10 p-4">
                        <div className="text-[9px] text-primary-blue font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                            <i className="fas fa-microchip"></i> Node Status
                        </div>
                        <div className="space-y-2">
                            {['Guardrail Agent', 'GRM Logger', 'Policy Engine'].map((sys) => (
                                <div key={sys} className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                                    <span className="flex items-center gap-2 opacity-80">
                                        <div className="w-1.5 h-1.5 rounded-full bg-success"></div> {sys}
                                    </span>
                                    <span className="text-success text-[9px] font-bold uppercase tracking-tighter">Live</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Mini */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-1.5 border-b border-gray-50 bg-gray-50/10">
                            <h2 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Recent Events</h2>
                        </div>
                        <div className="p-3 space-y-3">
                            {[
                                { title: 'Audit Completed', date: 'Jan 05' },
                                { title: 'Policy Rev 2.1', date: 'Dec 28' },
                                { title: 'Scalability Boost', date: 'Dec 15' },
                            ].map((activity, i) => (
                                <div key={i} className="flex justify-between items-center text-[11px]">
                                    <span className="font-bold text-gray-700 truncate pr-2">{activity.title}</span>
                                    <span className="text-[9px] text-gray-400 font-bold uppercase whitespace-nowrap">{activity.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
