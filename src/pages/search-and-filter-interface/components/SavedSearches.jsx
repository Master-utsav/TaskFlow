import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SavedSearches = ({ savedSearches, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');

  const handleSaveSearch = () => {
    if (newSearchName.trim()) {
      console.log('Save search:', newSearchName);
      setNewSearchName('');
      setIsCreating(false);
    }
  };

  const handleDeleteSearch = (searchId, e) => {
    e.stopPropagation();
    console.log('Delete saved search:', searchId);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-light/50 transition-all duration-150"
      >
        <div className="flex items-center gap-2">
          <Icon name="Bookmark" size={16} className="text-text-secondary" />
          <span className="font-medium text-text-primary">Saved Searches</span>
          <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">
            {savedSearches.length}
          </span>
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
        <div className="border-t border-border bg-background">
          {/* Create New Search */}
          <div className="p-4 border-b border-border">
            {!isCreating ? (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-all duration-150"
              >
                <Icon name="Plus" size={16} />
                Save Current Search
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={newSearchName}
                  onChange={(e) => setNewSearchName(e.target.value)}
                  placeholder="Enter search name..."
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveSearch}
                    className="flex-1 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150 text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setNewSearchName('');
                    }}
                    className="px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Saved Searches List */}
          <div className="max-h-60 overflow-y-auto">
            {savedSearches.length > 0 ? (
              <div className="p-2 space-y-1">
                {savedSearches.map((search) => (
                  <div
                    key={search.id}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-surface-light/50 transition-all duration-150"
                  >
                    <button
                      onClick={() => onSelect(search)}
                      className="flex-1 flex items-center gap-2 text-left"
                    >
                      <Icon name="Search" size={14} className="text-text-secondary" />
                      <span className="text-sm text-text-primary truncate">
                        {search.name}
                      </span>
                    </button>
                    
                    <button
                      onClick={(e) => handleDeleteSearch(search.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-text-secondary hover:text-error transition-all duration-150"
                      title="Delete saved search"
                    >
                      <Icon name="Trash2" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center">
                <Icon name="Bookmark" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No saved searches yet</p>
                <p className="text-xs text-text-tertiary mt-1">
                  Save your frequent searches for quick access
                </p>
              </div>
            )}
          </div>

          {/* Quick Searches */}
          <div className="border-t border-border p-4">
            <div className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
              Quick Searches
            </div>
            <div className="space-y-1">
              <button
                onClick={() => onSelect({ 
                  name: 'Due Today', 
                  query: '', 
                  filters: { 
                    dateRange: { 
                      start: new Date().toISOString().split('T')[0], 
                      end: new Date().toISOString().split('T')[0] 
                    } 
                  } 
                })}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
              >
                <Icon name="Calendar" size={14} className="text-warning" />
                Due Today
              </button>
              
              <button
                onClick={() => onSelect({ 
                  name: 'High Priority', 
                  query: '', 
                  filters: { priority: ['high'] } 
                })}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
              >
                <Icon name="AlertTriangle" size={14} className="text-error" />
                High Priority
              </button>
              
              <button
                onClick={() => onSelect({ 
                  name: 'In Progress', 
                  query: '', 
                  filters: { status: ['in-progress'] } 
                })}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
              >
                <Icon name="Clock" size={14} className="text-warning" />
                In Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;