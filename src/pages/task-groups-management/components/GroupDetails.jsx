import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GroupDetails = ({ group, onUpdateGroup }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: group.title,
    description: group.description,
    color: group.color
  });
  const [activeTab, setActiveTab] = useState('overview');

  const colorOptions = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#6366F1', '#8B5CF6', '#EC4899', '#06B6D4'
  ];

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdateGroup({
      ...group,
      ...editForm,
      lastModified: new Date().toISOString().split('T')[0]
    });
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditForm({
      title: group.title,
      description: group.description,
      color: group.color
    });
    setIsEditing(false);
  };

  const getCompletionPercentage = () => {
    if (group.taskCount === 0) return 0;
    return Math.round((group.completedTasks / group.taskCount) * 100);
  };

  const getTasksByStatus = (status) => {
    return group.tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'todo': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: group.color }}
            >
              <Icon name="FolderOpen" size={24} className="text-white" />
            </div>
            <div>
              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="text-2xl font-bold bg-background border border-border rounded px-3 py-1 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={2}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary">Color:</span>
                    <div className="flex gap-2">
                      {colorOptions.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setEditForm(prev => ({ ...prev, color }))}
                          className={`w-6 h-6 rounded-full border-2 transition-all duration-150 ${
                            editForm.color === color ? 'border-text-primary scale-110' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-600 transition-colors duration-150"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      className="px-3 py-1 text-text-secondary hover:text-text-primary transition-colors duration-150"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-text-primary mb-1">{group.title}</h1>
                  <p className="text-text-secondary mb-2">{group.description}</p>
                  <div className="flex items-center gap-4 text-sm text-text-tertiary">
                    <span>Created {group.createdAt}</span>
                    <span>•</span>
                    <span>Modified {group.lastModified}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
            >
              <Icon name="Edit2" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all duration-150
                ${activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Total Tasks</p>
                    <p className="text-2xl font-bold text-text-primary">{group.taskCount}</p>
                  </div>
                  <Icon name="CheckSquare" size={24} className="text-primary" />
                </div>
              </div>
              
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Completed</p>
                    <p className="text-2xl font-bold text-success">{group.completedTasks}</p>
                  </div>
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
              
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Progress</p>
                    <p className="text-2xl font-bold text-text-primary">{getCompletionPercentage()}%</p>
                  </div>
                  <Icon name="TrendingUp" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">Overall Progress</span>
                <span className="text-sm text-text-secondary">{getCompletionPercentage()}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${getCompletionPercentage()}%`,
                    backgroundColor: group.color
                  }}
                />
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Team Members</h3>
              <div className="flex flex-wrap gap-3">
                {group.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-2 bg-background rounded-lg p-3 border border-border">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-sm text-white font-medium">
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-text-primary">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Tasks Preview</h3>
              <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-150">
                View All Tasks
              </button>
            </div>
            
            {group.tasks.length > 0 ? (
              <div className="space-y-3">
                {group.tasks.slice(0, 5).map(task => (
                  <div key={task.id} className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status).replace('text-', 'bg-')}`} />
                        <span className="font-medium text-text-primary">{task.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority).replace('text-', 'bg-')}/20 ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-text-secondary">
                            Due {task.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="CheckSquare" size={48} className="text-text-secondary mx-auto mb-3" />
                <p className="text-text-secondary">No tasks in this group yet</p>
                <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150">
                  Add First Task
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Group Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-text-primary">Archive Group</p>
                    <p className="text-sm text-text-secondary">Hide this group from the main view</p>
                  </div>
                  <button className="px-4 py-2 text-warning hover:bg-warning/10 rounded-lg transition-all duration-150">
                    Archive
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-text-primary">Delete Group</p>
                    <p className="text-sm text-text-secondary">Permanently remove this group and all its tasks</p>
                  </div>
                  <button className="px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-all duration-150">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;