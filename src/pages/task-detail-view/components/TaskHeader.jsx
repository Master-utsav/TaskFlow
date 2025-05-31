import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TaskHeader = ({ task, isEditing, onUpdate }) => {
  const [title, setTitle] = useState(task.title);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onUpdate({ title: e.target.value });
  };

  const handleStatusToggle = () => {
    const newStatus = task.status === 'completed' ? 'in-progress' : 'completed';
    onUpdate({ status: newStatus });
  };

  const handlePriorityChange = (priority) => {
    onUpdate({ priority });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/20';
      case 'medium': return 'text-warning bg-warning/20';
      case 'low': return 'text-success bg-success/20';
      default: return 'text-text-secondary bg-surface-light';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/20';
      case 'in-progress': return 'text-warning bg-warning/20';
      case 'todo': return 'text-text-secondary bg-surface-light';
      default: return 'text-text-secondary bg-surface-light';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 mr-4">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full text-2xl font-bold bg-transparent border-none text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2 -ml-2"
              placeholder="Task title..."
            />
          ) : (
            <h1 className="text-2xl font-bold text-text-primary mb-2">{task.title}</h1>
          )}
        </div>

        <button
          onClick={handleStatusToggle}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-150 micro-interaction
            ${task.status === 'completed' 
              ? 'bg-success/20 text-success hover:bg-success/30' :'bg-surface-light text-text-secondary hover:bg-surface-light/70'
            }
          `}
        >
          <Icon 
            name={task.status === 'completed' ? "CheckCircle2" : "Circle"} 
            size={20} 
          />
          <span className="hidden sm:inline">
            {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
          </span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Priority */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Priority:</span>
          {isEditing ? (
            <select
              value={task.priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-1 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          ) : (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
            {task.status === 'in-progress' ? 'In Progress' : 
             task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>

        {/* Category */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Category:</span>
          <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
            {task.category}
          </span>
        </div>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-text-secondary">Tags:</span>
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Progress</span>
          <span className="text-sm font-medium text-text-primary">{task.progress}%</span>
        </div>
        <div className="w-full bg-surface-light rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} />
          <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} />
          <span>Updated {new Date(task.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="User" size={16} />
          <span>Assigned to {task.assignee.name}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;