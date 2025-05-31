import React from 'react';
import Icon from 'components/AppIcon';

const PriorityTasks = ({ onTaskClick }) => {
  const priorityTasks = [
    {
      id: 1,
      title: 'Submit quarterly report',
      priority: 'high',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      group: 'Work',
      status: 'in-progress',
      progress: 75
    },
    {
      id: 2,
      title: 'Code review for feature X',
      priority: 'high',
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      group: 'Development',
      status: 'todo',
      progress: 0
    },
    {
      id: 3,
      title: 'Client presentation prep',
      priority: 'medium',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      group: 'Meetings',
      status: 'in-progress',
      progress: 40
    },
    {
      id: 4,
      title: 'Team standup meeting',
      priority: 'medium',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      group: 'Meetings',
      status: 'todo',
      progress: 0
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-error/20',
          text: 'text-error',
          border: 'border-error/30'
        };
      case 'medium':
        return {
          bg: 'bg-warning/20',
          text: 'text-warning',
          border: 'border-warning/30'
        };
      case 'low':
        return {
          bg: 'bg-success/20',
          text: 'text-success',
          border: 'border-success/30'
        };
      default:
        return {
          bg: 'bg-text-secondary/20',
          text: 'text-text-secondary',
          border: 'border-text-secondary/30'
        };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'todo':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const formatDueDate = (date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)}d overdue`, isOverdue: true };
    } else if (diffDays === 0) {
      return { text: 'Due today', isOverdue: false };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', isOverdue: false };
    } else {
      return { text: `${diffDays}d left`, isOverdue: false };
    }
  };

  const handleViewAll = () => {
    window.location.href = '/search-and-filter-interface?filter=priority';
  };

  const handleTaskComplete = (e, taskId) => {
    e.stopPropagation();
    console.log('Marking task as complete:', taskId);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Priority Tasks</h3>
        <button
          onClick={handleViewAll}
          className="text-sm text-primary hover:text-primary-600 transition-colors duration-150"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {priorityTasks.map((task) => {
          const priorityColors = getPriorityColor(task.priority);
          const dueInfo = formatDueDate(task.dueDate);
          
          return (
            <div
              key={task.id}
              onClick={() => onTaskClick(task)}
              className="p-4 bg-background rounded-lg hover:bg-surface-light/50 transition-all duration-150 cursor-pointer border border-border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    onClick={(e) => handleTaskComplete(e, task.id)}
                    className="mt-0.5 text-text-secondary hover:text-primary transition-colors duration-150"
                  >
                    <Icon name={getStatusIcon(task.status)} size={16} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-text-primary truncate mb-1">
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors.bg} ${priorityColors.text} ${priorityColors.border} border`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {task.group}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    dueInfo.isOverdue 
                      ? 'bg-error/20 text-error' :'bg-warning/20 text-warning'
                  }`}>
                    {dueInfo.text}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              {task.progress > 0 && (
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Progress</span>
                    <span className="text-xs text-text-secondary">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            {priorityTasks.filter(task => task.priority === 'high').length} high priority tasks
          </span>
          <button
            onClick={handleViewAll}
            className="flex items-center gap-1 text-primary hover:text-primary-600 transition-colors duration-150"
          >
            <span>Manage priorities</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriorityTasks;