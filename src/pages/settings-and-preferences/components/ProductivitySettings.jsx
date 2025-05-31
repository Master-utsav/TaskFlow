import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ProductivitySettings = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    defaultPriority: 'medium',
    autoComplete: false,
    reminderDefaults: {
      enabled: true,
      beforeDue: '1h',
      recurring: false
    },
    workingHours: {
      start: '09:00',
      end: '17:00',
      timezone: 'local'
    },
    keyboardShortcuts: {
      newTask: 'Ctrl+N',
      search: 'Ctrl+K',
      toggleComplete: 'Ctrl+Enter',
      quickAdd: 'Ctrl+Shift+A'
    },
    taskDefaults: {
      estimatedTime: '30',
      category: 'general',
      assignToGroup: false
    },
    focusMode: {
      enabled: false,
      duration: '25',
      breakDuration: '5'
    }
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    onSettingsChange();
  };

  const handleNestedSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    onSettingsChange();
  };

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-success' },
    { value: 'medium', label: 'Medium', color: 'text-warning' },
    { value: 'high', label: 'High', color: 'text-error' }
  ];

  const reminderOptions = [
    { value: '15m', label: '15 minutes before' },
    { value: '30m', label: '30 minutes before' },
    { value: '1h', label: '1 hour before' },
    { value: '2h', label: '2 hours before' },
    { value: '1d', label: '1 day before' }
  ];

  const categoryOptions = [
    { value: 'general', label: 'General' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'project', label: 'Project' }
  ];

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  const durationOptions = [
    { value: '15', label: '15 minutes' },
    { value: '25', label: '25 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  return (
    <div className="space-y-8">
      {/* Task Defaults Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="CheckSquare" size={20} />
          Task Defaults
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="defaultPriority" className="block text-sm font-medium text-text-primary mb-2">
              Default Priority
            </label>
            <select
              id="defaultPriority"
              value={settings.defaultPriority}
              onChange={(e) => handleSettingChange('defaultPriority', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="estimatedTime" className="block text-sm font-medium text-text-primary mb-2">
              Default Estimated Time (minutes)
            </label>
            <input
              type="number"
              id="estimatedTime"
              value={settings.taskDefaults.estimatedTime}
              onChange={(e) => handleNestedSettingChange('taskDefaults', 'estimatedTime', e.target.value)}
              min="5"
              max="480"
              step="5"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            />
          </div>

          <div>
            <label htmlFor="defaultCategory" className="block text-sm font-medium text-text-primary mb-2">
              Default Category
            </label>
            <select
              id="defaultCategory"
              value={settings.taskDefaults.category}
              onChange={(e) => handleNestedSettingChange('taskDefaults', 'category', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Auto-assign to Group</h4>
              <p className="text-sm text-text-secondary">Automatically assign new tasks to the current group</p>
            </div>
            <button
              onClick={() => handleNestedSettingChange('taskDefaults', 'assignToGroup', !settings.taskDefaults.assignToGroup)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.taskDefaults.assignToGroup ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.taskDefaults.assignToGroup ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Automation Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Zap" size={20} />
          Automation
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Auto-complete Subtasks</h4>
              <p className="text-sm text-text-secondary">Automatically mark parent task as complete when all subtasks are done</p>
            </div>
            <button
              onClick={() => handleSettingChange('autoComplete', !settings.autoComplete)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.autoComplete ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.autoComplete ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Reminder Defaults Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Clock" size={20} />
          Reminder Defaults
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Enable Reminders by Default</h4>
              <p className="text-sm text-text-secondary">New tasks will have reminders enabled automatically</p>
            </div>
            <button
              onClick={() => handleNestedSettingChange('reminderDefaults', 'enabled', !settings.reminderDefaults.enabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.reminderDefaults.enabled ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.reminderDefaults.enabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reminderTime" className="block text-sm font-medium text-text-primary mb-2">
                Default Reminder Time
              </label>
              <select
                id="reminderTime"
                value={settings.reminderDefaults.beforeDue}
                onChange={(e) => handleNestedSettingChange('reminderDefaults', 'beforeDue', e.target.value)}
                disabled={!settings.reminderDefaults.enabled}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150 disabled:opacity-50"
              >
                {reminderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <h4 className="font-medium text-text-primary">Recurring Reminders</h4>
                <p className="text-sm text-text-secondary">Repeat reminders until task is completed</p>
              </div>
              <button
                onClick={() => handleNestedSettingChange('reminderDefaults', 'recurring', !settings.reminderDefaults.recurring)}
                disabled={!settings.reminderDefaults.enabled}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150 disabled:opacity-50
                  ${settings.reminderDefaults.recurring ? 'bg-primary' : 'bg-border'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                    ${settings.reminderDefaults.recurring ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Working Hours Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Calendar" size={20} />
          Working Hours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="workStart" className="block text-sm font-medium text-text-primary mb-2">
              Start Time
            </label>
            <select
              id="workStart"
              value={settings.workingHours.start}
              onChange={(e) => handleNestedSettingChange('workingHours', 'start', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {timeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="workEnd" className="block text-sm font-medium text-text-primary mb-2">
              End Time
            </label>
            <select
              id="workEnd"
              value={settings.workingHours.end}
              onChange={(e) => handleNestedSettingChange('workingHours', 'end', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {timeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Focus Mode Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Target" size={20} />
          Focus Mode (Pomodoro)
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Enable Focus Mode</h4>
              <p className="text-sm text-text-secondary">Use Pomodoro technique for time management</p>
            </div>
            <button
              onClick={() => handleNestedSettingChange('focusMode', 'enabled', !settings.focusMode.enabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.focusMode.enabled ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.focusMode.enabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="focusDuration" className="block text-sm font-medium text-text-primary mb-2">
                Focus Duration
              </label>
              <select
                id="focusDuration"
                value={settings.focusMode.duration}
                onChange={(e) => handleNestedSettingChange('focusMode', 'duration', e.target.value)}
                disabled={!settings.focusMode.enabled}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150 disabled:opacity-50"
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="breakDuration" className="block text-sm font-medium text-text-primary mb-2">
                Break Duration (minutes)
              </label>
              <input
                type="number"
                id="breakDuration"
                value={settings.focusMode.breakDuration}
                onChange={(e) => handleNestedSettingChange('focusMode', 'breakDuration', e.target.value)}
                min="1"
                max="30"
                disabled={!settings.focusMode.enabled}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150 disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Keyboard" size={20} />
          Keyboard Shortcuts
        </h3>
        <div className="space-y-3">
          {Object.entries(settings.keyboardShortcuts).map(([action, shortcut]) => (
            <div key={action} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <h4 className="font-medium text-text-primary capitalize">
                  {action.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-text-secondary">
                  {action === 'newTask' && 'Create a new task'}
                  {action === 'search' && 'Open search command palette'}
                  {action === 'toggleComplete' && 'Mark selected task as complete/incomplete'}
                  {action === 'quickAdd' && 'Quick add task without opening modal'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-3 py-1 bg-surface border border-border rounded text-sm font-mono">
                  {shortcut}
                </kbd>
                <button className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-150">
                  <Icon name="Edit" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductivitySettings;