import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import SearchCommandPalette from 'components/ui/SearchCommandPalette';
import TaskDetailModal from 'components/ui/TaskDetailModal';
import QuickAddTask from './components/QuickAddTask';
import RecentActivity from './components/RecentActivity';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import TaskStatistics from './components/TaskStatistics';
import MiniCalendar from './components/MiniCalendar';
import PriorityTasks from './components/PriorityTasks';
import Icon from 'components/AppIcon';

const DashboardOverview = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleTaskModalOpen = (task = null) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleSearchOpen();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        handleTaskModalOpen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSidebarToggle={handleMobileSidebarToggle}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      <main className={`
        pt-16 transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
                Good morning, John! 👋
              </h1>
              <button
                onClick={handleSearchOpen}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150"
              >
                <Icon name="Search" size={16} />
                <span className="text-sm">Search tasks...</span>
                <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">⌘K</kbd>
              </button>
            </div>
            <p className="text-text-secondary">
              You have 8 tasks pending and 3 due today. Let's get productive!
            </p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Quick Actions & Activity */}
            <div className="lg:col-span-4 space-y-6">
              <QuickAddTask onTaskCreate={handleTaskModalOpen} />
              <RecentActivity />
              <UpcomingDeadlines onTaskClick={handleTaskModalOpen} />
            </div>

            {/* Center Column - Statistics */}
            <div className="lg:col-span-5 space-y-6">
              <TaskStatistics />
              
              {/* Quick Actions Grid */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleTaskModalOpen()}
                    className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:bg-surface-light/50 transition-all duration-150 micro-interaction"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="Plus" size={20} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-text-primary">New Task</p>
                      <p className="text-sm text-text-secondary">Create task</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => window.location.href = '/task-groups-management'}
                    className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:bg-surface-light/50 transition-all duration-150 micro-interaction"
                  >
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Icon name="FolderPlus" size={20} className="text-secondary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-text-primary">New Group</p>
                      <p className="text-sm text-text-secondary">Organize tasks</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => window.location.href = '/search-and-filter-interface'}
                    className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:bg-surface-light/50 transition-all duration-150 micro-interaction"
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Icon name="Search" size={20} className="text-accent" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-text-primary">Search</p>
                      <p className="text-sm text-text-secondary">Find tasks</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => window.location.href = '/settings-and-preferences'}
                    className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:bg-surface-light/50 transition-all duration-150 micro-interaction"
                  >
                    <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                      <Icon name="Settings" size={20} className="text-warning" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-text-primary">Settings</p>
                      <p className="text-sm text-text-secondary">Preferences</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Calendar & Priority Tasks */}
            <div className="lg:col-span-3 space-y-6">
              <MiniCalendar onDateClick={handleTaskModalOpen} />
              <PriorityTasks onTaskClick={handleTaskModalOpen} />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <SearchCommandPalette 
        isOpen={isSearchOpen} 
        onClose={handleSearchClose} 
      />
      
      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={handleTaskModalClose}
        task={selectedTask}
      />
    </div>
  );
};

export default DashboardOverview;