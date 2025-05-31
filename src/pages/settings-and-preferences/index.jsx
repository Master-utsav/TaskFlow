import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';
import GeneralSettings from './components/GeneralSettings';
import ProductivitySettings from './components/ProductivitySettings';
import DataManagement from './components/DataManagement';
import AdvancedSettings from './components/AdvancedSettings';

const SettingsAndPreferences = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: 'Settings',
      description: 'Theme, language, and basic preferences'
    },
    {
      id: 'productivity',
      label: 'Productivity',
      icon: 'Zap',
      description: 'Task defaults and workflow settings'
    },
    {
      id: 'data',
      label: 'Data Management',
      icon: 'Database',
      description: 'Export, import, and backup options'
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: 'Cog',
      description: 'Accessibility and performance settings'
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      const confirmChange = window.confirm('You have unsaved changes. Are you sure you want to switch tabs?');
      if (!confirmChange) return;
    }
    setActiveTab(tabId);
    setHasUnsavedChanges(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResetToDefaults = () => {
    const confirmReset = window.confirm('Are you sure you want to reset all settings to their default values? This action cannot be undone.');
    if (confirmReset) {
      console.log('Resetting all settings to defaults');
      setHasUnsavedChanges(false);
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving all changes');
    setHasUnsavedChanges(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings onSettingsChange={() => setHasUnsavedChanges(true)} />;
      case 'productivity':
        return <ProductivitySettings onSettingsChange={() => setHasUnsavedChanges(true)} />;
      case 'data':
        return <DataManagement onSettingsChange={() => setHasUnsavedChanges(true)} />;
      case 'advanced':
        return <AdvancedSettings onSettingsChange={() => setHasUnsavedChanges(true)} />;
      default:
        return <GeneralSettings onSettingsChange={() => setHasUnsavedChanges(true)} />;
    }
  };

  const filteredTabs = tabs.filter(tab =>
    tab.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tab.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSidebarToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      <main className={`
        transition-all duration-300 ease-in-out pt-16
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Settings & Preferences</h1>
                <p className="text-text-secondary">
                  Customize your TaskFlow experience and manage your account preferences
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {hasUnsavedChanges && (
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150 micro-interaction flex items-center gap-2"
                  >
                    <Icon name="Save" size={16} />
                    Save Changes
                  </button>
                )}
                <button
                  onClick={handleResetToDefaults}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150 flex items-center gap-2"
                >
                  <Icon name="RotateCcw" size={16} />
                  Reset to Defaults
                </button>
              </div>
            </div>

            {/* Search Settings */}
            <div className="relative max-w-md">
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search settings..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation - Desktop Tabs / Mobile Accordion */}
            <div className="lg:col-span-1">
              <div className="bg-surface rounded-lg border border-border p-4">
                <h3 className="text-sm font-medium text-text-primary mb-4 uppercase tracking-wide">
                  Categories
                </h3>
                <nav className="space-y-2">
                  {filteredTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`
                        w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-150
                        ${activeTab === tab.id
                          ? 'bg-primary/10 text-primary border-l-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-light/50'
                        }
                      `}
                    >
                      <Icon
                        name={tab.icon}
                        size={20}
                        className={`mt-0.5 ${activeTab === tab.id ? 'text-primary' : 'text-current'}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{tab.label}</div>
                        <div className="text-xs text-text-tertiary mt-1 line-clamp-2">
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-3">
                    Quick Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Storage Used</span>
                      <span className="text-text-primary">2.4 MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Last Backup</span>
                      <span className="text-text-primary">2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Version</span>
                      <span className="text-text-primary">1.2.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-surface rounded-lg border border-border">
                {/* Tab Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon
                        name={tabs.find(tab => tab.id === activeTab)?.icon || 'Settings'}
                        size={20}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-text-primary">
                        {tabs.find(tab => tab.id === activeTab)?.label}
                      </h2>
                      <p className="text-text-secondary text-sm">
                        {tabs.find(tab => tab.id === activeTab)?.description}
                      </p>
                    </div>
                  </div>
                  
                  {hasUnsavedChanges && (
                    <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg flex items-center gap-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                      <span className="text-sm text-warning">You have unsaved changes</span>
                    </div>
                  )}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsAndPreferences;