import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ activeFilters, onFilterChange, onClearFilters, allTasks }) => {
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    priority: true,
    groups: true,
    tags: false,
    dateRange: false,
    assignee: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const statusOptions = [
    { value: 'todo', label: 'To Do', count: allTasks.filter(t => t.status === 'todo').length, color: 'text-text-secondary' },
    { value: 'in-progress', label: 'In Progress', count: allTasks.filter(t => t.status === 'in-progress').length, color: 'text-warning' },
    { value: 'completed', label: 'Completed', count: allTasks.filter(t => t.status === 'completed').length, color: 'text-success' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High', count: allTasks.filter(t => t.priority === 'high').length, color: 'text-error' },
    { value: 'medium', label: 'Medium', count: allTasks.filter(t => t.priority === 'medium').length, color: 'text-warning' },
    { value: 'low', label: 'Low', count: allTasks.filter(t => t.priority === 'low').length, color: 'text-success' }
  ];

  const groupOptions = [
    { value: 'Work', label: 'Work', count: allTasks.filter(t => t.group === 'Work').length, color: 'bg-blue-500' },
    { value: 'Personal', label: 'Personal', count: allTasks.filter(t => t.group === 'Personal').length, color: 'bg-green-500' },
    { value: 'Projects', label: 'Projects', count: allTasks.filter(t => t.group === 'Projects').length, color: 'bg-purple-500' }
  ];

  const allTags = [...new Set(allTasks.flatMap(task => task.tags))];
  const allAssignees = [...new Set(allTasks.map(task => task.assignee))];

  const handleCheckboxChange = (filterType, value, isChecked) => {
    const currentValues = activeFilters[filterType] || [];
    let newValues;
    
    if (isChecked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    
    onFilterChange(filterType, newValues);
  };

  const handleDateRangeChange = (field, value) => {
    onFilterChange('dateRange', {
      ...activeFilters.dateRange,
      [field]: value
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (key === 'dateRange') {
        if (value.start || value.end) count++;
      } else if (Array.isArray(value) && value.length > 0) {
        count++;
      }
    });
    return count;
  };

  const FilterSection = ({ title, isExpanded, onToggle, children, count = 0 }) => (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-surface hover:bg-surface-light/50 transition-all duration-150"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">{title}</span>
          {count > 0 && (
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
              {count}
            </span>
          )}
        </div>
        <Icon
          name="ChevronDown"
          size={16}
          className={`text-text-secondary transition-transform duration-150 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-background border-t border-border">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary-600 transition-colors duration-150"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {getActiveFilterCount() > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-text-primary">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.status.map(status => (
              <span
                key={status}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
              >
                Status: {statusOptions.find(s => s.value === status)?.label}
                <button
                  onClick={() => handleCheckboxChange('status', status, false)}
                  className="hover:text-primary-600"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
            
            {activeFilters.priority.map(priority => (
              <span
                key={priority}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
              >
                Priority: {priorityOptions.find(p => p.value === priority)?.label}
                <button
                  onClick={() => handleCheckboxChange('priority', priority, false)}
                  className="hover:text-primary-600"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
            
            {activeFilters.groups.map(group => (
              <span
                key={group}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
              >
                Group: {group}
                <button
                  onClick={() => handleCheckboxChange('groups', group, false)}
                  className="hover:text-primary-600"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-3">
        {/* Status Filter */}
        <FilterSection
          title="Status"
          isExpanded={expandedSections.status}
          onToggle={() => toggleSection('status')}
          count={activeFilters.status.length}
        >
          <div className="space-y-2">
            {statusOptions.map(option => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.status.includes(option.value)}
                  onChange={(e) => handleCheckboxChange('status', option.value, e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/50"
                />
                <div className="flex items-center gap-2 flex-1">
                  <span className={`w-2 h-2 rounded-full ${option.color === 'text-text-secondary' ? 'bg-text-secondary' : option.color === 'text-warning' ? 'bg-warning' : 'bg-success'}`} />
                  <span className="text-text-primary">{option.label}</span>
                  <span className="text-text-secondary text-sm">({option.count})</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Priority Filter */}
        <FilterSection
          title="Priority"
          isExpanded={expandedSections.priority}
          onToggle={() => toggleSection('priority')}
          count={activeFilters.priority.length}
        >
          <div className="space-y-2">
            {priorityOptions.map(option => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.priority.includes(option.value)}
                  onChange={(e) => handleCheckboxChange('priority', option.value, e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/50"
                />
                <div className="flex items-center gap-2 flex-1">
                  <Icon
                    name={option.value === 'high' ? 'AlertTriangle' : option.value === 'medium' ? 'Minus' : 'ArrowDown'}
                    size={14}
                    className={option.color}
                  />
                  <span className="text-text-primary">{option.label}</span>
                  <span className="text-text-secondary text-sm">({option.count})</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Groups Filter */}
        <FilterSection
          title="Groups"
          isExpanded={expandedSections.groups}
          onToggle={() => toggleSection('groups')}
          count={activeFilters.groups.length}
        >
          <div className="space-y-2">
            {groupOptions.map(option => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.groups.includes(option.value)}
                  onChange={(e) => handleCheckboxChange('groups', option.value, e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/50"
                />
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-3 h-3 rounded ${option.color}`} />
                  <span className="text-text-primary">{option.label}</span>
                  <span className="text-text-secondary text-sm">({option.count})</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Date Range Filter */}
        <FilterSection
          title="Due Date Range"
          isExpanded={expandedSections.dateRange}
          onToggle={() => toggleSection('dateRange')}
          count={activeFilters.dateRange.start || activeFilters.dateRange.end ? 1 : 0}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">From</label>
              <input
                type="date"
                value={activeFilters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">To</label>
              <input
                type="date"
                value={activeFilters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            {/* Quick Date Shortcuts */}
            <div className="pt-2 border-t border-border">
              <div className="text-sm font-medium text-text-primary mb-2">Quick Select:</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    handleDateRangeChange('start', today);
                    handleDateRangeChange('end', today);
                  }}
                  className="px-2 py-1 text-xs bg-surface hover:bg-surface-light/50 border border-border rounded text-text-primary transition-all duration-150"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                    handleDateRangeChange('start', today.toISOString().split('T')[0]);
                    handleDateRangeChange('end', nextWeek.toISOString().split('T')[0]);
                  }}
                  className="px-2 py-1 text-xs bg-surface hover:bg-surface-light/50 border border-border rounded text-text-primary transition-all duration-150"
                >
                  Next 7 days
                </button>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Tags Filter */}
        <FilterSection
          title="Tags"
          isExpanded={expandedSections.tags}
          onToggle={() => toggleSection('tags')}
          count={activeFilters.tags.length}
        >
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {allTags.map(tag => (
              <label key={tag} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.tags.includes(tag)}
                  onChange={(e) => handleCheckboxChange('tags', tag, e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/50"
                />
                <div className="flex items-center gap-2 flex-1">
                  <Icon name="Tag" size={14} className="text-text-secondary" />
                  <span className="text-text-primary">{tag}</span>
                  <span className="text-text-secondary text-sm">
                    ({allTasks.filter(t => t.tags.includes(tag)).length})
                  </span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Assignee Filter */}
        <FilterSection
          title="Assignee"
          isExpanded={expandedSections.assignee}
          onToggle={() => toggleSection('assignee')}
          count={activeFilters.assignee.length}
        >
          <div className="space-y-2">
            {allAssignees.map(assignee => (
              <label key={assignee} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.assignee.includes(assignee)}
                  onChange={(e) => handleCheckboxChange('assignee', assignee, e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/50"
                />
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {assignee.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-text-primary">{assignee}</span>
                  <span className="text-text-secondary text-sm">
                    ({allTasks.filter(t => t.assignee === assignee).length})
                  </span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterPanel;