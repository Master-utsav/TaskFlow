import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = ({ onSidebarToggle, isSidebarCollapsed }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = '/search-and-filter-interface';
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleProfileMenuClose = () => {
    setIsProfileMenuOpen(false);
  };

  const navigateToSettings = () => {
    window.location.href = '/settings-and-preferences';
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    handleProfileMenuClose();
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-[1000]">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section - Logo and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" size={20} />
          </button>
          
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
            <span className="text-lg font-semibold text-text-primary hidden sm:block">
              TaskFlow
            </span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`relative transition-all duration-150 ${
              isSearchFocused ? 'ring-2 ring-primary/50' : ''
            }`}>
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search tasks, groups..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all duration-150"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Section - User Profile */}
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150 hidden sm:flex">
            <Icon name="Bell" size={20} />
          </button>
          
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-surface-light/50 transition-all duration-150"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-text-secondary transition-transform duration-150 hidden sm:block ${
                  isProfileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-[950]"
                  onClick={handleProfileMenuClose}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-[990] animate-fade-in">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">John Doe</p>
                    <p className="text-xs text-text-secondary">john.doe@example.com</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={navigateToSettings}
                      className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150"
                    >
                      <Icon name="Settings" size={16} className="mr-3" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;