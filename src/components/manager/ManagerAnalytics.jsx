import { useEffect, useRef } from 'react'
import { MOCK_DATA } from '../../data/mockData'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function ManagerAnalytics() {
    const manager = MOCK_DATA.manager
    const progressChartRef = useRef(null)
    const riskChartRef = useRef(null)
    const skillChartRef = useRef(null)
    const charts = useRef([])

    useEffect(() => {
        charts.current.forEach(c => c.destroy())
        charts.current = []

        // Team Progress Chart
        if (progressChartRef.current) {
            charts.current.push(new Chart(progressChartRef.current, {
                type: 'bar',
                data: {
                    labels: manager.team.map(m => m.name.split(' ')[0]),
                    datasets: [{
                        label: 'Goal Progress (%)',
                        data: manager.team.map(m => m.progress),
                        backgroundColor: manager.team.map(m =>
                            m.progress >= 70 ? '#4CAF50' : m.progress >= 40 ? '#FFC107' : '#F44336'
                        ),
                        borderRadius: 4,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, max: 100, ticks: { font: { size: 10 } } },
                        x: { ticks: { font: { size: 10 } } }
                    },
                },
            }))
        }

        // Risk Distribution Chart
        if (riskChartRef.current) {
            charts.current.push(new Chart(riskChartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
                    datasets: [{
                        data: [
                            manager.teamAnalytics.riskDistribution.low,
                            manager.teamAnalytics.riskDistribution.medium,
                            manager.teamAnalytics.riskDistribution.high,
                        ],
                        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
                        borderWidth: 0,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } },
                },
            }))
        }

        // Skill Improvement Chart
        if (skillChartRef.current) {
            charts.current.push(new Chart(skillChartRef.current, {
                type: 'line',
                data: {
                    labels: ['Month 1', 'Month 2', 'Month 3', 'Current'],
                    datasets: [
                        { label: 'Feedback', data: [0, 8, 15, manager.teamAnalytics.improvementTrends.feedbackSkill], borderColor: '#2196F3', tension: 0.4, pointRadius: 2 },
                        { label: 'Delegation', data: [0, 5, 9, manager.teamAnalytics.improvementTrends.delegationSkill], borderColor: '#4CAF50', tension: 0.4, pointRadius: 2 },
                        { label: 'EQ', data: [0, 6, 11, manager.teamAnalytics.improvementTrends.emotionalIntelligence], borderColor: '#FF9800', tension: 0.4, pointRadius: 2 },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { callback: (v) => '+' + v + '%', font: { size: 10 } },
                        },
                        x: { ticks: { font: { size: 10 } } }
                    },
                },
            }))
        }

        return () => charts.current.forEach(c => c.destroy())
    }, [])

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                    <i className="fas fa-chart-bar text-primary-blue text-xl"></i>
                    Team Analytics
                </h1>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Data-driven insights on your team's coaching progress</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { icon: 'chart-line', value: `+${manager.teamAnalytics.improvementTrends.feedbackSkill}%`, label: 'Feedback Imp.' },
                    { icon: 'users', value: `${manager.teamAnalytics.riskDistribution.low}`, label: 'Low Risk members' },
                    { icon: 'star', value: `+${manager.teamAnalytics.improvementTrends.delegationSkill}%`, label: 'Delegation Growth' },
                    { icon: 'heart', value: `+${manager.teamAnalytics.improvementTrends.emotionalIntelligence}%`, label: 'EQ Improvement' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm flex-shrink-0">
                                <i className={`fas fa-${stat.icon}`}></i>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900 leading-none mb-1">{stat.value}</div>
                                <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase tracking-wider">
                            <i className="fas fa-chart-bar text-primary-blue text-xs"></i> Team Progress
                        </h2>
                    </div>
                    <div className="p-4 h-[250px]">
                        <canvas ref={progressChartRef}></canvas>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase tracking-wider">
                            <i className="fas fa-chart-pie text-primary-blue text-xs"></i> Risk Distribution
                        </h2>
                    </div>
                    <div className="p-4 h-[250px]">
                        <canvas ref={riskChartRef}></canvas>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase tracking-wider">
                            <i className="fas fa-chart-line text-primary-blue text-xs"></i> Skill Trends
                        </h2>
                    </div>
                    <div className="p-4 h-[250px]">
                        <canvas ref={skillChartRef}></canvas>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-50">
                        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase tracking-wider">
                            <i className="fas fa-star text-primary-blue text-xs"></i> Focus Areas
                        </h2>
                    </div>
                    <div className="p-4">
                        {manager.teamAnalytics.topSkills.map((skill, index) => (
                            <div key={index} className="mb-4 last:mb-0">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-[11px] font-bold text-gray-700">{skill}</span>
                                    <span className="text-[10px] text-gray-400 font-medium">{manager.team.filter(m => m.goalsActive > 0).length - index} active</span>
                                </div>
                                <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-primary-blue h-full rounded-full transition-all duration-1000" style={{ width: `${90 - (index * 15)}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
