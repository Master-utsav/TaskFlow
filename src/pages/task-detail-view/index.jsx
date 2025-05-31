import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';

import TaskHeader from './components/TaskHeader';
import TaskDescription from './components/TaskDescription';
import TaskScheduling from './components/TaskScheduling';
import TaskSubtasks from './components/TaskSubtasks';
import TaskComments from './components/TaskComments';
import TaskAttachments from './components/TaskAttachments';

const TaskDetailView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock task data
  const [taskData, setTaskData] = useState({
    id: 1,
    title: "Complete project documentation",
    description: `This task involves creating comprehensive documentation for the TaskFlow Pro application. The documentation should include:

• User guide with step-by-step instructions
• Technical specifications and API documentation
• Installation and setup procedures
• Troubleshooting guide and FAQ section
• Best practices and usage recommendations

The documentation needs to be clear, concise, and accessible to both technical and non-technical users. All sections should be properly formatted with screenshots and examples where applicable.`,
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-12-25',
    dueTime: '17:00',
    category: 'Work',
    group: 'Development Projects',
    tags: ['documentation', 'high-priority', 'development'],
    progress: 65,
    timeSpent: 240, // minutes
    estimatedTime: 480, // minutes
    assignee: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      email: 'john.doe@example.com'
    },
    createdAt: '2024-12-20T10:00:00Z',
    updatedAt: '2024-12-23T14:30:00Z',
    subtasks: [
      { id: 1, title: 'Create user guide outline', completed: true },
      { id: 2, title: 'Write installation instructions', completed: true },
      { id: 3, title: 'Document API endpoints', completed: false },
      { id: 4, title: 'Add screenshots and examples', completed: false },
      { id: 5, title: 'Review and proofread', completed: false }
    ],
    attachments: [
      { id: 1, name: 'project-specs.pdf', size: '2.4 MB', type: 'pdf', url: '#' },
      { id: 2, name: 'wireframes.fig', size: '1.8 MB', type: 'figma', url: '#' }
    ],
    comments: [
      {
        id: 1,
        author: 'Sarah Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'Great progress on the documentation! The user guide section looks comprehensive.',
        timestamp: '2024-12-23T09:15:00Z'
      },
      {
        id: 2,
        author: 'Mike Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
        content: 'Please make sure to include the troubleshooting section for common installation issues.',
        timestamp: '2024-12-23T11:30:00Z'
      }
    ],
    dependencies: [
      { id: 2, title: 'Finalize API specifications', status: 'completed' },
      { id: 3, title: 'Complete UI design review', status: 'in-progress' }
    ]
  });

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleTaskUpdate = (updates) => {
    setTaskData(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    console.log('Saving task:', taskData);
    setHasUnsavedChanges(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmDiscard = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
      if (!confirmDiscard) return;
    }
    setIsEditing(false);
    setHasUnsavedChanges(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task? This action cannot be undone.');
    if (confirmDelete) {
      console.log('Deleting task:', taskData.id);
      window.location.href = '/dashboard-overview';
    }
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'subtasks', label: 'Subtasks', icon: 'CheckSquare' },
    { id: 'comments', label: 'Comments', icon: 'MessageSquare', badge: taskData.comments.length },
    { id: 'attachments', label: 'Attachments', icon: 'Paperclip', badge: taskData.attachments.length }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            if (isEditing) handleSave();
            break;
          case 'e':
            e.preventDefault();
            setIsEditing(!isEditing);
            break;
          case 'Escape':
            if (isEditing) handleCancel();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, hasUnsavedChanges]);

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
        transition-all duration-300 ease-in-out pt-16
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            <button 
              onClick={() => window.location.href = '/dashboard-overview'}
              className="hover:text-text-primary transition-colors duration-150"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <button 
              onClick={() => window.location.href = '/task-groups-management'}
              className="hover:text-text-primary transition-colors duration-150"
            >
              {taskData.group}
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary font-medium truncate max-w-xs">
              {taskData.title}
            </span>
          </nav>

          {/* Action Bar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-surface rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.location.href = '/dashboard-overview'}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150"
                title="Back to Dashboard"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div className="h-6 w-px bg-border" />
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150
                  ${isEditing 
                    ? 'bg-warning/20 text-warning' :'text-text-secondary hover:text-text-primary hover:bg-surface-light/50'
                  }
                `}
                title="Toggle Edit Mode (Ctrl+E)"
              >
                <Icon name={isEditing ? "Edit3" : "Edit"} size={16} />
                <span className="hidden sm:inline">{isEditing ? 'Editing' : 'Edit'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {hasUnsavedChanges && (
                <span className="text-xs text-warning bg-warning/20 px-2 py-1 rounded-full">
                  Unsaved changes
                </span>
              )}
              
              {isEditing && (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150 micro-interaction"
                    title="Save Changes (Ctrl+S)"
                  >
                    Save Changes
                  </button>
                </>
              )}
              
              <button
                onClick={handleDelete}
                className="p-2 text-error hover:bg-error/20 rounded-lg transition-all duration-150"
                title="Delete Task"
              >
                <Icon name="Trash2" size={16} />
              </button>
            </div>
          </div>

          {/* Task Header */}
          <TaskHeader 
            task={taskData}
            isEditing={isEditing}
            onUpdate={handleTaskUpdate}
          />

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-all duration-150
                    ${activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }
                  `}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-accent/20 text-accent rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'details' && (
                <TaskDescription 
                  task={taskData}
                  isEditing={isEditing}
                  onUpdate={handleTaskUpdate}
                />
              )}
              
              {activeTab === 'subtasks' && (
                <TaskSubtasks 
                  task={taskData}
                  isEditing={isEditing}
                  onUpdate={handleTaskUpdate}
                />
              )}
              
              {activeTab === 'comments' && (
                <TaskComments 
                  task={taskData}
                  onUpdate={handleTaskUpdate}
                />
              )}
              
              {activeTab === 'attachments' && (
                <TaskAttachments 
                  task={taskData}
                  isEditing={isEditing}
                  onUpdate={handleTaskUpdate}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <TaskScheduling 
                task={taskData}
                isEditing={isEditing}
                onUpdate={handleTaskUpdate}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetailView;