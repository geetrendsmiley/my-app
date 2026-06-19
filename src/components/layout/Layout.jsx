import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function Layout({ children, title, userRole }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title={title} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        closeSidebar={() => setSidebarOpen(false)}
        userRole={userRole}
      />
      
      <main className="lg:ml-64 mt-16 flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  )
}