import React, { useState } from 'react';
import { Menu, Bell, Sun, Moon, User, LogOut, Search } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would toggle dark mode in your app
    document.documentElement.classList.toggle('dark');
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    console.log('Logging out...');
  };

  // Sample notifications
  const notifications = [
    { id: 1, message: 'New ticket created', time: '5 minutes ago' },
    { id: 2, message: 'Ticket #1234 updated', time: '1 hour ago' },
    { id: 3, message: 'New user registered', time: '3 hours ago' },
  ];

  return (
    <header className="bg-[rgb(var(--color-background))] border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-[rgb(var(--color-foreground))] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Menu size={22} />
          </button>
          
          <div className="relative hidden md:flex items-center">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] transition-all duration-200 w-64"
            />
            <Search size={18} className="absolute left-3 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-[rgb(var(--color-foreground))] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full text-[rgb(var(--color-foreground))] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 relative"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-[rgb(var(--color-danger))] rounded-full ring-2 ring-[rgb(var(--color-background))]"></span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[rgb(var(--color-background))] rounded-lg shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700 transition-all duration-200">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-[rgb(var(--color-foreground))]">Notifications</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-b-0 transition-colors duration-150">
                      <p className="text-sm text-[rgb(var(--color-foreground))]">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                  <a href="#" className="text-xs text-[rgb(var(--color-primary))] hover:underline transition-colors duration-150">View all notifications</a>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-primary))] transition-all duration-200"
            >
              <div className="h-9 w-9 rounded-full bg-[rgb(var(--color-primary))] flex items-center justify-center text-white shadow-sm hover:shadow transition-all duration-200">
                <User size={18} />
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[rgb(var(--color-background))] rounded-lg shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700 transition-all duration-200">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-[rgb(var(--color-foreground))]">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">admin@example.com</p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-[rgb(var(--color-foreground))] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  Profile Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-[rgb(var(--color-foreground))] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <div className="flex items-center">
                    <LogOut size={16} className="mr-2 text-[rgb(var(--color-danger))]" />
                    Sign out
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;