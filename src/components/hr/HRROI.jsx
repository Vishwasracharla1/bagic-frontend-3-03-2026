import { useEffect, useRef } from 'react'
import { MOCK_DATA } from '../../data/mockData'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function HRROI() {
    const hr = MOCK_DATA.hr
    const roi = hr.roiCalculator
    const chartRef = useRef(null)
    const chartInstance = useRef(null)

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy()
            chartInstance.current = new Chart(chartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['External', 'Internal Scale'],
                    datasets: [{
                        data: [roi.calculations.externalCoachingAvoided, roi.calculations.internalScaleUpAvoided],
                        backgroundColor: ['#2196F3', '#4CAF50'],
                        borderWidth: 0,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } },
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
                    <i className="fas fa-calculator text-primary-blue text-xl"></i>
                    ROI Calculator
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Financial analysis and business case</p>
            </div>

            {/* Summary Banner */}
            <div className="bg-gradient-to-br from-success to-emerald-700 text-white rounded-xl p-6 mb-6 shadow-md shadow-success/10 border border-success/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold mb-0.5 tracking-tight">{roi.calculations.roiYear1.toFixed(1)}x</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Year 1 ROI</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold mb-0.5 tracking-tight">${(roi.calculations.totalValueYear1 / 1000000).toFixed(2)}M</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Total Value</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold mb-0.5 tracking-tight">${(roi.calculations.netSavingsYear1 / 1000000).toFixed(2)}M</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Net Savings</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                    {/* Cost Avoidance Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-chart-pie text-primary-blue text-[10px]"></i> Cost Avoidance
                            </h2>
                        </div>
                        <div className="p-4">
                            <div className="h-[200px] mb-4">
                                <canvas ref={chartRef}></canvas>
                            </div>
                            <div className="space-y-2">
                                {[
                                    { label: 'External Avoided', value: `$${(roi.calculations.externalCoachingAvoided / 1000000).toFixed(2)}M` },
                                    { label: 'Internal Scale Avoided', value: `$${(roi.calculations.internalScaleUpAvoided / 1000000).toFixed(2)}M` },
                                    { label: 'Total Avoidance', value: `$${(roi.calculations.totalAvoidance / 1000000).toFixed(2)}M`, highlight: true },
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between py-2 px-3 rounded-lg ${item.highlight ? 'bg-success/5 border border-success/10' : 'bg-gray-50/50'}`}>
                                        <span className={`text-[11px] ${item.highlight ? 'font-bold text-success uppercase tracking-wider' : 'text-gray-500 font-medium'}`}>{item.label}</span>
                                        <strong className={`text-[11px] font-bold ${item.highlight ? 'text-success' : 'text-gray-800'}`}>{item.value}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Assumptions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-cog text-primary-blue text-[10px]"></i> Assumptions
                            </h2>
                        </div>
                        <div className="p-4 space-y-2">
                            {[
                                { label: 'Ext. Coaching Cost', value: `${roi.assumptions.externalCoachingCost.toLocaleString()}/emp` },
                                { label: 'Platform Cost Y1', value: `$${roi.assumptions.platformCostYear1.toLocaleString()}` },
                                { label: 'Avg Manager Salary', value: `$${roi.assumptions.avgManagerSalary.toLocaleString()}` },
                                { label: 'Attrition Reduct.', value: `${roi.assumptions.managerAttritionReduction}%` },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-b-0">
                                    <span className="text-[11px] text-gray-500 font-medium">{item.label}</span>
                                    <strong className="text-[11px] font-bold text-gray-700">{item.value}</strong>
                                </div>
                            ))}
                            <button className="text-primary-blue bg-transparent border-none text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:underline mt-2">Adjust Params</button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Val Add */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-plus-circle text-primary-blue text-[10px]"></i> Additional Value
                            </h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {[
                                { icon: 'user-slash', label: 'Attrition Savings', value: `$${(roi.calculations.attritionSavings / 1000000).toFixed(2)}M`, desc: '20 managers retained' },
                                { icon: 'chart-line', label: 'Productivity Gain', value: `$${(roi.calculations.productivityGain / 1000000).toFixed(2)}M`, desc: '5% avg improvement' },
                                { icon: 'clock', label: 'Time to Prod.', value: `$${(roi.calculations.timeToProductivitySavings / 1000).toFixed(0)}K`, desc: '30-day reduction' },
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50/50 rounded-xl p-3 border border-gray-100/50">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                                            <i className={`fas fa-${item.icon} text-primary-blue text-[10px] opacity-70`}></i>{item.label}
                                        </span>
                                        <strong className="text-[11px] font-bold text-primary-blue">{item.value}</strong>
                                    </div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight m-0">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Report Export */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-file-export text-primary-blue text-[10px]"></i> Reporting
                            </h2>
                        </div>
                        <div className="p-4 grid grid-cols-1 gap-2">
                            <button className="bg-primary-blue text-white border-none py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                                <i className="fas fa-file-pdf"></i> Executive PDF
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="bg-gray-50 text-gray-500 border border-gray-100 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                                    <i className="fas fa-file-excel"></i> Excel
                                </button>
                                <button className="bg-gray-50 text-gray-500 border border-gray-100 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                                    <i className="fas fa-file-powerpoint"></i> PPTX
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Business Case Summary */}
                    <div className="bg-primary-blue/5 rounded-xl border border-primary-blue/10 p-4">
                        <div className="text-[9px] text-primary-blue font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                            <i className="fas fa-info-circle"></i> Case Summary
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[11px] font-bold text-gray-800">$18.5M</div>
                                <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">3-Year NPV</div>
                            </div>
                            <div>
                                <div className="text-[11px] font-bold text-gray-800">&lt; 2 Months</div>
                                <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Payback Period</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
