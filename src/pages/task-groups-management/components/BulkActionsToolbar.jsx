import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActionsToolbar = ({ selectedCount, onDelete, onClearSelection }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleMergeGroups = () => {
    console.log('Merge groups functionality');
    // This would open a merge groups modal
  };

  const handleArchiveGroups = () => {
    console.log('Archive groups functionality');
    // This would archive selected groups
  };

  const handleExportGroups = () => {
    console.log('Export groups functionality');
    // This would export selected groups data
  };

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-text-primary">
              {selectedCount} group{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="h-4 w-px bg-border" />
          
          <div className="flex items-center gap-2">
            {/* Merge Groups */}
            <button
              onClick={handleMergeGroups}
              disabled={selectedCount < 2}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Merge selected groups"
            >
              <Icon name="Merge" size={16} />
              Merge
            </button>

            {/* Archive Groups */}
            <button
              onClick={handleArchiveGroups}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
              title="Archive selected groups"
            >
              <Icon name="Archive" size={16} />
              Archive
            </button>

            {/* Export Groups */}
            <button
              onClick={handleExportGroups}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
              title="Export selected groups"
            >
              <Icon name="Download" size={16} />
              Export
            </button>

            {/* Delete Groups */}
            {!showDeleteConfirm ? (
              <button
                onClick={handleDeleteClick}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-error hover:bg-error/10 rounded-lg transition-all duration-150"
                title="Delete selected groups"
              >
                <Icon name="Trash2" size={16} />
                Delete
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-error">Delete {selectedCount} group{selectedCount !== 1 ? 's' : ''}?</span>
                <button
                  onClick={handleConfirmDelete}
                  className="px-3 py-1.5 text-sm bg-error text-white rounded-lg hover:bg-error/90 transition-all duration-150"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-all duration-150"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Clear Selection */}
        <button
          onClick={onClearSelection}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
          title="Clear selection"
        >
          <Icon name="X" size={16} />
          Clear
        </button>
      </div>

      {/* Additional Actions Row */}
      <div className="mt-3 pt-3 border-t border-primary/20">
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <span>Quick actions:</span>
          <button
            onClick={() => console.log('Select all visible')}
            className="hover:text-text-primary transition-colors duration-150"
          >
            Select all visible
          </button>
          <button
            onClick={() => console.log('Select completed')}
            className="hover:text-text-primary transition-colors duration-150"
          >
            Select completed
          </button>
          <button
            onClick={() => console.log('Select in progress')}
            className="hover:text-text-primary transition-colors duration-150"
          >
            Select in progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;