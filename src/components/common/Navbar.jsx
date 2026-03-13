import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ title, userName, userRole, userIcon }) {
    const navigate = useNavigate()
    const [showDashboardMenu, setShowDashboardMenu] = useState(false)
    const role = localStorage.getItem('user_role')
    const loggedInName = localStorage.getItem('user_name')

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className="bg-white h-[60px] flex items-center justify-between px-6 border-b border-gray-100/80 shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-3 text-lg font-bold text-primary-dark">
                <i className="fas fa-shield-alt text-xl text-primary-blue"></i>
                <span className="cursor-pointer" onClick={() => navigate('/login')}>BAGIC AI Coach</span>
            </div>

            <div className="flex items-center gap-4">
                {role === 'admin' && (
                    <div className="relative">
                        <button 
                            onClick={() => setShowDashboardMenu(!showDashboardMenu)}
                            className="bg-primary-blue/5 text-primary-blue px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-primary-blue/10 hover:bg-primary-blue/10 transition-all shadow-sm"
                        >
                            <i className="fas fa-th-large"></i>
                            Switch Dashboard 
                            <i className={`fas fa-chevron-${showDashboardMenu ? 'up' : 'down'} text-[10px]`}></i>
                        </button>
                        
                        {showDashboardMenu && (
                            <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">
                                {[
                                    { path: '/landing', label: 'Persona Selector (Home)', icon: 'th-large' },
                                    { path: '/employee', label: 'Employee Dashboard', icon: 'user' },
                                    { path: '/manager', label: 'Manager Dashboard', icon: 'users' },
                                    { path: '/hr', label: 'HR Dashboard', icon: 'building' },
                                    { path: '/compliance', label: 'Compliance Dashboard', icon: 'shield-alt' }
                                ].map((item) => (
                                    <button
                                        key={item.path}
                                        onClick={() => {
                                            navigate(item.path)
                                            setShowDashboardMenu(false)
                                        }}
                                        className="w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-primary-blue/5 hover:text-primary-blue flex items-center gap-3 transition-all border-b border-gray-50 last:border-0"
                                    >
                                        <i className={`fas fa-${item.icon} w-5 text-center`}></i>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{title}</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pr-4 border-r border-gray-100">
                    <div className="w-8 h-8 bg-gray-50 text-primary-blue border border-primary-blue/10 rounded-full flex items-center justify-center text-sm shadow-inner">
                        <i className={`fas fa-${role === 'admin' ? 'user-shield' : userIcon}`}></i>
                    </div>
                    <div className="text-left hidden md:block">
                        <div className="font-bold text-xs text-gray-800 leading-none">
                            {role === 'admin' ? 'System Administrator' : (loggedInName || userName)}
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">
                            {role === 'admin' ? 'Full Admin Access' : userRole}
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-500 transition-all p-2 rounded-lg hover:bg-red-50"
                    title="Sign Out"
                >
                    <i className="fas fa-sign-out-alt text-lg"></i>
                </button>
            </div>
        </div>
    )
}
