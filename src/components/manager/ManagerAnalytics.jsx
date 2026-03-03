import { useEffect, useRef } from 'react'
import { MOCK_DATA } from '../../data/mockData'
import * as echarts from 'echarts'

export default function ManagerAnalytics() {
    const manager = MOCK_DATA.manager
    const progressRef = useRef(null)
    const riskRef = useRef(null)
    const skillRef = useRef(null)
    const chartInstances = useRef([])

    const palette = [
        "#5470C6", "#91CC75", "#EE6666", "#73C0DE", "#FAC858", "#3BA272", "#FC8452", "#9A60B4", "#EA7CCC"
    ]

    useEffect(() => {
        // Clear existing instances
        chartInstances.current.forEach(c => c?.dispose())
        chartInstances.current = []

        // 1. Team Progress Chart (Horizontal Bar - Functional Legend)
        if (progressRef.current) {
            const chart = echarts.init(progressRef.current)
            chartInstances.current.push(chart)

            const names = manager.team.map(m => m.name.split(' ')[0])
            const values = manager.team.map(m => m.progress)

            // One series per person so legend can toggle each bar
            const series = names.map((name, idx) => ({
                name,
                type: 'bar',
                data: names.map((_, i) => i === idx ? values[idx] : 0),
                barWidth: '60%',
                barGap: '-100%',
                itemStyle: {
                    color: values[idx] >= 70 ? '#4CAF50' : values[idx] >= 40 ? '#FFC107' : '#F44336',
                    borderRadius: [0, 4, 4, 0]
                },
                label: {
                    show: true,
                    position: 'right',
                    fontSize: 9,
                    fontWeight: 'bold',
                    formatter: (p) => p.value ? p.value + '%' : ''
                },
                emphasis: { focus: 'series' }
            }))

            chart.setOption({
                grid: { left: 80, right: 40, top: 40, bottom: 20 },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    formatter: (params) => {
                        const active = params.find(p => p.value !== 0) || params[0];
                        return `<div style="font-weight:bold">${active.axisValue}</div><div>Progress: ${active.value}%</div>`;
                    }
                },
                legend: { top: 0, type: 'scroll', icon: 'circle', itemWidth: 10, textStyle: { fontSize: 10 } },
                xAxis: { type: 'value', max: 100, splitLine: { show: false }, axisLabel: { fontSize: 9 } },
                yAxis: { type: 'category', data: names, axisLabel: { fontSize: 10, fontWeight: 'bold' } },
                series
            })
        }

        // 2. Risk Distribution Chart (Doughnut)
        if (riskRef.current) {
            const chart = echarts.init(riskRef.current)
            chartInstances.current.push(chart)

            chart.setOption({
                tooltip: { trigger: 'item' },
                legend: { bottom: 0, icon: 'circle', itemWidth: 8, textStyle: { fontSize: 10 } },
                series: [{
                    type: 'pie',
                    radius: ['50%', '80%'],
                    avoidLabelOverlap: false,
                    itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
                    label: { show: false },
                    emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold' } },
                    data: [
                        { value: manager.teamAnalytics.riskDistribution.low, name: 'Low Risk', itemStyle: { color: '#4CAF50' } },
                        { value: manager.teamAnalytics.riskDistribution.medium, name: 'Medium Risk', itemStyle: { color: '#FFC107' } },
                        { value: manager.teamAnalytics.riskDistribution.high, name: 'High Risk', itemStyle: { color: '#F44336' } },
                    ]
                }]
            })
        }

        // 3. Skill Trends Chart (Line)
        if (skillRef.current) {
            const chart = echarts.init(skillRef.current)
            chartInstances.current.push(chart)

            chart.setOption({
                grid: { left: 40, right: 20, top: 40, bottom: 40 },
                tooltip: { trigger: 'axis' },
                legend: { top: 0, textStyle: { fontSize: 10 } },
                xAxis: { type: 'category', data: ['M1', 'M2', 'M3', 'Current'], boundaryGap: false, axisLabel: { fontSize: 9 } },
                yAxis: { type: 'value', axisLabel: { fontSize: 9, formatter: '+{value}%' } },
                series: [
                    { name: 'Feedback', type: 'line', smooth: true, data: [0, 8, 15, manager.teamAnalytics.improvementTrends.feedbackSkill], itemStyle: { color: '#5470C6' } },
                    { name: 'Delegation', type: 'line', smooth: true, data: [0, 5, 9, manager.teamAnalytics.improvementTrends.delegationSkill], itemStyle: { color: '#91CC75' } },
                    { name: 'EQ', type: 'line', smooth: true, data: [0, 6, 11, manager.teamAnalytics.improvementTrends.emotionalIntelligence], itemStyle: { color: '#EE6666' } }
                ]
            })
        }

        const handleResize = () => chartInstances.current.forEach(c => c?.resize())
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            chartInstances.current.forEach(c => c?.dispose())
        }
    }, [manager])

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
                    <div className="p-4 h-[250px]" ref={progressRef}></div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase tracking-wider">
                            <i className="fas fa-chart-pie text-primary-blue text-xs"></i> Risk Distribution
                        </h2>
                    </div>
                    <div className="p-4 h-[250px]" ref={riskRef}></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase tracking-wider">
                            <i className="fas fa-chart-line text-primary-blue text-xs"></i> Skill Trends
                        </h2>
                    </div>
                    <div className="p-4 h-[250px]" ref={skillRef}></div>
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
