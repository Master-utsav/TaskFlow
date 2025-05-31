import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const QuickAddTask = ({ onTaskCreate }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const suggestions = [
    "Review project documentation",
    "Schedule team meeting",
    "Update client presentation",
    "Complete code review",
    "Plan sprint retrospective"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      const newTask = {
        title: taskTitle,
        priority,
        dueDate,
        status: 'todo',
        createdAt: new Date()
      };
      console.log('Creating task:', newTask);
      setTaskTitle('');
      setIsExpanded(false);
      setPriority('medium');
      setDueDate('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setTaskTitle(suggestion);
    setIsExpanded(true);
  };

  const handleAdvancedCreate = () => {
    onTaskCreate();
    setTaskTitle('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Quick Add Task</h3>
        <button
          onClick={handleAdvancedCreate}
          className="text-sm text-primary hover:text-primary-600 transition-colors duration-150"
        >
          Advanced
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
          />
          {taskTitle && (
            <button
              type="button"
              onClick={() => setTaskTitle('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-3 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!taskTitle.trim()}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 micro-interaction"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>

      {!isExpanded && (
        <div className="mt-4">
          <p className="text-sm text-text-secondary mb-2">Suggestions:</p>
          <div className="space-y-1">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-all duration-150"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAddTask;