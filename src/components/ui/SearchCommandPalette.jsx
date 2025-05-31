import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

const SearchCommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const inputRef = useRef(null);

  const filters = [
    { id: 'all', label: 'All', icon: 'Search' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'groups', label: 'Groups', icon: 'FolderOpen' },
    { id: 'tags', label: 'Tags', icon: 'Tag' }
  ];

  const recentSearches = [
    'High priority tasks',
    'Work projects',
    'Due today',
    'Completed this week'
  ];

  const quickActions = [
    { id: 'new-task', label: 'Create new task', icon: 'Plus', shortcut: 'Ctrl+N' },
    { id: 'new-group', label: 'Create new group', icon: 'FolderPlus', shortcut: 'Ctrl+G' },
    { id: 'settings', label: 'Open settings', icon: 'Settings', shortcut: 'Ctrl+,' }
  ];

  const searchResults = [
    {
      id: 1,
      type: 'task',
      title: 'Complete project documentation',
      subtitle: 'Work • High priority • Due tomorrow',
      icon: 'CheckSquare'
    },
    {
      id: 2,
      type: 'task',
      title: 'Review team feedback',
      subtitle: 'Work • Medium priority • Due in 3 days',
      icon: 'CheckSquare'
    },
    {
      id: 3,
      type: 'group',
      title: 'Personal Projects',
      subtitle: '5 tasks • 2 completed',
      icon: 'FolderOpen'
    }
  ];

  const allItems = query.trim() 
    ? searchResults 
    : [...quickActions, ...recentSearches.map(search => ({
        id: search,
        type: 'recent',
        title: search,
        subtitle: 'Recent search',
        icon: 'Clock'
      }))];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeFilter]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % allItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + allItems.length) % allItems.length);
        break;
      case 'Enter':
        e.preventDefault();
        handleSelectItem(allItems[selectedIndex]);
        break;
      case 'Tab':
        e.preventDefault();
        const currentFilterIndex = filters.findIndex(f => f.id === activeFilter);
        const nextFilterIndex = (currentFilterIndex + 1) % filters.length;
        setActiveFilter(filters[nextFilterIndex].id);
        break;
    }
  };

  const handleSelectItem = (item) => {
    if (item.type === 'task') {
      console.log('Navigate to task:', item.id);
    } else if (item.type === 'group') {
      console.log('Navigate to group:', item.id);
    } else if (item.type === 'recent') {
      setQuery(item.title);
      return;
    } else if (item.id === 'new-task') {
      console.log('Create new task');
    } else if (item.id === 'new-group') {
      console.log('Create new group');
    } else if (item.id === 'settings') {
      window.location.href = '/settings-and-preferences';
    }
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allItems.length, activeFilter]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 z-[1200] animate-scale-in">
        <div className="bg-surface rounded-lg shadow-lg border border-border overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-border">
            <Icon name="Search" size={20} className="text-text-secondary mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks, groups, or type a command..."
              className="flex-1 bg-transparent text-text-primary placeholder-text-secondary focus:outline-none text-lg"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-150"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            <div className="ml-3 text-xs text-text-secondary">
              ESC to close
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 p-3 border-b border-border bg-background/50">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${activeFilter === filter.id
                    ? 'bg-primary/20 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-light/50'
                  }
                `}
              >
                <Icon name={filter.icon} size={16} />
                {filter.label}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {allItems.length > 0 ? (
              <div className="py-2">
                {!query.trim() && (
                  <div className="px-4 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide">
                    Quick Actions
                  </div>
                )}
                {allItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150
                      ${index === selectedIndex
                        ? 'bg-primary/10 text-primary' :'text-text-primary hover:bg-surface-light/50'
                      }
                    `}
                  >
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${index === selectedIndex ? 'bg-primary/20' : 'bg-background'}
                    `}>
                      <Icon
                        name={item.icon}
                        size={16}
                        className={index === selectedIndex ? 'text-primary' : 'text-text-secondary'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-sm text-text-secondary truncate">{item.subtitle}</div>
                      )}
                    </div>
                    {item.shortcut && (
                      <div className="text-xs text-text-secondary bg-background px-2 py-1 rounded border border-border">
                        {item.shortcut}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-3" />
                <p className="text-text-secondary">No results found</p>
                <p className="text-sm text-text-tertiary mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-3 border-t border-border bg-background/50 text-xs text-text-secondary">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded">Tab</kbd>
                Filter
              </span>
            </div>
            <span>
              {allItems.length} result{allItems.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCommandPalette;