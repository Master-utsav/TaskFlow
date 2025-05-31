import React from 'react';
import Icon from 'components/AppIcon';

const TaskStatistics = () => {
  const stats = [
    {
      id: 'total',
      title: 'Total Tasks',
      value: 24,
      change: '+3',
      changeType: 'increase',
      icon: 'CheckSquare',
      color: 'primary',
      description: 'All tasks in system'
    },
    {
      id: 'completed',
      title: 'Completed Today',
      value: 8,
      change: '+2',
      changeType: 'increase',
      icon: 'CheckCircle',
      color: 'success',
      description: 'Tasks finished today'
    },
    {
      id: 'overdue',
      title: 'Overdue',
      value: 3,
      change: '-1',
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'error',
      description: 'Tasks past due date'
    },
    {
      id: 'productivity',
      title: 'Productivity',
      value: '85%',
      change: '+5%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'accent',
      description: 'Weekly completion rate'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/20',
          text: 'text-primary',
          border: 'border-primary/30'
        };
      case 'success':
        return {
          bg: 'bg-success/20',
          text: 'text-success',
          border: 'border-success/30'
        };
      case 'error':
        return {
          bg: 'bg-error/20',
          text: 'text-error',
          border: 'border-error/30'
        };
      case 'accent':
        return {
          bg: 'bg-accent/20',
          text: 'text-accent',
          border: 'border-accent/30'
        };
      default:
        return {
          bg: 'bg-text-secondary/20',
          text: 'text-text-secondary',
          border: 'border-text-secondary/30'
        };
    }
  };

  const handleStatClick = (statId) => {
    switch (statId) {
      case 'total':
        window.location.href = '/search-and-filter-interface';
        break;
      case 'completed':
        window.location.href = '/search-and-filter-interface?filter=completed';
        break;
      case 'overdue':
        window.location.href = '/search-and-filter-interface?filter=overdue';
        break;
      case 'productivity':
        window.location.href = '/settings-and-preferences?tab=analytics';
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Task Overview</h3>
        <button
          onClick={() => window.location.href = '/search-and-filter-interface'}
          className="text-sm text-primary hover:text-primary-600 transition-colors duration-150"
        >
          View Details
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => {
          const colors = getColorClasses(stat.color);
          
          return (
            <div
              key={stat.id}
              onClick={() => handleStatClick(stat.id)}
              className="bg-surface border border-border rounded-lg p-6 hover:bg-surface-light/50 transition-all duration-150 cursor-pointer micro-interaction"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                  <Icon name={stat.icon} size={24} className={colors.text} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'increase' ?'bg-success/20 text-success' :'bg-error/20 text-error'
                }`}>
                  <Icon 
                    name={stat.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                  />
                  {stat.change}
                </div>
              </div>
              
              <div>
                <h4 className="text-2xl font-bold text-text-primary mb-1">
                  {stat.value}
                </h4>
                <p className="text-sm font-medium text-text-primary mb-1">
                  {stat.title}
                </p>
                <p className="text-xs text-text-secondary">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Overview */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-text-primary mb-4">Weekly Progress</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Completion Rate</span>
              <span className="text-sm text-text-secondary">85%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div className="bg-success h-2 rounded-full transition-all duration-300" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">On-time Delivery</span>
              <span className="text-sm text-text-secondary">92%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Focus Time</span>
              <span className="text-sm text-text-secondary">6.5h</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div className="bg-accent h-2 rounded-full transition-all duration-300" style={{ width: '81%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;