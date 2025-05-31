import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';
import GroupsList from './components/GroupsList';
import GroupDetails from './components/GroupDetails';
import CreateGroupModal from './components/CreateGroupModal';
import BulkActionsToolbar from './components/BulkActionsToolbar';

const TaskGroupsManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockGroups = [
    {
      id: 1,
      title: "Work Projects",
      description: "Professional tasks and project-related activities",
      taskCount: 12,
      completedTasks: 8,
      color: "#3B82F6",
      createdAt: "2024-01-15",
      lastModified: "2024-01-20",
      members: ["John Doe", "Jane Smith"],
      tasks: [
        {
          id: 101,
          title: "Complete project documentation",
          status: "in-progress",
          priority: "high",
          dueDate: "2024-01-25"
        },
        {
          id: 102,
          title: "Review team feedback",
          status: "todo",
          priority: "medium",
          dueDate: "2024-01-28"
        }
      ]
    },
    {
      id: 2,
      title: "Personal Goals",
      description: "Personal development and lifestyle improvements",
      taskCount: 8,
      completedTasks: 3,
      color: "#10B981",
      createdAt: "2024-01-10",
      lastModified: "2024-01-22",
      members: ["John Doe"],
      tasks: [
        {
          id: 201,
          title: "Read 2 books this month",
          status: "in-progress",
          priority: "low",
          dueDate: "2024-01-31"
        },
        {
          id: 202,
          title: "Exercise 3 times a week",
          status: "completed",
          priority: "medium",
          dueDate: "2024-01-24"
        }
      ]
    },
    {
      id: 3,
      title: "Home Maintenance",
      description: "House repairs and improvement tasks",
      taskCount: 5,
      completedTasks: 2,
      color: "#F59E0B",
      createdAt: "2024-01-12",
      lastModified: "2024-01-21",
      members: ["John Doe", "Sarah Wilson"],
      tasks: [
        {
          id: 301,
          title: "Fix kitchen faucet",
          status: "todo",
          priority: "high",
          dueDate: "2024-01-26"
        }
      ]
    },
    {
      id: 4,
      title: "Learning & Development",
      description: "Skill building and educational activities",
      taskCount: 15,
      completedTasks: 10,
      color: "#6366F1",
      createdAt: "2024-01-08",
      lastModified: "2024-01-23",
      members: ["John Doe"],
      tasks: [
        {
          id: 401,
          title: "Complete React course",
          status: "in-progress",
          priority: "medium",
          dueDate: "2024-02-15"
        }
      ]
    }
  ];

  const [groups, setGroups] = useState(mockGroups);

  useEffect(() => {
    if (groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0]);
    }
  }, [groups, selectedGroup]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setSelectedGroups([]);
  };

  const handleGroupToggleSelect = (groupId) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleCreateGroup = (groupData) => {
    const newGroup = {
      id: Date.now(),
      ...groupData,
      taskCount: 0,
      completedTasks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      members: ["John Doe"],
      tasks: []
    };
    setGroups(prev => [...prev, newGroup]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateGroup = (updatedGroup) => {
    setGroups(prev => prev.map(group => 
      group.id === updatedGroup.id ? updatedGroup : group
    ));
    setSelectedGroup(updatedGroup);
  };

  const handleDeleteGroup = (groupId) => {
    setGroups(prev => prev.filter(group => group.id !== groupId));
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(groups.find(g => g.id !== groupId) || null);
    }
    setSelectedGroups(prev => prev.filter(id => id !== groupId));
  };

  const handleBulkDelete = () => {
    setGroups(prev => prev.filter(group => !selectedGroups.includes(group.id)));
    if (selectedGroup && selectedGroups.includes(selectedGroup.id)) {
      setSelectedGroup(groups.find(g => !selectedGroups.includes(g.id)) || null);
    }
    setSelectedGroups([]);
  };

  const handleDuplicateGroup = (group) => {
    const duplicatedGroup = {
      ...group,
      id: Date.now(),
      title: `${group.title} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setGroups(prev => [...prev, duplicatedGroup]);
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'completed') return matchesSearch && group.completedTasks === group.taskCount;
    if (filterStatus === 'in-progress') return matchesSearch && group.completedTasks < group.taskCount && group.completedTasks > 0;
    if (filterStatus === 'not-started') return matchesSearch && group.completedTasks === 0;
    
    return matchesSearch;
  });

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
        pt-16 transition-all duration-300 ease-in-out min-h-screen
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Task Groups</h1>
                <p className="text-text-secondary">
                  Organize your tasks into logical collections and manage group-level operations
                </p>
              </div>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150 micro-interaction"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Create Group
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
              >
                <option value="all">All Groups</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>

            {/* Bulk Actions Toolbar */}
            {selectedGroups.length > 0 && (
              <BulkActionsToolbar
                selectedCount={selectedGroups.length}
                onDelete={handleBulkDelete}
                onClearSelection={() => setSelectedGroups([])}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Groups List Panel */}
            <div className="lg:col-span-4">
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">
                    Groups ({filteredGroups.length})
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedGroups(filteredGroups.map(g => g.id))}
                      className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-150"
                    >
                      Select All
                    </button>
                  </div>
                </div>
                
                <GroupsList
                  groups={filteredGroups}
                  selectedGroup={selectedGroup}
                  selectedGroups={selectedGroups}
                  onGroupSelect={handleGroupSelect}
                  onGroupToggleSelect={handleGroupToggleSelect}
                  onDeleteGroup={handleDeleteGroup}
                  onDuplicateGroup={handleDuplicateGroup}
                  onUpdateGroup={handleUpdateGroup}
                />
              </div>
            </div>

            {/* Group Details Panel */}
            <div className="lg:col-span-8">
              {selectedGroup ? (
                <GroupDetails
                  group={selectedGroup}
                  onUpdateGroup={handleUpdateGroup}
                />
              ) : (
                <div className="bg-surface rounded-lg border border-border p-12 text-center">
                  <Icon name="FolderOpen" size={64} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No Group Selected
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Select a group from the list to view its details and manage tasks
                  </p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150 micro-interaction"
                  >
                    <Icon name="Plus" size={20} className="mr-2" />
                    Create Your First Group
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
};

export default TaskGroupsManagement;