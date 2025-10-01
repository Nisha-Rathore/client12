import React, { useState } from 'react'
import { Menu,LogOut, Box, ShoppingCart, Users, BarChart } from "lucide-react";


const Sidebar = () => {
     const [sidebarOpen, setSidebarOpen] = useState(true);
    
  return (
    <div>
        <aside className={`transition-all duration-300 bg-white border-r ${sidebarOpen ? 'w-64' : 'w-16'} shadow-sm h-screen sticky top-0`}> 
          <div className="h-16 flex items-center px-4 justify-between border-b">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(s => !s)} className="p-2 rounded-md hover:bg-slate-100">
                <Menu size={18} />
              </button>
              {sidebarOpen && <span className="font-bold text-lg">StoreAdmin</span>}
            </div>
            {sidebarOpen ? (
              <div className="text-xs text-slate-500">v1.0</div>
            ) : null}
          </div>

          <nav className="p-3 mt-4">
            {[
              { name: 'Dashboard', icon: BarChart },
              { name: 'Products', icon: Box },
              { name: 'Orders', icon: ShoppingCart },
              { name: 'Customers', icon: Users },
            ].map((item) => (
              <a key={item.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-sm" href="#">
                <item.icon size={18} />
                {sidebarOpen && <span>{item.name}</span>}
              </a>
            ))}
          </nav>

          <div className="mt-auto p-3">
            <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100">
              <LogOut size={16} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

    </div>
  )
}

export default Sidebar