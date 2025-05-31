import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed, onToggle, isMobileOpen, onMobileClose }) => {
  const [activeRoute, setActiveRoute] = useState('/dashboard-overview');

  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-overview',
      icon: 'LayoutDashboard',
      badge: null
    },
    {
      label: 'Groups',
      path: '/task-groups-management',
      icon: 'FolderOpen',
      badge: '3'
    },
    {
      label: 'Search',
      path: '/search-and-filter-interface',
      icon: 'Search',
      badge: null
    },
    {
      label: 'Settings',
      path: '/settings-and-preferences',
      icon: 'Settings',
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    setActiveRoute(path);
    window.location.href = path;
    if (isMobileOpen) {
      onMobileClose();
    }
  };

  const handleToggle = () => {
    onToggle();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[900] lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-surface border-r border-border z-[900] transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2">
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-text-primary" >
                  TaskFlow
                </span>
              </div>
            )}
            
            <button
              onClick={handleToggle}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150 hidden lg:flex"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            </button>
          </div>

            {navigationItems.map((item) => {
              const isActive = activeRoute === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ease-in-out group
                    ${isActive 
                      ? 'bg-primary/10 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-light/50'
                    }
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    className={`
                      ${isCollapsed ? '' : 'mr-3'}
                      ${isActive ? 'text-primary' : 'text-current'}
                    `}
                  />
                  
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  
                  {isCollapsed && item.badge && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-border">
            {!isCollapsed ? (
              <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
                  <p className="text-xs text-text-secondary truncate">john.doe@example.com</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;