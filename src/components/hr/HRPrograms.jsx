import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MOCK_DATA } from '../../data/mockData'

export default function HRPrograms() {
    const navigate = useNavigate()
    const hr = MOCK_DATA.hr
    const [programs, setPrograms] = useState([])

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch('https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3NDcyNTA5ODgsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "type": "TIDB",
                        "definition": "SELECT p.program_id, p.program_name, p.status, p.start_date, p.end_date, DATEDIFF(DATE(p.end_date), DATE(p.start_date)) AS duration_days, p.target_bands, p.target_roles_keywords, p.target_business_units AS coverage, COUNT(DISTINCT CASE WHEN e.employment_status <> 'resigned' THEN cm.employee_id END) AS enrolled_count, ROUND( 100.0 * COUNT(DISTINCT CASE WHEN e.employment_status <> 'resigned' AND cm.status <> 'completed' THEN cm.employee_id END) / NULLIF( COUNT(DISTINCT CASE WHEN e.employment_status <> 'resigned' THEN cm.employee_id END), 0 ), 0 ) AS active_pct, ROUND( 100.0 * COUNT(DISTINCT CASE WHEN e.employment_status <> 'resigned' AND cm.status = 'completed' THEN cm.employee_id END) / NULLIF( COUNT(DISTINCT CASE WHEN e.employment_status <> 'resigned' THEN cm.employee_id END), 0 ), 0 ) AS completion_pct, ROUND( COUNT(DISTINCT s.session_id) * 1.0 / NULLIF( COUNT(DISTINCT CASE WHEN e.employment_status <> 'resigned' THEN cm.employee_id END), 0 ), 1 ) AS avg_sessions, 48 AS cost_per_employee, GROUP_CONCAT(DISTINCT UPPER(g.category) ORDER BY g.category SEPARATOR ', ') AS logic_nodes FROM t_69a833d242abf6674cbcb945_t p LEFT JOIN t_69a8197942abf6674cbcb8ef_t cm ON p.program_id = cm.program_id LEFT JOIN t_69a82b4442abf6674cbcb928_t e ON e.employee_id = cm.employee_id LEFT JOIN t_69a82d5742abf6674cbcb935_t s ON s.employee_id = cm.employee_id LEFT JOIN t_69a8310842abf6674cbcb943_t g ON g.employee_id = cm.employee_id AND g.program_id = p.program_id WHERE e.employment_status <> 'resigned' GROUP BY p.program_id, p.program_name, p.status, p.start_date, p.end_date, p.target_bands, p.target_roles_keywords, p.target_business_units ORDER BY p.start_date DESC, p.program_name ASC;"
                    })
                })
                const result = await response.json()
                if (result.status === 'success') {
                    setPrograms(result.data)
                }
            } catch (error) {
                console.error("Error fetching programs:", error)
            }
        }
        fetchPrograms()
    }, [])

    const displayPrograms = programs.length > 0 ? programs : hr.programs

    return (
        <div>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                        <i className="fas fa-list text-primary-blue text-xl"></i>
                        Active Programs
                    </h1>
                    <p className="text-gray-400 text-sm font-medium tracking-wide">Manage and monitor all coaching programs</p>
                </div>
                <button
                    onClick={() => navigate('/hr/studio')}
                    className="bg-primary-blue text-white border-none px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2 hover:bg-primary-dark transition-all shadow-sm shadow-primary-blue/20"
                >
                    <i className="fas fa-plus text-[9px]"></i> Create New
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {displayPrograms.map((program, idx) => {
                    const name = program.program_name || program.name
                    const status = program.status
                    const eligibility = program.target_bands ? `BAND ${program.target_bands}, ${program.target_roles_keywords}` : program.eligibility
                    const startDate = program.start_date || program.startDate
                    const duration = program.duration_days || program.duration
                    const enrolled = program.enrolled_count !== undefined ? program.enrolled_count : program.enrolled
                    const coverage = program.coverage || (program.targetBUs && program.targetBUs[0])
                    const activePct = program.active_pct !== undefined ? program.active_pct : program.metrics.activeRate
                    const completionPct = program.completion_pct !== undefined ? program.completion_pct : program.metrics.completionRate
                    const avgSessions = program.avg_sessions !== undefined ? program.avg_sessions : program.metrics.avgSessions
                    const costPerEmployee = program.cost_per_employee !== undefined ? program.cost_per_employee : program.metrics.costPerEmployee
                    const logicNodes = program.logic_nodes ? program.logic_nodes.split(', ') : (program.goals || [])

                    return (
                        <div key={program.program_id || program.id || idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:border-primary-blue/20 transition-all">
                            <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 tracking-tight flex items-center gap-3">
                                        {name}
                                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest ${status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'}`}>
                                            {status}
                                        </span>
                                    </h2>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{eligibility}</p>
                                </div>
                                <button className="text-gray-300 hover:text-primary-blue transition-colors bg-transparent border-none cursor-pointer">
                                    <i className="fas fa-ellipsis-v text-xs"></i>
                                </button>
                            </div>
                            <div className="p-5">
                                {/* Stats Row */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {[
                                        { label: 'Start Date', value: new Date(startDate).toLocaleDateString(), icon: 'calendar' },
                                        { label: 'Duration', value: `${duration}d`, icon: 'clock' },
                                        { label: 'Size', value: `${enrolled} Enrolled`, icon: 'users' },
                                        { label: 'Coverage', value: coverage, icon: 'building' },
                                    ].map((stat, i) => (
                                        <div key={i} className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-primary-blue/50 text-xs border border-gray-100/50">
                                                <i className={`fas fa-${stat.icon}`}></i>
                                            </div>
                                            <div>
                                                <div className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter leading-none mb-1">{stat.label}</div>
                                                <div className="text-[11px] font-bold text-gray-700 tracking-tight leading-none">{stat.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-4 gap-2 mb-6">
                                    {[
                                        { value: `${activePct}%`, label: 'Active', color: 'primary-blue' },
                                        { value: `${completionPct}%`, label: 'Completed', color: 'success' },
                                        { value: avgSessions, label: 'Avg Sessions', color: 'warning' },
                                        { value: `$${costPerEmployee}`, label: 'Cost/Employee', color: 'success' },
                                    ].map((m, i) => (
                                        <div key={i} className={`text-center p-2 rounded-xl bg-${m.color}/5 border border-${m.color}/10`}>
                                            <div className={`text-[13px] font-bold text-${m.color} tracking-tight`}>{m.value}</div>
                                            <div className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter opacity-70">{m.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Goals */}
                                {logicNodes.length > 0 && (
                                    <div className="mb-6">
                                        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-bullseye text-[10px]"></i> Logic Nodes
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {logicNodes.map((goal, i) => (
                                                <span key={i} className="bg-gray-50 border border-gray-100 text-gray-600 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-tight">
                                                    {goal}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex gap-4">
                                        <button className="text-[10px] font-bold text-primary-blue uppercase tracking-widest hover:underline bg-transparent border-none cursor-pointer">Performance Matrix</button>
                                        <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer">Configuration</button>
                                    </div>
                                    <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary-blue bg-transparent border-none cursor-pointer">
                                        <i className="fas fa-file-download mr-1.5"></i> Export
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
