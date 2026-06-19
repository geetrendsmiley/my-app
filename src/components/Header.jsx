import { useState } from 'react'
import { Menu, Bell, User, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export default function Header({ toggleSidebar, title = 'Dashboard' }) {
  const { user, logout } = useAuth()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b h-16 fixed w-full top-0 z-40">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left: Menu Toggle + Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="hidden md:block text-sm font-medium">
                {user?.email || 'Guest'}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                <a href="/user/profile" className="block px-4 py-2 hover:bg-gray-50 text-sm">
                  Profile
                </a>
                <a href="/user/settings" className="block px-4 py-2 hover:bg-gray-50 text-sm">
                  Settings
                </a>
                <hr className="my-2" />
                <button 
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600 flex items-center gap-2"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}