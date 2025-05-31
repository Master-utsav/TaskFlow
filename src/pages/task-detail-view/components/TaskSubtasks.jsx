import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TaskSubtasks = ({ task, isEditing, onUpdate }) => {
  const [newSubtask, setNewSubtask] = useState('');
  const [subtasks, setSubtasks] = useState(task.subtasks || []);

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      const newSubtaskObj = {
        id: Date.now(),
        title: newSubtask.trim(),
        completed: false
      };
      const updatedSubtasks = [...subtasks, newSubtaskObj];
      setSubtasks(updatedSubtasks);
      onUpdate({ subtasks: updatedSubtasks });
      setNewSubtask('');
    }
  };

  const handleToggleSubtask = (subtaskId) => {
    const updatedSubtasks = subtasks.map(subtask =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );
    setSubtasks(updatedSubtasks);
    onUpdate({ subtasks: updatedSubtasks });
  };

  const handleDeleteSubtask = (subtaskId) => {
    const updatedSubtasks = subtasks.filter(subtask => subtask.id !== subtaskId);
    setSubtasks(updatedSubtasks);
    onUpdate({ subtasks: updatedSubtasks });
  };

  const handleEditSubtask = (subtaskId, newTitle) => {
    const updatedSubtasks = subtasks.map(subtask =>
      subtask.id === subtaskId
        ? { ...subtask, title: newTitle }
        : subtask
    );
    setSubtasks(updatedSubtasks);
    onUpdate({ subtasks: updatedSubtasks });
  };

  const completedCount = subtasks.filter(subtask => subtask.completed).length;
  const completionPercentage = subtasks.length > 0 ? (completedCount / subtasks.length) * 100 : 0;

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="CheckSquare" size={20} className="mr-2" />
          Subtasks
        </h3>
        <div className="text-sm text-text-secondary">
          {completedCount} of {subtasks.length} completed
        </div>
      </div>

      {/* Progress Bar */}
      {subtasks.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Progress</span>
            <span className="text-sm font-medium text-text-primary">
              {Math.round(completionPercentage)}%
            </span>
          </div>
          <div className="w-full bg-surface-light rounded-full h-2">
            <div
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Add New Subtask */}
      <form onSubmit={handleAddSubtask} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            placeholder="Add a new subtask..."
            className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150 micro-interaction"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
      </form>

      {/* Subtasks List */}
      <div className="space-y-3">
        {subtasks.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckSquare" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No subtasks yet</p>
            <p className="text-sm text-text-tertiary mt-1">
              Break down this task into smaller, manageable steps
            </p>
          </div>
        ) : (
          subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              isEditing={isEditing}
              onToggle={() => handleToggleSubtask(subtask.id)}
              onDelete={() => handleDeleteSubtask(subtask.id)}
              onEdit={(newTitle) => handleEditSubtask(subtask.id, newTitle)}
            />
          ))
        )}
      </div>

      {/* Bulk Actions */}
      {subtasks.length > 0 && isEditing && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const updatedSubtasks = subtasks.map(subtask => ({ ...subtask, completed: true }));
                setSubtasks(updatedSubtasks);
                onUpdate({ subtasks: updatedSubtasks });
              }}
              className="text-sm text-success hover:bg-success/20 px-3 py-1 rounded-lg transition-all duration-150"
            >
              Mark All Complete
            </button>
            <button
              onClick={() => {
                const updatedSubtasks = subtasks.map(subtask => ({ ...subtask, completed: false }));
                setSubtasks(updatedSubtasks);
                onUpdate({ subtasks: updatedSubtasks });
              }}
              className="text-sm text-text-secondary hover:bg-surface-light/50 px-3 py-1 rounded-lg transition-all duration-150"
            >
              Mark All Incomplete
            </button>
            <button
              onClick={() => {
                const completedSubtasks = subtasks.filter(subtask => !subtask.completed);
                setSubtasks(completedSubtasks);
                onUpdate({ subtasks: completedSubtasks });
              }}
              className="text-sm text-error hover:bg-error/20 px-3 py-1 rounded-lg transition-all duration-150"
            >
              Remove Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SubtaskItem = ({ subtask, isEditing, onToggle, onDelete, onEdit }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(subtask.title);

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== subtask.title) {
      onEdit(editTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(subtask.title);
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className={`
      flex items-center space-x-3 p-3 bg-background rounded-lg border border-border transition-all duration-150
      ${subtask.completed ? 'opacity-60' : ''}
    `}>
      <button
        onClick={onToggle}
        className={`
          flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150
          ${subtask.completed 
            ? 'bg-success border-success text-white' :'border-border hover:border-primary'
          }
        `}
      >
        {subtask.completed && <Icon name="Check" size={12} />}
      </button>

      <div className="flex-1 min-w-0">
        {isEditingTitle ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none text-text-primary focus:outline-none"
            autoFocus
          />
        ) : (
          <span
            className={`
              text-text-primary cursor-pointer
              ${subtask.completed ? 'line-through' : ''}
            `}
            onClick={() => isEditing && setIsEditingTitle(true)}
          >
            {subtask.title}
          </span>
        )}
      </div>

      {isEditing && (
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsEditingTitle(true)}
            className="p-1 text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded transition-all duration-150"
            title="Edit subtask"
          >
            <Icon name="Edit2" size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-error hover:bg-error/20 rounded transition-all duration-150"
            title="Delete subtask"
          >
            <Icon name="Trash2" size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskSubtasks;