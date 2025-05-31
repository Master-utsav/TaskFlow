import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const CreateGroupModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: '#3B82F6'
  });
  const [errors, setErrors] = useState({});

  const colorOptions = [
    { color: '#3B82F6', name: 'Blue' },
    { color: '#10B981', name: 'Green' },
    { color: '#F59E0B', name: 'Amber' },
    { color: '#EF4444', name: 'Red' },
    { color: '#6366F1', name: 'Indigo' },
    { color: '#8B5CF6', name: 'Purple' },
    { color: '#EC4899', name: 'Pink' },
    { color: '#06B6D4', name: 'Cyan' }
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        color: '#3B82F6'
      });
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Group title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Group title must be at least 2 characters';
    }
    
    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCreateGroup({
        title: formData.title.trim(),
        description: formData.description.trim(),
        color: formData.color
      });
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="modal-content w-full max-w-md mx-4 animate-scale-in">
        <div className="bg-surface rounded-lg shadow-lg border border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-text-primary">Create New Group</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
                Group Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`
                  w-full px-3 py-2 bg-background border rounded-lg text-text-primary placeholder-text-secondary 
                  focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-150
                  ${errors.title ? 'border-error focus:border-error focus:ring-error/50' : 'border-border focus:border-primary/50'}
                `}
                placeholder="Enter group title..."
                maxLength={50}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-error flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.title}
                </p>
              )}
              <p className="mt-1 text-xs text-text-tertiary">
                {formData.title.length}/50 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={`
                  w-full px-3 py-2 bg-background border rounded-lg text-text-primary placeholder-text-secondary 
                  focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-150 resize-none
                  ${errors.description ? 'border-error focus:border-error focus:ring-error/50' : 'border-border focus:border-primary/50'}
                `}
                placeholder="Enter group description..."
                maxLength={200}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-error flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.description}
                </p>
              )}
              <p className="mt-1 text-xs text-text-tertiary">
                {formData.description.length}/200 characters
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Group Color
              </label>
              <div className="grid grid-cols-4 gap-3">
                {colorOptions.map(({ color, name }) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`
                      relative w-full h-12 rounded-lg border-2 transition-all duration-150 hover:scale-105
                      ${formData.color === color ? 'border-text-primary' : 'border-transparent'}
                    `}
                    style={{ backgroundColor: color }}
                    title={name}
                  >
                    {formData.color === color && (
                      <Icon name="Check" size={20} className="text-white absolute inset-0 m-auto" />
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-text-tertiary">
                Selected: {colorOptions.find(opt => opt.color === formData.color)?.name}
              </p>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Preview
              </label>
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: formData.color }}
                  >
                    <Icon name="FolderOpen" size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary">
                      {formData.title || 'Group Title'}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {formData.description || 'Group description will appear here...'}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-text-tertiary">
                      <span>0 tasks</span>
                      <span>•</span>
                      <span>0% complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-background/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.title.trim()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 micro-interaction"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;