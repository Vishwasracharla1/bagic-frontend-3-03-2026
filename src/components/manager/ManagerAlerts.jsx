import { useState, useEffect } from 'react'
import { MOCK_DATA } from '../../data/mockData'

export default function ManagerAlerts() {
    const [riskSummary, setRiskSummary] = useState({
        high_risk_members: 0,
        zero_sessions: 0,
        low_progress_members: 0
    })
    const [atRiskData, setAtRiskData] = useState([])
    const [activeManagerId, setActiveManagerId] = useState('BAJ00141')
    const [selectedManagerName, setSelectedManagerName] = useState('Vikram Singh')
    const [allManagers, setAllManagers] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [managerSearch, setManagerSearch] = useState('')

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const token = import.meta.env.VITE_ENTITIES_AUTH_TOKEN;
                const response = await fetch('https://igs.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/69a82b4442abf6674cbcb928/instances/list?size=1000', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'authorization': `Bearer ${token}`,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        dbType: "TIDB",
                        distinctColumns: ["employee_id", "first_name", "last_name"]
                    })
                });

                if (response.ok) {
                    const responseData = await response.json();
                    let managerList = [];
                    if (Array.isArray(responseData)) {
                        managerList = responseData;
                    } else if (responseData.data && Array.isArray(responseData.data)) {
                        managerList = responseData.data;
                    } else if (responseData.list && Array.isArray(responseData.list)) {
                        managerList = responseData.list;
                    }
                    setAllManagers(managerList || []);
                }
            } catch (err) {
                console.error("Error fetching managers:", err);
            }
        };
        fetchManagers();
    }, []);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = import.meta.env.VITE_COHORTS_AUTH_TOKEN;
                if (!token) return;

                const headers = {
                    'accept': 'application/json',
                    'authorization': `Bearer ${token}`,
                    'content-type': 'application/json',
                    'origin': 'http://localhost:5173',
                    'referer': 'http://localhost:5173/'
                };

                // Fetch Summary
                const summaryResponse = await fetch('https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        type: "TIDB",
                        definition: `WITH team_members AS ( SELECT e.employee_id FROM t_69a82b4442abf6674cbcb928_t e WHERE e.manager_id = '${activeManagerId}' AND LOWER(COALESCE(e.employment_status, 'active')) = 'active' ), goal_summary AS ( SELECT g.employee_id, ROUND(AVG(COALESCE(g.progress_pct, 0)), 2) AS avg_progress_pct FROM t_69a8310842abf6674cbcb943_t g JOIN team_members tm ON g.employee_id = tm.employee_id WHERE LOWER(COALESCE(g.status, 'active')) IN ('active', 'completed') GROUP BY g.employee_id ), session_summary AS ( SELECT s.employee_id, COUNT(*) AS total_sessions, MAX(DATE(s.started_at)) AS last_session_date, SUM( CASE WHEN YEAR(s.started_at) = YEAR(CURDATE()) AND MONTH(s.started_at) = MONTH(CURDATE()) THEN 1 ELSE 0 END ) AS sessions_this_month FROM t_69a82d5742abf6674cbcb935_t s JOIN team_members tm ON s.employee_id = tm.employee_id GROUP BY s.employee_id ), team_risk AS ( SELECT tm.employee_id, COALESCE(gs.avg_progress_pct, 0) AS avg_progress_pct, COALESCE(ss.total_sessions, 0) AS total_sessions, ss.last_session_date, COALESCE(ss.sessions_this_month, 0) AS sessions_this_month, CASE WHEN COALESCE(ss.total_sessions, 0) = 0 AND COALESCE(gs.avg_progress_pct, 0) < 30 THEN 'HIGH' WHEN ss.last_session_date IS NULL THEN 'HIGH' WHEN ss.last_session_date < CURDATE() - INTERVAL 14 DAY AND COALESCE(gs.avg_progress_pct, 0) < 30 THEN 'HIGH' WHEN COALESCE(ss.sessions_this_month, 0) <= 1 OR COALESCE(gs.avg_progress_pct, 0) < 30 THEN 'MEDIUM' ELSE 'LOW' END AS risk_level FROM team_members tm LEFT JOIN goal_summary gs ON tm.employee_id = gs.employee_id LEFT JOIN session_summary ss ON tm.employee_id = ss.employee_id ) SELECT SUM(CASE WHEN risk_level = 'HIGH' THEN 1 ELSE 0 END) AS high_risk_members, SUM(CASE WHEN total_sessions = 0 THEN 1 ELSE 0 END) AS zero_sessions, SUM(CASE WHEN avg_progress_pct < 30 THEN 1 ELSE 0 END) AS low_progress_members FROM team_risk;`
                    })
                });

                if (summaryResponse.ok) {
                    const data = await summaryResponse.json();
                    if (data.data && data.data.length > 0) setRiskSummary(data.data[0]);
                }

                // Fetch Detailed Risks
                const detailsResponse = await fetch('https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        type: "TIDB",
                        definition: `WITH team_members AS ( SELECT e.employee_id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, e.role_title FROM t_69a82b4442abf6674cbcb928_t e WHERE e.manager_id = '${activeManagerId}' AND LOWER(COALESCE(e.employment_status, 'active')) = 'active' ), goal_summary AS ( SELECT g.employee_id, ROUND(AVG(COALESCE(g.progress_pct, 0)), 0) AS avg_progress_pct FROM t_69a8310842abf6674cbcb943_t g JOIN team_members tm ON g.employee_id = tm.employee_id GROUP BY g.employee_id ), session_summary AS ( SELECT s.employee_id, COUNT(*) AS total_sessions, MAX(DATE(s.started_at)) AS last_activity_date, SUM( CASE WHEN YEAR(s.started_at) = YEAR(CURDATE()) AND MONTH(s.started_at) = MONTH(CURDATE()) THEN 1 ELSE 0 END ) AS sessions_this_month FROM t_69a82d5742abf6674cbcb935_t s JOIN team_members tm ON s.employee_id = tm.employee_id GROUP BY s.employee_id ), alerts AS ( SELECT tm.employee_id, 'No sessions for 2 weeks' AS alert_reason FROM team_members tm LEFT JOIN session_summary ss ON tm.employee_id = ss.employee_id WHERE ss.last_activity_date IS NULL OR ss.last_activity_date < CURDATE() - INTERVAL 14 DAY UNION ALL SELECT tm.employee_id, 'Goal progress stalled' AS alert_reason FROM team_members tm LEFT JOIN goal_summary gs ON tm.employee_id = gs.employee_id WHERE COALESCE(gs.avg_progress_pct, 0) < 30 UNION ALL SELECT tm.employee_id, CONCAT('Low engagement - only ', COALESCE(ss.sessions_this_month, 0), ' session(s) this month') AS alert_reason FROM team_members tm LEFT JOIN session_summary ss ON tm.employee_id = ss.employee_id WHERE COALESCE(ss.sessions_this_month, 0) <= 1 ) SELECT tm.employee_id, tm.employee_name, tm.role_title, COALESCE(gs.avg_progress_pct, 0) AS progress_pct, COALESCE(ss.total_sessions, 0) AS sessions, ss.last_activity_date, CASE WHEN COALESCE(ss.total_sessions, 0) = 0 AND COALESCE(gs.avg_progress_pct, 0) < 30 THEN 'HIGH RISK' WHEN ss.last_activity_date IS NULL THEN 'HIGH RISK' WHEN ss.last_activity_date < CURDATE() - INTERVAL 14 DAY AND COALESCE(gs.avg_progress_pct, 0) < 30 THEN 'HIGH RISK' WHEN COALESCE(ss.sessions_this_month, 0) <= 1 OR COALESCE(gs.avg_progress_pct, 0) < 30 THEN 'MEDIUM RISK' ELSE 'LOW RISK' END AS risk_badge, GROUP_CONCAT(a.alert_reason ORDER BY a.alert_reason SEPARATOR ' | ') AS alert_messages FROM team_members tm LEFT JOIN goal_summary gs ON tm.employee_id = gs.employee_id LEFT JOIN session_summary ss ON tm.employee_id = ss.employee_id LEFT JOIN alerts a ON tm.employee_id = a.employee_id GROUP BY tm.employee_id, tm.employee_name, tm.role_title, gs.avg_progress_pct, ss.total_sessions, ss.last_activity_date, ss.sessions_this_month HAVING risk_badge IN ('HIGH RISK', 'MEDIUM RISK') ORDER BY CASE risk_badge WHEN 'HIGH RISK' THEN 1 WHEN 'MEDIUM RISK' THEN 2 ELSE 3 END, progress_pct ASC, last_activity_date ASC;`
                    })
                });

                if (detailsResponse.ok) {
                    const data = await detailsResponse.json();
                    setAtRiskData(data.data || []);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, [activeManagerId]);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                        <i className="fas fa-exclamation-triangle text-primary-blue text-xl"></i>
                        Team Alerts & Risks
                    </h1>
                    <p className="text-gray-400 text-sm font-medium tracking-wide">Proactive monitoring for your team</p>
                </div>

                <div className="relative manager-selector">
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm flex items-center gap-3 hover:border-primary-blue/30 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-bold text-xs">
                            {selectedManagerName?.[0]}
                        </div>
                        <div className="text-left pr-4">
                            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">Active Manager</div>
                            <div className="text-xs font-bold text-gray-800 tracking-tight flex items-center gap-2">
                                {selectedManagerName}
                                <i className={`fas fa-chevron-down text-[8px] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
                            </div>
                        </div>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-3 bg-gray-50/50 border-b border-gray-50">
                                <div className="relative">
                                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]"></i>
                                    <input 
                                        type="text"
                                        placeholder="Search managers..."
                                        className="w-full bg-white border border-gray-100 rounded-xl py-2 pl-8 pr-4 text-xs focus:outline-none focus:border-primary-blue/30 transition-all font-medium"
                                        value={managerSearch}
                                        onChange={(e) => setManagerSearch(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                            <div className="max-h-64 overflow-y-auto custom-scrollbar p-1">
                                {allManagers
                                    .filter(m => `${m.first_name} ${m.last_name}`.toLowerCase().includes(managerSearch.toLowerCase()))
                                    .map((manager) => (
                                    <button
                                        key={manager.employee_id}
                                        onClick={() => {
                                            setActiveManagerId(manager.employee_id);
                                            setSelectedManagerName(`${manager.first_name} ${manager.last_name}`);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                                            activeManagerId === manager.employee_id 
                                            ? 'bg-primary-blue/5 text-primary-blue' 
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                            activeManagerId === manager.employee_id 
                                            ? 'bg-primary-blue text-white' 
                                            : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            {manager.first_name?.[0]}{manager.last_name?.[0]}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs font-bold leading-tight">{manager.first_name} {manager.last_name}</div>
                                            <div className="text-[9px] opacity-60 font-medium">ID: {manager.employee_id}</div>
                                        </div>
                                        {activeManagerId === manager.employee_id && (
                                            <i className="fas fa-check-circle ml-auto text-[10px]"></i>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Alert Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-danger">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center text-danger text-sm">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-900 leading-none mb-1">{riskSummary.high_risk_members}</div>
                            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">High Risk Members</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm">
                            <i className="fas fa-user-times"></i>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-900 leading-none mb-1">{riskSummary.zero_sessions}</div>
                            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Zero Sessions</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hidden lg:block">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary-light/30 rounded-lg flex items-center justify-center text-primary-blue text-sm">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-900 leading-none mb-1">{riskSummary.low_progress_members}</div>
                            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Low Progress (&lt;30%)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alert Cards */}
            <div className="flex flex-col gap-4">
                {atRiskData.map((member) => (
                    <div key={member.employee_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                    {(member.employee_name || 'E').split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">{member.employee_name}</h2>
                                    <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{member.role_title}</p>
                                </div>
                            </div>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                member.risk_badge === 'HIGH RISK' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
                            }`}>
                                {member.risk_badge}
                            </span>
                        </div>
                        <div className="p-4">
                            {/* Alerts */}
                            <div className="space-y-1.5 mb-4">
                                {member.alert_messages?.split(' | ').map((alert, i) => (
                                    <div key={i} className="bg-danger/5 border border-danger/10 text-danger p-2 rounded-lg flex items-center gap-2 text-[11px] font-bold">
                                        <i className="fas fa-exclamation-circle text-[12px]"></i>{alert}
                                    </div>
                                ))}
                            </div>

                            {/* Alert Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-4 bg-gray-50/50 rounded-xl p-3 border border-gray-100/50">
                                <div>
                                    <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Avg Progress</span>
                                    <div className="font-bold text-gray-800 text-sm tracking-tight">{member.progress_pct}%</div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Total Sessions</span>
                                    <div className="font-bold text-gray-800 text-sm tracking-tight">{member.sessions}</div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Last Activity</span>
                                    <div className="font-bold text-gray-800 text-sm tracking-tight">
                                        {member.last_activity_date ? new Date(member.last_activity_date).toLocaleDateString() : 'N/A'}
                                    </div>
                                </div>
                            </div>

                            {/* Recommended Actions */}
                            <div className="mb-5">
                                <h4 className="font-bold text-[11px] text-gray-400 uppercase tracking-widest mb-2.5">AI Recommendations:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {member.risk_badge === 'HIGH RISK' ? (
                                        <>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-calendar text-primary-blue text-[10px]"></i> Schedule 1:1
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-user-tie text-primary-blue text-[10px]"></i> HR Check-in
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-list text-primary-blue text-[10px]"></i> Review Goals
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-bell text-primary-blue text-[10px]"></i> Send Nudge
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-calendar text-primary-blue text-[10px]"></i> Regular 1:1
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-700 font-medium bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
                                                <i className="fas fa-book text-primary-blue text-[10px]"></i> Share Content
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex gap-2">
                                    <button className="bg-primary-blue text-white border-none px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                                        Take Action
                                    </button>
                                    <button className="bg-gray-50 text-gray-500 border border-gray-100 px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-all">
                                        Dismiss
                                    </button>
                                </div>
                                <button className="text-primary-blue bg-transparent border-none text-[10px] font-bold cursor-pointer hover:underline uppercase tracking-wider">
                                    View Timeline
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {atRiskData.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Team is on Track</h3>
                        <p className="text-sm text-gray-400 font-medium">No immediate alerts or risks detected by AI.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
