import React from 'react';
import Icon from 'components/AppIcon';

const ResultsList = ({ tasks, selectedTasks, onTaskSelect, viewMode, searchQuery }) => {
  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-warning/30 text-warning-600 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <Icon name="AlertTriangle" size={16} className="text-error" />;
      case 'medium':
        return <Icon name="Minus" size={16} className="text-warning" />;
      case 'low':
        return <Icon name="ArrowDown" size={16} className="text-success" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle2" size={16} className="text-success" />;
      case 'in-progress':
        return <Icon name="Clock" size={16} className="text-warning" />;
      case 'todo':
        return <Icon name="Circle" size={16} className="text-text-secondary" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const handleTaskClick = (taskId) => {
    console.log('Navigate to task detail:', taskId);
    window.location.href = '/task-detail-view';
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No tasks found</h3>
        <p className="text-text-secondary">
          {searchQuery 
            ? "Try adjusting your search terms or filters" :"No tasks match your current filters"
          }
        </p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-surface border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-150 cursor-pointer group"
            onClick={() => handleTaskClick(task.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onTaskSelect(task.id, e.target.checked);
                  }}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/50"
                />
                {getStatusIcon(task.status)}
              </div>
              
              <div className="flex items-center gap-2">
                {getPriorityIcon(task.priority)}
                <div className={`w-3 h-3 rounded ${task.groupColor}`} title={task.group} />
              </div>
            </div>

            <h3 className="font-medium text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-150">
              {highlightText(task.title, searchQuery)}
            </h3>
            
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {highlightText(task.description, searchQuery)}
            </p>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={12} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
              <span className="px-2 py-1 bg-background rounded text-text-tertiary">
                {task.group}
              </span>
            </div>

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {task.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full"
                  >
                    {highlightText(tag, searchQuery)}
                  </span>
                ))}
                {task.tags.length > 3 && (
                  <span className="px-2 py-0.5 bg-text-secondary/20 text-text-secondary text-xs rounded-full">
                    +{task.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-surface border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-150 cursor-pointer group"
          onClick={() => handleTaskClick(task.id)}
        >
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  onTaskSelect(task.id, e.target.checked);
                }}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/50"
              />
              {getStatusIcon(task.status)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-150 line-clamp-1">
                  {highlightText(task.title, searchQuery)}
                </h3>
                
                <div className="flex items-center gap-2 ml-4">
                  {getPriorityIcon(task.priority)}
                  <div className={`w-3 h-3 rounded ${task.groupColor}`} title={task.group} />
                </div>
              </div>

              <p className="text-text-secondary mb-3 line-clamp-2">
                {highlightText(task.description, searchQuery)}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Icon name="User" size={14} />
                    <span>{task.assignee}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Icon name="FolderOpen" size={14} />
                    <span>{task.group}</span>
                  </div>
                  
                  {task.estimatedTime && (
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{task.estimatedTime}</span>
                    </div>
                  )}
                </div>

                {task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {task.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full"
                      >
                        {highlightText(tag, searchQuery)}
                      </span>
                    ))}
                    {task.tags.length > 3 && (
                      <span className="px-2 py-0.5 bg-text-secondary/20 text-text-secondary text-xs rounded-full">
                        +{task.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;