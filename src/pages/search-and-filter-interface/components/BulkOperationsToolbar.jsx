import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkOperationsToolbar = ({ 
  selectedCount, 
  totalCount, 
  onSelectAll, 
  onBulkAction, 
  onClearSelection 
}) => {
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  const bulkActions = [
    { id: 'mark-completed', label: 'Mark as Completed', icon: 'CheckCircle2', color: 'text-success' },
    { id: 'mark-in-progress', label: 'Mark as In Progress', icon: 'Clock', color: 'text-warning' },
    { id: 'mark-todo', label: 'Mark as To Do', icon: 'Circle', color: 'text-text-secondary' },
    { id: 'change-priority-high', label: 'Set High Priority', icon: 'AlertTriangle', color: 'text-error' },
    { id: 'change-priority-medium', label: 'Set Medium Priority', icon: 'Minus', color: 'text-warning' },
    { id: 'change-priority-low', label: 'Set Low Priority', icon: 'ArrowDown', color: 'text-success' },
    { id: 'move-to-group', label: 'Move to Group', icon: 'FolderOpen', color: 'text-primary' },
    { id: 'add-tags', label: 'Add Tags', icon: 'Tag', color: 'text-accent' },
    { id: 'duplicate', label: 'Duplicate Tasks', icon: 'Copy', color: 'text-text-primary' },
    { id: 'export', label: 'Export Selected', icon: 'Download', color: 'text-text-primary' },
    { id: 'delete', label: 'Delete Tasks', icon: 'Trash2', color: 'text-error' }
  ];

  const handleActionClick = (actionId) => {
    onBulkAction(actionId);
    setIsActionsMenuOpen(false);
  };

  const handleBackdropClick = () => {
    setIsActionsMenuOpen(false);
  };

  return (
    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCount === totalCount && totalCount > 0}
              onChange={onSelectAll}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/50"
            />
            <span className="text-sm font-medium text-text-primary">
              {selectedCount} of {totalCount} selected
            </span>
          </div>

          {selectedCount > 0 && (
            <button
              onClick={onClearSelection}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              Clear selection
            </button>
          )}
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150 micro-interaction"
              >
                <Icon name="Settings" size={16} />
                <span>Bulk Actions</span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`transition-transform duration-150 ${
                    isActionsMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isActionsMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[950]"
                    onClick={handleBackdropClick}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg z-[990] max-h-80 overflow-y-auto">
                    <div className="py-2">
                      {/* Status Actions */}
                      <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide border-b border-border">
                        Status
                      </div>
                      {bulkActions.slice(0, 3).map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleActionClick(action.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-primary hover:bg-surface-light/50 transition-all duration-150"
                        >
                          <Icon name={action.icon} size={16} className={action.color} />
                          {action.label}
                        </button>
                      ))}

                      {/* Priority Actions */}
                      <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide border-b border-border mt-2">
                        Priority
                      </div>
                      {bulkActions.slice(3, 6).map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleActionClick(action.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-primary hover:bg-surface-light/50 transition-all duration-150"
                        >
                          <Icon name={action.icon} size={16} className={action.color} />
                          {action.label}
                        </button>
                      ))}

                      {/* Other Actions */}
                      <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide border-b border-border mt-2">
                        Other Actions
                      </div>
                      {bulkActions.slice(6).map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleActionClick(action.id)}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2 text-sm transition-all duration-150
                            ${action.id === 'delete' 
                              ? 'text-error hover:bg-error/10' :'text-text-primary hover:bg-surface-light/50'
                            }
                          `}
                        >
                          <Icon name={action.icon} size={16} className={action.color} />
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Actions */}
            <button
              onClick={() => handleActionClick('mark-completed')}
              className="p-2 rounded-lg text-success hover:bg-success/10 transition-all duration-150"
              title="Mark as completed"
            >
              <Icon name="CheckCircle2" size={16} />
            </button>

            <button
              onClick={() => handleActionClick('delete')}
              className="p-2 rounded-lg text-error hover:bg-error/10 transition-all duration-150"
              title="Delete selected"
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Selection Summary */}
      {selectedCount > 0 && (
        <div className="mt-3 pt-3 border-t border-primary/20">
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span>Selected tasks will be affected by bulk actions</span>
            <div className="flex items-center gap-2">
              <Icon name="Info" size={14} />
              <span>Actions are reversible</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkOperationsToolbar;