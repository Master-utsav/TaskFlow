import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'task_completed',
      title: 'Completed "Review project documentation"',
      time: '2 minutes ago',
      icon: 'CheckCircle',
      iconColor: 'text-success'
    },
    {
      id: 2,
      type: 'task_created',
      title: 'Created "Update client presentation"',
      time: '15 minutes ago',
      icon: 'Plus',
      iconColor: 'text-primary'
    },
    {
      id: 3,
      type: 'task_moved',
      title: 'Moved "Code review" to In Progress',
      time: '1 hour ago',
      icon: 'ArrowRight',
      iconColor: 'text-warning'
    },
    {
      id: 4,
      type: 'group_created',
      title: 'Created new group "Sprint Planning"',
      time: '2 hours ago',
      icon: 'FolderPlus',
      iconColor: 'text-secondary'
    },
    {
      id: 5,
      type: 'task_due',
      title: 'Task "Team meeting" is due tomorrow',
      time: '3 hours ago',
      icon: 'Clock',
      iconColor: 'text-error'
    }
  ];

  const handleViewAll = () => {
    window.location.href = '/search-and-filter-interface';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <button
          onClick={handleViewAll}
          className="text-sm text-primary hover:text-primary-600 transition-colors duration-150"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 bg-background rounded-lg hover:bg-surface-light/50 transition-all duration-150"
          >
            <div className={`w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center ${activity.iconColor}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {activity.title}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            {activities.length} recent activities
          </span>
          <button
            onClick={handleViewAll}
            className="flex items-center gap-1 text-primary hover:text-primary-600 transition-colors duration-150"
          >
            <span>View history</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;