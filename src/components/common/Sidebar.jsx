import { NavLink } from 'react-router-dom'

export default function Sidebar({ items, basePath }) {
    return (
        <div className="w-[200px] bg-white border-r border-gray-100 py-4 shadow-sm">
            <nav className="flex flex-col gap-1">
                {items.map((item) => (
                    <NavLink
                        key={item.id}
                        to={`${basePath}/${item.id}`}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-2.5 px-6 no-underline transition-all duration-200 border-l-2 text-[13px] ${isActive
                                ? 'bg-primary-blue/5 text-primary-blue border-l-primary-blue font-bold'
                                : 'text-gray-500 border-l-transparent hover:bg-gray-50 hover:text-primary-blue font-medium'
                            }`
                        }
                    >
                        <i className={`fas fa-${item.icon} w-5 text-sm`}></i>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    )
}
