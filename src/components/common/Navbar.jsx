import { useNavigate } from 'react-router-dom'

export default function Navbar({ title, userName, userRole, userIcon }) {
    const navigate = useNavigate()
    return (
        <div className="bg-white h-[60px] flex items-center justify-between px-6 border-b border-gray-100/80 shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-3 text-lg font-bold text-primary-dark">
                <i className="fas fa-shield-alt text-xl text-primary-blue"></i>
                <span>BAGIC AI Coach</span>
            </div>
            <div>
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{title}</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pr-4 border-r border-gray-100">
                    <div className="w-8 h-8 bg-gray-50 text-primary-blue border border-primary-blue/10 rounded-full flex items-center justify-center text-sm">
                        <i className={`fas fa-${userIcon}`}></i>
                    </div>
                    <div className="text-left hidden md:block">
                        <div className="font-bold text-xs text-gray-800 leading-none">{userName}</div>
                        <div className="text-[10px] text-gray-400 font-medium mt-0.5">{userRole}</div>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-400 hover:text-primary-blue transition-colors p-2 rounded-lg hover:bg-gray-50"
                    title="Go Home"
                >
                    <i className="fas fa-home text-lg"></i>
                </button>
            </div>
        </div>
    )
}
