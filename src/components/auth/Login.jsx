import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [persona, setPersona] = useState('employee') // 'employee', 'admin', or 'manager'
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (persona === 'admin') {
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('user_role', 'admin')
                localStorage.setItem('user_id', 'admin')
                navigate('/landing') // Admin goes to persona selector
            } else {
                setError('Invalid admin credentials')
                setLoading(false)
            }
            return
        }

        // Persona is employee or manager
        try {
            const apiUrl = import.meta.env.VITE_ENTITIES_API_URL
            const token = import.meta.env.VITE_ENTITIES_AUTH_TOKEN

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    dbType: "TIDB"
                })
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch personnel list`)
            }

            const responseData = await response.json()
            let list = []
            if (Array.isArray(responseData)) {
                list = responseData
            } else if (responseData.data && Array.isArray(responseData.data)) {
                list = responseData.data
            } else if (responseData.list && Array.isArray(responseData.list)) {
                list = responseData.list
            }

            if (persona === 'manager') {
                // Check if the entered username exists as a manager_id in any employee record
                const isValidManager = list.some(emp => String(emp.manager_id) === String(username))
                
                if (isValidManager) {
                    localStorage.setItem('user_role', 'manager')
                    localStorage.setItem('user_id', username)
                    localStorage.setItem('active_manager_id', username)
                    
                    // Try to find the manager's own record to get their name
                    const managerRecord = list.find(emp => String(emp.employee_id) === String(username))
                    const fullName = managerRecord ? `${managerRecord.first_name || ''} ${managerRecord.last_name || ''}`.trim() : username
                    localStorage.setItem('user_name', fullName || 'Manager')
                    
                    navigate('/manager/team')
                } else {
                    setError('Invalid Manager ID')
                }
            } else {
                // Persona is employee
                const activeEmployee = list.find(emp => String(emp.employee_id) === String(username))

                if (activeEmployee) {
                    localStorage.setItem('user_role', 'employee')
                    localStorage.setItem('user_id', username)
                    const fullName = `${activeEmployee.first_name || ''} ${activeEmployee.last_name || ''}`.trim()
                    localStorage.setItem('user_name', fullName || 'Employee')
                    navigate('/employee/overview')
                } else {
                    setError('not exist please sign up')
                }
            }
        } catch (err) {
            console.error('Login error:', err)
            setError('An error occurred during login. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all hover:shadow-2xl">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-shield-alt text-primary-blue text-2xl"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Welcome Back</h1>
                        <p className="text-gray-400 text-sm mt-1">Please enter your details to sign in</p>
                    </div>

                    <div className="flex bg-gray-50 p-1 rounded-xl mb-6">
                        <button
                            type="button"
                            onClick={() => setPersona('employee')}
                            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${persona === 'employee' ? 'bg-white text-primary-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Employee
                        </button>
                        <button
                            type="button"
                            onClick={() => setPersona('manager')}
                            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${persona === 'manager' ? 'bg-white text-primary-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Manager
                        </button>
                        <button
                            type="button"
                            onClick={() => setPersona('admin')}
                            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${persona === 'admin' ? 'bg-white text-primary-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                                {persona === 'employee' ? 'Employee ID' : persona === 'manager' ? 'Manager ID' : 'Username'}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">
                                    <i className={`fas fa-${persona === 'employee' ? 'id-badge' : persona === 'manager' ? 'user-tie' : 'user'}`}></i>
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder={persona === 'employee' ? 'Enter your employee ID' : persona === 'manager' ? 'Enter your manager ID' : 'Enter admin username'}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {persona === 'admin' && (
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter admin password"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-500 text-[11px] px-4 py-3 rounded-xl flex items-center gap-2">
                                <i className="fas fa-exclamation-circle text-xs"></i>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary-blue text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:bg-primary-blue/90 active:scale-[0.98] shadow-lg shadow-primary-blue/20 mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="fas fa-circle-notch animate-spin"></i>
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                        <p className="text-gray-400 text-[11px] font-medium tracking-wide">
                            {persona === 'employee' 
                                ? "Can't find your ID? Contact your manager"
                                : persona === 'manager'
                                ? "Manager portal - Access restricted"
                                : "Protected administrative access only"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
