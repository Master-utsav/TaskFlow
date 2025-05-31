import React from 'react';
import Icon from 'components/AppIcon';

const UpcomingDeadlines = ({ onTaskClick }) => {
  const upcomingTasks = [
    {
      id: 1,
      title: 'Submit quarterly report',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      priority: 'high',
      group: 'Work',
      isOverdue: false
    },
    {
      id: 2,
      title: 'Team standup meeting',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      priority: 'medium',
      group: 'Meetings',
      isOverdue: false
    },
    {
      id: 3,
      title: 'Code review for feature X',
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday (overdue)
      priority: 'high',
      group: 'Development',
      isOverdue: true
    },
    {
      id: 4,
      title: 'Update project documentation',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      priority: 'low',
      group: 'Documentation',
      isOverdue: false
    }
  ];

  const formatDueDate = (date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Clock';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const handleViewAll = () => {
    window.location.href = '/search-and-filter-interface?filter=upcoming';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Upcoming Deadlines</h3>
        <button
          onClick={handleViewAll}
          className="text-sm text-primary hover:text-primary-600 transition-colors duration-150"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {upcomingTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onTaskClick(task)}
            className="flex items-start gap-3 p-3 bg-background rounded-lg hover:bg-surface-light/50 transition-all duration-150 cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center ${getPriorityColor(task.priority)}`}>
              <Icon name={getPriorityIcon(task.priority)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.isOverdue 
                    ? 'bg-error/20 text-error' :'bg-warning/20 text-warning'
                }`}>
                  {formatDueDate(task.dueDate)}
                </span>
                <span className="text-xs text-text-secondary">
                  {task.group}
                </span>
              </div>
            </div>
            <button className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-150">
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            {upcomingTasks.filter(task => task.isOverdue).length} overdue, {upcomingTasks.filter(task => !task.isOverdue).length} upcoming
          </span>
          <button
            onClick={handleViewAll}
            className="flex items-center gap-1 text-primary hover:text-primary-600 transition-colors duration-150"
          >
            <span>Manage deadlines</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;