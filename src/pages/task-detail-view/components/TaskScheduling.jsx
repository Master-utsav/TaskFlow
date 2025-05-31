import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TaskScheduling = ({ task, isEditing, onUpdate }) => {
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [dueTime, setDueTime] = useState(task.dueTime);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('1h');

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
    onUpdate({ dueDate: e.target.value });
  };

  const handleTimeChange = (e) => {
    setDueTime(e.target.value);
    onUpdate({ dueTime: e.target.value });
  };

  const formatDueDate = () => {
    if (!task.dueDate) return 'No due date';
    const date = new Date(task.dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getDueDateColor = () => {
    if (!task.dueDate) return 'text-text-secondary';
    const date = new Date(task.dueDate);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'text-error';
    if (diffDays === 0) return 'text-warning';
    if (diffDays <= 3) return 'text-warning';
    return 'text-text-primary';
  };

  return (
    <div className="space-y-6">
      {/* Due Date & Time */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Calendar" size={20} className="mr-2" />
          Schedule
        </h3>

        <div className="space-y-4">
          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Due Date
            </label>
            {isEditing ? (
              <input
                type="date"
                value={dueDate}
                onChange={handleDateChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
              />
            ) : (
              <div className={`flex items-center space-x-2 ${getDueDateColor()}`}>
                <Icon name="Calendar" size={16} />
                <span className="font-medium">{formatDueDate()}</span>
              </div>
            )}
          </div>

          {/* Due Time */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Due Time
            </label>
            {isEditing ? (
              <input
                type="time"
                value={dueTime}
                onChange={handleTimeChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
              />
            ) : (
              <div className="flex items-center space-x-2 text-text-primary">
                <Icon name="Clock" size={16} />
                <span className="font-medium">
                  {task.dueTime ? new Date(`2000-01-01T${task.dueTime}`).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  }) : 'No time set'}
                </span>
              </div>
            )}
          </div>

          {/* Reminder */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text-secondary">
                Reminder
              </label>
              <button
                onClick={() => setReminderEnabled(!reminderEnabled)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                  ${reminderEnabled ? 'bg-primary' : 'bg-surface-light'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                    ${reminderEnabled ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
            {reminderEnabled && (
              <select
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
              >
                <option value="15m">15 minutes before</option>
                <option value="30m">30 minutes before</option>
                <option value="1h">1 hour before</option>
                <option value="2h">2 hours before</option>
                <option value="1d">1 day before</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Assignee */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2" />
          Assignee
        </h3>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary">
            <img
              src={task.assignee.avatar}
              alt={task.assignee.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full flex items-center justify-center text-white font-medium" style={{ display: 'none' }}>
              {task.assignee.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div>
            <div className="font-medium text-text-primary">{task.assignee.name}</div>
            <div className="text-sm text-text-secondary">{task.assignee.email}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Quick Actions
        </h3>

        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 text-left bg-background hover:bg-surface-light/50 rounded-lg border border-border transition-all duration-150">
            <Icon name="Play" size={16} className="text-success" />
            <span className="text-text-primary">Start Timer</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left bg-background hover:bg-surface-light/50 rounded-lg border border-border transition-all duration-150">
            <Icon name="Copy" size={16} className="text-primary" />
            <span className="text-text-primary">Duplicate Task</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left bg-background hover:bg-surface-light/50 rounded-lg border border-border transition-all duration-150">
            <Icon name="Share" size={16} className="text-secondary" />
            <span className="text-text-primary">Share Task</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left bg-background hover:bg-surface-light/50 rounded-lg border border-border transition-all duration-150">
            <Icon name="Archive" size={16} className="text-warning" />
            <span className="text-text-primary">Archive Task</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskScheduling;