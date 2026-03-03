import { useEffect, useRef } from 'react'
import { MOCK_DATA } from '../../data/mockData'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function HRDashboardView() {
    const hr = MOCK_DATA.hr
    const dashboard = hr.impactDashboard
    const chartRef = useRef(null)
    const chartInstance = useRef(null)

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy()
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: hr.programs.map(p => p.name.split(' ').slice(0, 2).join(' ')),
                    datasets: [
                        { label: 'Active', data: hr.programs.map(p => p.active), backgroundColor: 'rgba(33, 150, 243, 0.7)', borderRadius: 4 },
                        { label: 'Complete', data: hr.programs.map(p => p.completed), backgroundColor: 'rgba(76, 175, 80, 0.7)', borderRadius: 4 },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } },
                    scales: {
                        y: { beginAtZero: true, ticks: { font: { size: 10 } } },
                        x: { ticks: { font: { size: 10 } } }
                    },
                },
            })
        }
        return () => { if (chartInstance.current) chartInstance.current.destroy() }
    }, [])

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-tachometer-alt text-primary-blue text-xl"></i>
                    Impact Dashboard
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Real-time program metrics and ROI</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { icon: 'users', value: dashboard.totalEnrolled, label: 'Enrolled', change: `${dashboard.enrollmentRate}% workforce` },
                    { icon: 'chart-line', value: `${dashboard.activeEngagementRate}%`, label: 'Engagement', change: `${dashboard.totalActive} active`, color: 'success' },
                    { icon: 'bullseye', value: `${dashboard.goalCompletionRate}%`, label: 'Completion', change: `${dashboard.goalsCompleted} goals`, color: 'info' },
                    { icon: 'dollar-sign', value: `$${(dashboard.totalCostSavings / 1000000).toFixed(1)}M`, label: 'Cost Savings', change: `${dashboard.roi.toFixed(1)}x ROI`, color: 'success' },
                ].map((stat, i) => (
                    <div key={i} className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${stat.color ? `border-l-4 border-l-${stat.color}` : ''}`}>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm flex-shrink-0">
                                <i className={`fas fa-${stat.icon}`}></i>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900 leading-none mb-1">{stat.value}</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1.5">{stat.label}</div>
                                <div className="text-[9px] text-success font-bold uppercase tracking-tighter">{stat.change}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {/* Performance Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-chart-bar text-primary-blue text-[10px]"></i> Program Performance
                            </h2>
                        </div>
                        <div className="p-4 h-[250px]">
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </div>

                    {/* Impact Metrics */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-graduation-cap text-primary-blue text-[10px]"></i> Impact Metrics
                            </h2>
                        </div>
                        <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { icon: 'user-check', value: `+${dashboard.manager360Improvement}%`, label: 'Manager Eff.', color: 'primary-blue' },
                                { icon: 'star', value: `+${dashboard.hipoRetentionImprovement}%`, label: 'HiPo Retent.', color: 'success' },
                                { icon: 'clock', value: `-${dashboard.timeToCompetencyReduction}%`, label: 'Competency', color: 'warning' },
                                { icon: 'shield-alt', value: dashboard.boundaryViolations, label: 'Safety Viol.', color: 'success' },
                            ].map((m, i) => (
                                <div key={i} className="text-center p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                                    <div className={`text-${m.color} text-xl font-bold mb-1`}>{m.value}</div>
                                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Active Programs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/10 flex items-center justify-between">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-list text-primary-blue text-[10px]"></i> Active Programs
                            </h2>
                            <button className="text-[10px] text-primary-blue font-bold uppercase tracking-wider hover:underline bg-transparent border-none cursor-pointer">All</button>
                        </div>
                        <div className="p-4 space-y-3">
                            {hr.programs.slice(0, 3).map((program) => (
                                <div key={program.id} className="pb-3 border-b border-gray-50 last:border-b-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <strong className="text-[12px] text-gray-800 tracking-tight truncate pr-2">{program.name}</strong>
                                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter ${program.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'
                                            }`}>{program.status}</span>
                                    </div>
                                    <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-1 mb-2 overflow-hidden">
                                        <div className="bg-success h-full rounded-full" style={{ width: `${program.metrics.completionRate}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                                        <span>Enrolled: {program.enrolled}</span>
                                        <span>Active: {program.active}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ROI Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-dollar-sign text-primary-blue text-[10px]"></i> ROI Summary
                            </h2>
                        </div>
                        <div className="p-4 space-y-2.5">
                            {[
                                { label: 'Cost Savings', value: `$${(dashboard.totalCostSavings / 1000000).toFixed(2)}M` },
                                { label: 'Ext. Coaching Avoided', value: `$${(dashboard.externalCoachingAvoidance / 1000000).toFixed(2)}M` },
                                { label: 'Cost / Emp', value: `$${dashboard.avgCostPerEmployee}` },
                                { label: 'Total ROI', value: `${dashboard.roi.toFixed(1)}x`, highlight: true },
                            ].map((item, i) => (
                                <div key={i} className={`flex items-center justify-between py-1.5 ${item.highlight ? 'border-t border-gray-50 pt-3 mt-1' : ''}`}>
                                    <span className={`text-[11px] ${item.highlight ? 'font-bold text-gray-800 uppercase tracking-wider' : 'text-gray-500 font-medium'}`}>{item.label}</span>
                                    <strong className={`${item.highlight ? 'text-success text-sm' : 'text-gray-700 text-[11px]'}`}>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
