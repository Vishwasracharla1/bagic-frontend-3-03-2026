import { useState, useEffect, useRef } from 'react'
import { MOCK_DATA } from '../../data/mockData'
import * as echarts from 'echarts'

export default function HRDashboardView() {
    const hr = MOCK_DATA.hr
    const dashboard = hr.impactDashboard
    const chartRef = useRef(null)
    const chartInstance = useRef(null)

    const [dynamicStats, setDynamicStats] = useState({
        total_enrolled: 0,
        workforce_pct: 0,
        engagement_pct: 0,
        active_users: 0,
        completion_pct: 0,
        completed_goals: 0,
        cost_savings_million: 0,
        roi: 0
    });
    const [programPerformanceData, setProgramPerformanceData] = useState([]);
    const [activeProgramsData, setActiveProgramsData] = useState([]);

    useEffect(() => {
        const fetchHRStats = async () => {
            try {
                // Fetch Overall Stats
                const statsResponse = await fetch('https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3NDcyNTA5ODgsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "TIDB",
                        definition: "SELECT enrolled.total_enrolled, workforce.workforce_pct, engagement.engagement_pct, engagement.active_users, completion.completion_pct, completion.completed_goals, costs.cost_savings_million, costs.roi FROM ( SELECT COUNT(DISTINCT cm.employee_id) AS total_enrolled FROM t_69a8197942abf6674cbcb8ef_t cm JOIN t_69a82b4442abf6674cbcb928_t e ON e.employee_id = cm.employee_id WHERE e.employment_status <> 'resigned' ) enrolled CROSS JOIN ( SELECT ROUND( 100.0 * COUNT(DISTINCT cm.employee_id) / NULLIF( ( SELECT COUNT(DISTINCT e2.employee_id) FROM t_69a82b4442abf6674cbcb928_t e2 WHERE e2.employment_status <> 'resigned' ), 0 ), 0 ) AS workforce_pct FROM t_69a8197942abf6674cbcb8ef_t cm JOIN t_69a82b4442abf6674cbcb928_t e ON e.employee_id = cm.employee_id WHERE e.employment_status <> 'resigned' ) workforce CROSS JOIN ( SELECT ROUND( 100.0 * COUNT(DISTINCT CASE WHEN s.session_id IS NOT NULL THEN cm.employee_id END) / NULLIF(COUNT(DISTINCT cm.employee_id), 0), 0 ) AS engagement_pct, COUNT(DISTINCT CASE WHEN s.session_id IS NOT NULL THEN cm.employee_id END) AS active_users FROM t_69a8197942abf6674cbcb8ef_t cm JOIN t_69a82b4442abf6674cbcb928_t e ON e.employee_id = cm.employee_id LEFT JOIN t_69a82d5742abf6674cbcb935_t s ON s.employee_id = cm.employee_id WHERE e.employment_status <> 'resigned' ) engagement CROSS JOIN ( SELECT ROUND( AVG(CASE WHEN g.status <> 'cancelled' THEN g.progress_pct END), 0 ) AS completion_pct, COUNT(DISTINCT CASE WHEN g.status = 'completed' OR g.progress_pct >= 100 THEN g.goal_id END) AS completed_goals FROM t_69a8197942abf6674cbcb8ef_t cm JOIN t_69a82b4442abf6674cbcb928_t e ON e.employee_id = cm.employee_id LEFT JOIN t_69a8310842abf6674cbcb943_t g ON g.employee_id = cm.employee_id AND g.program_id = cm.program_id WHERE e.employment_status <> 'resigned' ) completion CROSS JOIN ( SELECT ROUND(COUNT(DISTINCT s.session_id) * 5000.0 / 1000000, 2) AS cost_savings_million, ROUND( (COUNT(DISTINCT s.session_id) * 5000.0) / NULLIF(COUNT(DISTINCT cm.employee_id) * 60.0, 0), 1 ) AS roi FROM t_69a8197942abf6674cbcb8ef_t cm JOIN t_69a82b4442abf6674cbcb928_t e ON e.employee_id = cm.employee_id LEFT JOIN t_69a82d5742abf6674cbcb935_t s ON s.employee_id = cm.employee_id WHERE e.employment_status <> 'resigned' ) costs;"
                    })
                });

                if (statsResponse.ok) {
                    const result = await statsResponse.json();
                    if (result.data && result.data[0]) {
                        setDynamicStats(result.data[0]);
                    }
                }

                // Fetch Program Performance Data (for Chart)
                const performanceResponse = await fetch('https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3NDcyNTA5ODgsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "TIDB",
                        definition: "SELECT p.program_name, COUNT(DISTINCT CASE WHEN cm.status <> 'completed' THEN cm.employee_id END) AS active_count, COUNT(DISTINCT CASE WHEN cm.status = 'completed' THEN cm.employee_id END) AS complete_count FROM t_69a833d242abf6674cbcb945_t p LEFT JOIN t_69a8197942abf6674cbcb8ef_t cm ON p.program_id = cm.program_id LEFT JOIN t_69a82b4442abf6674cbcb928_t e ON e.employee_id = cm.employee_id WHERE e.employment_status <> 'resigned' GROUP BY p.program_id, p.program_name ORDER BY p.program_name;"
                    })
                });

                if (performanceResponse.ok) {
                    const result = await performanceResponse.json();
                    if (result.data) {
                        setProgramPerformanceData(result.data);
                    }
                }

                // Fetch Active Programs Data (for Sidebar)
                const activeProgramsResponse = await fetch('https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3NDcyNTA5ODgsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "TIDB",
                        definition: "SELECT p.program_id, p.program_name, p.status, COUNT(DISTINCT cm.employee_id) AS enrolled_count, COUNT(DISTINCT CASE WHEN cm.status <> 'completed' THEN cm.employee_id END) AS active_count FROM t_69a833d242abf6674cbcb945_t p LEFT JOIN t_69a8197942abf6674cbcb8ef_t cm ON p.program_id = cm.program_id LEFT JOIN t_69a82b4442abf6674cbcb928_t e ON e.employee_id = cm.employee_id WHERE e.employment_status <> 'resigned' GROUP BY p.program_id, p.program_name, p.status ORDER BY enrolled_count DESC ;"
                    })
                });

                if (activeProgramsResponse.ok) {
                    const result = await activeProgramsResponse.json();
                    if (result.data) {
                        setActiveProgramsData(result.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching HR stats:", error);
            }
        };

        fetchHRStats();
    }, []);

    useEffect(() => {
        if (!chartRef.current) return;

        let chart = echarts.getInstanceByDom(chartRef.current);
        if (!chart) {
            chart = echarts.init(chartRef.current);
            chartInstance.current = chart;
        }

        if (programPerformanceData.length > 0) {
            const option = {
                grid: { left: 40, right: 20, top: 40, bottom: 60 },
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                legend: { top: 0, textStyle: { fontSize: 10 } },
                xAxis: {
                    type: 'category',
                    data: programPerformanceData.map(p => p.program_name.split(' ').slice(0, 2).join(' ')),
                    axisLabel: {
                        fontSize: 9,
                        interval: 0,
                        rotate: 30
                    }
                },
                yAxis: { type: 'value', axisLabel: { fontSize: 9 } },
                series: [
                    {
                        name: 'Active',
                        type: 'bar',
                        data: programPerformanceData.map(p => p.active_count),
                        itemStyle: { color: '#5470C6', borderRadius: [2, 2, 0, 0] }
                    },
                    {
                        name: 'Complete',
                        type: 'bar',
                        data: programPerformanceData.map(p => p.complete_count),
                        itemStyle: { color: '#91CC75', borderRadius: [2, 2, 0, 0] }
                    },
                ]
            }
            chart.setOption(option)
        }

        const handleResize = () => {
            if (chartRef.current) {
                const existingInstance = echarts.getInstanceByDom(chartRef.current);
                existingInstance?.resize();
            }
        };
        
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            if (chartRef.current) {
                const existingInstance = echarts.getInstanceByDom(chartRef.current);
                existingInstance?.dispose();
            }
        }
    }, [hr, programPerformanceData])

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
                    { icon: 'users', value: dynamicStats.total_enrolled, label: 'Enrolled', change: `${dynamicStats.workforce_pct}% workforce` },
                    { icon: 'chart-line', value: `${dynamicStats.engagement_pct}%`, label: 'Engagement', change: `${dynamicStats.active_users} active`, color: 'success' },
                    { icon: 'bullseye', value: `${dynamicStats.completion_pct}%`, label: 'Completion', change: `${dynamicStats.completed_goals} goals`, color: 'info' },
                    { icon: 'dollar-sign', value: `$${dynamicStats.cost_savings_million}M`, label: 'Cost Savings', change: `${dynamicStats.roi}x ROI`, color: 'success' },
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
                        <div className="p-4 h-[250px]" ref={chartRef}></div>
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

                <div>
                    {/* Active Programs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/10 flex items-center justify-between flex-shrink-0">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fas fa-list text-primary-blue text-[10px]"></i> Active Programs
                            </h2>
                        </div>
                        <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar lg:max-h-[420px]">
                            {(activeProgramsData.length > 0 ? activeProgramsData : hr.programs).map((program, idx) => {
                                const active = program.active_count ?? program.active;
                                const total = program.enrolled_count ?? program.enrolled;
                                const complete = total - active;
                                const completionPct = total > 0 ? Math.round((complete / total) * 100) : 0;

                                return (
                                    <div key={program.program_id || idx} className="pb-3 border-b border-gray-50 last:border-b-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <strong className="text-[12px] text-gray-800 tracking-tight truncate pr-2">{program.program_name || program.name}</strong>
                                            <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter ${program.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'
                                                }`}>{program.status || 'active'}</span>
                                        </div>
                                        <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-1 mb-1 overflow-hidden">
                                            <div className="bg-success h-full rounded-full" style={{ width: `${completionPct}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                                            <span>Complete: {complete}</span>
                                            <span>Active: {active}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
