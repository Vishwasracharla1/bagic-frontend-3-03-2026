import { useState, useEffect } from 'react'
import { MOCK_DATA } from '../../data/mockData'

export default function ManagerPrep() {
    const manager = MOCK_DATA.manager
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState(localStorage.getItem('active_manager_id') || '');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(localStorage.getItem('active_employee_id') || '');
    const [coachPrepData, setCoachPrepData] = useState(null);
    const [isLoadingPrep, setIsLoadingPrep] = useState(false);
    const [prepError, setPrepError] = useState(null);

    // 1. Fetch all unique managers on mount
    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await fetch('https://igs.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/69a82b4442abf6674cbcb928/instances/list?size=1000', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "dbType": "TIDB",
                        "distinctColumns": ["manager_id"]
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    let managerData = Array.isArray(result) ? result : (result.data || []);
                    
                    const role = localStorage.getItem('user_role');
                    const currentUserId = localStorage.getItem('user_id');
                    if (role === 'manager' && currentUserId) {
                        managerData = managerData.filter(m => String(m.manager_id) === String(currentUserId));
                    }
                    
                    setManagers(managerData);
                }
            } catch (error) {
                console.error("Error fetching managers:", error);
            }
        };
        fetchManagers();
    }, []);

    // 2. Fetch employees when selectedManager changes
    useEffect(() => {
        if (!selectedManager) {
            setEmployees([]);
            return;
        }

        const fetchEmployeesForManager = async () => {
            try {
                const response = await fetch('https://igs.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/69a82b4442abf6674cbcb928/instances/list?size=1000', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "dbType": "TIDB",
                        "filter": {
                            "manager_id": selectedManager
                        },
                        "distinctColumns": ["employee_id"]
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    const employeeData = Array.isArray(result) ? result : (result.data || []);
                    setEmployees(employeeData);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployeesForManager();
    }, [selectedManager]);

    const handleTriggerPrep = async () => {
        if (!selectedManager || !selectedEmployee) return;
        
        setIsLoadingPrep(true);
        setPrepError(null);
        setCoachPrepData(null);
        
        try {
            const response = await fetch(`https://ig.gov-cloud.ai/ai-coach-agents/coach/manager-prep?managerId=${selectedManager}&employeeId=${selectedEmployee}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: ''
            });

            if (response.ok) {
                const data = await response.json();
                setCoachPrepData(data);
            } else {
                setPrepError(`API Error: ${response.status}`);
            }
        } catch (error) {
            setPrepError("Failed to connect to AI Coach service");
            console.error("Error fetching coach prep:", error);
        } finally {
            setIsLoadingPrep(false);
        }
    };

    const handleManagerChange = (e) => {
        const id = e.target.value;
        setSelectedManager(id);
        localStorage.setItem('active_manager_id', id);
        setSelectedEmployee('');
        localStorage.removeItem('active_employee_id');
        setCoachPrepData(null); // Clear data when manager changes
    };

    const handleEmployeeChange = (e) => {
        const id = e.target.value;
        setSelectedEmployee(id);
        localStorage.setItem('active_employee_id', id);
        setCoachPrepData(null); // Clear data when employee changes
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl mb-1 flex items-center gap-3 text-gray-800 font-bold tracking-tight">
                        <i className="fas fa-clipboard-list text-primary-blue text-xl"></i>
                        Session Preparation
                    </h1>
                    <p className="text-gray-400 text-sm font-medium tracking-wide">AI-powered coaching support for your 1:1s</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Select Manager:</label>
                        <select 
                            value={selectedManager}
                            onChange={handleManagerChange}
                            className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 min-w-[120px]"
                        >
                            <option value="">Choose Manager</option>
                            {managers.map((m) => (
                                <option key={m.manager_id} value={m.manager_id}>{m.manager_id}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Select Employee:</label>
                        <select 
                            value={selectedEmployee}
                            onChange={handleEmployeeChange}
                            disabled={!selectedManager}
                            className={`bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 min-w-[120px] ${!selectedManager ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <option value="">Choose Employee</option>
                            {employees.map((emp) => (
                                 <option key={emp.employee_id} value={emp.employee_id}>{emp.employee_id}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleTriggerPrep}
                        disabled={!selectedManager || !selectedEmployee || isLoadingPrep}
                        className={`
                            px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm
                            ${!selectedManager || !selectedEmployee || isLoadingPrep
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary-blue text-white hover:bg-primary-dark hover:shadow-md active:scale-95'}
                        `}
                    >
                        {isLoadingPrep ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-magic"></i>}
                        {isLoadingPrep ? 'Processing...' : 'Generate Prep'}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {isLoadingPrep && (
                    <div className="bg-white rounded-xl p-12 flex flex-col items-center justify-center border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 border-4 border-primary-blue/20 border-t-primary-blue rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 text-sm font-bold animate-pulse">Analyzing employee data & generating coaching prep...</p>
                    </div>
                )}

                {prepError && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex items-center gap-4 shadow-sm">
                        <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-red-900">AI Prep Unavailable</h3>
                            <p className="text-xs text-red-600 font-medium">{prepError}</p>
                        </div>
                    </div>
                )}

                {coachPrepData ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-primary-blue/5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-primary-blue text-white rounded-lg flex items-center justify-center text-sm shadow-sm ring-4 ring-primary-blue/10">
                                    <i className="fas fa-robot"></i>
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">AI Coaching Prep: {selectedEmployee}</h2>
                                 
                                </div>
                            </div>
                            <span className="bg-success text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm">Live Response</span>
                        </div>
                        <div className="p-4">
                            {coachPrepData.summary && (
                                <div className="mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Session Objective</h3>
                                    <p className="text-xs text-gray-700 font-medium capitalize">{coachPrepData.summary}</p>
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column: Framework & Topics */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-lightbulb text-warning text-[10px]"></i> AI Framework
                                        </h3>
                                        <div className="bg-primary-blue/5 rounded-lg p-3 border border-primary-blue/10">
                                            <div className="text-xs font-bold text-primary-blue mb-0.5">{coachPrepData.framework || 'AI Recommended Strategy'}</div>
                                            <div className="text-[10px] text-primary-blue/70 font-medium leading-relaxed">
                                                {coachPrepData.frameworkTip || 'Use the suggested questions to guide the development conversation.'}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-list text-primary-blue text-[10px]"></i> Context Review
                                        </h3>
                                        <div className="grid grid-cols-1 gap-1.5">
                                            {(coachPrepData.contentIdReview || []).map((content, i) => (
                                                <div key={i} className="flex items-start gap-2 text-[11px] text-gray-600 font-medium py-1.5 px-2 bg-gray-50 rounded border border-gray-100">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-blue/40 mt-1.5 flex-shrink-0"></div> 
                                                    <span>{content}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Questions */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-question text-primary-blue text-[10px]"></i> Recommended Questions
                                        </h3>
                                        <div className="space-y-3">
                                            {(coachPrepData.questions || []).map((qObj, i) => (
                                                <div key={i} className="flex flex-col p-2 bg-gray-50/50 rounded-lg border border-gray-100/50 group hover:border-primary-blue/20 transition-all">
                                                    <div className="flex items-start gap-2.5">
                                                        <span className="w-5 h-5 bg-primary-blue/10 text-primary-blue rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                                            {i + 1}
                                                        </span>
                                                        <p className="text-[11px] text-gray-800 font-bold leading-relaxed">{qObj.question}</p>
                                                    </div>
                                                    {qObj.frameworkTip && (
                                                        <div className="mt-1.5 pl-7.5 ml-7 text-[10px] text-gray-500 italic border-l-2 border-gray-100">
                                                            Tip: {qObj.frameworkTip}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button className="bg-primary-blue text-white border-none px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                                        Start Session
                                    </button>
                                    <button className="bg-gray-50 text-gray-500 border border-gray-100 px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-all">
                                        Download Prep
                                    </button>
                                </div>
                                <button className="text-primary-blue bg-transparent border-none text-[10px] font-bold cursor-pointer hover:underline uppercase tracking-wider">
                                    View Progress Record
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    !isLoadingPrep && manager.sessionPrep.upcomingMeetings.map((meeting) => (
                        <div key={meeting.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-primary-blue/10 text-primary-blue rounded-lg flex items-center justify-center text-sm">
                                    <i className="fas fa-calendar"></i>
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">1:1 with {meeting.employee}</h2>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                        {new Date(meeting.date + ' ' + meeting.time).toLocaleDateString()} • {meeting.time} ({meeting.duration} min)
                                    </p>
                                </div>
                            </div>
                            <span className="bg-info/10 text-info text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Upcoming</span>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column: Framework & Topics */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-lightbulb text-warning text-[10px]"></i> AI Framework
                                        </h3>
                                        <div className="bg-primary-blue/5 rounded-lg p-3 border border-primary-blue/10">
                                            <div className="text-xs font-bold text-primary-blue mb-0.5">{meeting.aiSuggestions.framework}</div>
                                            <div className="text-[10px] text-primary-blue/70 font-medium">{meeting.aiSuggestions.stage} Stage</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-list text-primary-blue text-[10px]"></i> Discussion Topics
                                        </h3>
                                        <div className="grid grid-cols-1 gap-1.5">
                                            {meeting.aiSuggestions.topics.map((topic, i) => (
                                                <div key={i} className="flex items-center gap-2 text-[11px] text-gray-600 font-medium py-1 px-2 bg-gray-50 rounded border border-gray-100">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-success/60"></div> {topic}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Questions & Alerts */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-question text-primary-blue text-[10px]"></i> Recommended Questions
                                        </h3>
                                        <div className="space-y-2">
                                            {meeting.aiSuggestions.questions.map((question, i) => (
                                                <div key={i} className="flex items-start gap-2.5 p-2 bg-gray-50/50 rounded-lg border border-gray-100/50 group hover:border-primary-blue/20 transition-all">
                                                    <span className="w-5 h-5 bg-primary-blue/10 text-primary-blue rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{question}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {meeting.aiSuggestions.alerts && (
                                        <div>
                                            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <i className="fas fa-exclamation-triangle text-warning text-[10px]"></i> AI Observations
                                            </h3>
                                            {meeting.aiSuggestions.alerts.map((alert, i) => (
                                                <div key={i} className="bg-warning/5 border-l-2 border-l-warning text-warning p-2 rounded-r-md text-[10px] font-bold mb-1.5 flex items-start gap-2">
                                                    <i className="fas fa-info-circle text-[11px] mt-0.5"></i>
                                                    <span>{alert}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button className="bg-primary-blue text-white border-none px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-primary-dark transition-all shadow-sm">
                                        Start Session
                                    </button>
                                    <button className="bg-gray-50 text-gray-500 border border-gray-100 px-4 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-all">
                                        Download Prep
                                    </button>
                                </div>
                                <button className="text-primary-blue bg-transparent border-none text-[10px] font-bold cursor-pointer hover:underline uppercase tracking-wider">
                                    View Progress Record
                                </button>
                            </div>
                        </div>
                    </div>
                    ))
                )}
            </div>
        </div>
    )
}
