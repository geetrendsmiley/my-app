import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, Users, FolderOpen, Shield, 
  CreditCard, Settings, X 
} from 'lucide-react'

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['user', 'admin'] },
  { path: '/client/projects', icon: FolderOpen, label: 'Projects', roles: ['user', 'client', 'admin'] },
  { path: '/client/invoices', icon: CreditCard, label: 'Invoices', roles: ['user', 'client', 'admin'] },
  { path: '/admin/users', icon: Users, label: 'Users', roles: ['admin'] },
  { path: '/admin/reports', icon: Shield, label: 'Reports', roles: ['admin'] },
  { path: '/user/settings', icon: Settings, label: 'Settings', roles: ['user', 'client', 'admin'] },
]

export default function Sidebar({ isOpen, closeSidebar, userRole = 'user' }) {
  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole))

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-900 text-white w-64 
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 flex justify-between items-center lg:hidden">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={closeSidebar}><X size={20} /></button>
        </div>

        <nav className="mt-4 px-2 space-y-1">
          {filteredMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && closeSidebar()}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                transition-colors
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Role Badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <span className="text-xs text-gray-400">Logged in as</span>
            <p className="text-sm font-semibold capitalize">{userRole}</p>
          </div>
        </div>
      </aside>
    </>
  )
}