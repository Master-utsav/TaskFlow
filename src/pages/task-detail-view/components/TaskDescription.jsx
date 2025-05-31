import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TaskDescription = ({ task, isEditing, onUpdate }) => {
  const [description, setDescription] = useState(task.description);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    onUpdate({ description: e.target.value });
  };

  const formatDescription = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.substring(1).trim()}
          </li>
        );
      }
      return line ? (
        <p key={index} className="mb-3">
          {line}
        </p>
      ) : (
        <br key={index} />
      );
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="FileText" size={20} className="mr-2" />
          Description
        </h3>
        {isEditing && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`
                px-3 py-1 text-sm rounded-lg transition-all duration-150
                ${isPreviewMode 
                  ? 'bg-primary/20 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-light/50'
                }
              `}
            >
              {isPreviewMode ? 'Edit' : 'Preview'}
            </button>
          </div>
        )}
      </div>

      {isEditing && !isPreviewMode ? (
        <div className="space-y-4">
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            rows={12}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150 resize-none font-mono text-sm"
            placeholder="Enter task description...

Use bullet points with • for lists
Leave blank lines for paragraphs"
          />
          <div className="text-xs text-text-secondary">
            <p className="mb-1">Formatting tips:</p>
            <ul className="space-y-1 ml-4">
              <li>• Use bullet points with • symbol</li>
              <li>• Leave blank lines between paragraphs</li>
              <li>• Use Preview to see formatted output</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="prose prose-lg max-w-none text-text-primary">
          {description ? (
            <div className="space-y-2">
              {formatDescription(description)}
            </div>
          ) : (
            <p className="text-text-secondary italic">No description provided.</p>
          )}
        </div>
      )}

      {/* Dependencies Section */}
      {task.dependencies && task.dependencies.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-md font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="GitBranch" size={18} className="mr-2" />
            Dependencies
          </h4>
          <div className="space-y-3">
            {task.dependencies.map((dep) => (
              <div
                key={dep.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name={dep.status === 'completed' ? 'CheckCircle2' : 'Circle'}
                    size={16}
                    className={dep.status === 'completed' ? 'text-success' : 'text-text-secondary'}
                  />
                  <span className="text-text-primary">{dep.title}</span>
                </div>
                <span className={`
                  px-2 py-1 text-xs rounded-full font-medium
                  ${dep.status === 'completed' 
                    ? 'bg-success/20 text-success' :'bg-warning/20 text-warning'
                  }
                `}>
                  {dep.status === 'in-progress' ? 'In Progress' : 
                   dep.status.charAt(0).toUpperCase() + dep.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time Tracking Section */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-md font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Timer" size={18} className="mr-2" />
          Time Tracking
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Time Spent</span>
              <Icon name="Clock" size={16} className="text-text-secondary" />
            </div>
            <div className="text-xl font-semibold text-text-primary">
              {Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m
            </div>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Estimated Time</span>
              <Icon name="Target" size={16} className="text-text-secondary" />
            </div>
            <div className="text-xl font-semibold text-text-primary">
              {Math.floor(task.estimatedTime / 60)}h {task.estimatedTime % 60}m
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Progress</span>
            <span className="text-sm font-medium text-text-primary">
              {Math.round((task.timeSpent / task.estimatedTime) * 100)}%
            </span>
          </div>
          <div className="w-full bg-surface-light rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((task.timeSpent / task.estimatedTime) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDescription;