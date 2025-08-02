import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, TicketCheck, BarChart2, Settings } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/users', icon: <Users size={20} />, label: 'User Management' },
    { path: '/tickets', icon: <TicketCheck size={20} />, label: 'Ticket Management' },
    { path: '/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside className={`bg-[rgb(31,41,55)] text-white w-64 min-h-screen p-5 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-30 shadow-lg`}>
      <div className="flex items-center justify-center mb-10 pt-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">QuickDesk Admin</h1>
      </div>
      <nav>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))]'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:translate-x-1'}`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;