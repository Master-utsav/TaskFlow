import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GroupsList = ({
  groups,
  selectedGroup,
  selectedGroups,
  onGroupSelect,
  onGroupToggleSelect,
  onDeleteGroup,
  onDuplicateGroup,
  onUpdateGroup
}) => {
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [draggedGroup, setDraggedGroup] = useState(null);
  const [dragOverGroup, setDragOverGroup] = useState(null);

  const handleEditStart = (group) => {
    setEditingGroupId(group.id);
    setEditingTitle(group.title);
  };

  const handleEditSave = (group) => {
    if (editingTitle.trim() && editingTitle !== group.title) {
      onUpdateGroup({
        ...group,
        title: editingTitle.trim(),
        lastModified: new Date().toISOString().split('T')[0]
      });
    }
    setEditingGroupId(null);
    setEditingTitle('');
  };

  const handleEditCancel = () => {
    setEditingGroupId(null);
    setEditingTitle('');
  };

  const handleKeyPress = (e, group) => {
    if (e.key === 'Enter') {
      handleEditSave(group);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleDragStart = (e, group) => {
    setDraggedGroup(group);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, group) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverGroup(group);
  };

  const handleDragLeave = () => {
    setDragOverGroup(null);
  };

  const handleDrop = (e, targetGroup) => {
    e.preventDefault();
    setDragOverGroup(null);
    
    if (draggedGroup && draggedGroup.id !== targetGroup.id) {
      // Here you would implement the reordering logic
      console.log('Reorder groups:', draggedGroup.title, 'to position of', targetGroup.title);
    }
    setDraggedGroup(null);
  };

  const getCompletionPercentage = (group) => {
    if (group.taskCount === 0) return 0;
    return Math.round((group.completedTasks / group.taskCount) * 100);
  };

  const getStatusColor = (group) => {
    const percentage = getCompletionPercentage(group);
    if (percentage === 100) return 'text-success';
    if (percentage > 0) return 'text-warning';
    return 'text-text-secondary';
  };

  if (groups.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="FolderOpen" size={48} className="text-text-secondary mx-auto mb-3" />
        <p className="text-text-secondary">No groups found</p>
        <p className="text-sm text-text-tertiary mt-1">
          Try adjusting your search or create a new group
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <div
          key={group.id}
          draggable
          onDragStart={(e) => handleDragStart(e, group)}
          onDragOver={(e) => handleDragOver(e, group)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, group)}
          className={`
            group relative p-4 rounded-lg border transition-all duration-150 cursor-pointer
            ${selectedGroup?.id === group.id
              ? 'bg-primary/10 border-primary' :'bg-background border-border hover:border-border-light'
            }
            ${dragOverGroup?.id === group.id ? 'border-primary border-2' : ''}
            ${draggedGroup?.id === group.id ? 'opacity-50' : ''}
          `}
          onClick={() => onGroupSelect(group)}
        >
          {/* Selection Checkbox */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onGroupToggleSelect(group.id);
              }}
              className={`
                w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150
                ${selectedGroups.includes(group.id)
                  ? 'bg-primary border-primary' :'border-border hover:border-primary'
                }
              `}
            >
              {selectedGroups.includes(group.id) && (
                <Icon name="Check" size={12} className="text-white" />
              )}
            </button>
          </div>

          {/* Group Color Indicator */}
          <div
            className="w-1 h-8 rounded-full absolute left-0 top-4"
            style={{ backgroundColor: group.color }}
          />

          {/* Group Content */}
          <div className="ml-4">
            {/* Title */}
            <div className="flex items-center justify-between mb-2">
              {editingGroupId === group.id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={() => handleEditSave(group)}
                  onKeyPress={(e) => handleKeyPress(e, group)}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 px-2 py-1 bg-surface border border-border rounded text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
              ) : (
                <h3
                  className="font-medium text-text-primary group-hover:text-primary transition-colors duration-150"
                  onDoubleClick={() => handleEditStart(group)}
                >
                  {group.title}
                </h3>
              )}
              
              {/* Quick Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditStart(group);
                  }}
                  className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-150"
                  title="Edit group"
                >
                  <Icon name="Edit2" size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateGroup(group);
                  }}
                  className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-150"
                  title="Duplicate group"
                >
                  <Icon name="Copy" size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteGroup(group.id);
                  }}
                  className="p-1 text-text-secondary hover:text-error transition-colors duration-150"
                  title="Delete group"
                >
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {group.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-text-secondary">
                  {group.taskCount} task{group.taskCount !== 1 ? 's' : ''}
                </span>
                <span className={getStatusColor(group)}>
                  {getCompletionPercentage(group)}% complete
                </span>
              </div>
              
              {/* Members */}
              <div className="flex items-center gap-1">
                {group.members.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-xs text-white font-medium"
                    title={member}
                  >
                    {member.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
                {group.members.length > 3 && (
                  <div className="w-6 h-6 bg-surface-light rounded-full flex items-center justify-center text-xs text-text-secondary">
                    +{group.members.length - 3}
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${getCompletionPercentage(group)}%`,
                    backgroundColor: group.color
                  }}
                />
              </div>
            </div>
          </div>

          {/* Drag Handle */}
          <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <Icon name="GripVertical" size={16} className="text-text-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupsList;