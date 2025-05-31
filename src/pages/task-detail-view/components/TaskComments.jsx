import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TaskComments = ({ task, onUpdate }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(task.comments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    const comment = {
      id: Date.now(),
      author: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: newComment.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    onUpdate({ comments: updatedComments });
    setNewComment('');
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    onUpdate({ comments: updatedComments });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2" />
          Comments
        </h3>
        <span className="text-sm text-text-secondary">
          {comments.length} comment{comments.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex-shrink-0">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Your avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full flex items-center justify-center text-white font-medium text-sm" style={{ display: 'none' }}>
              JD
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150 resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-text-secondary">
                Press Ctrl+Enter to submit
              </div>
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${newComment.trim() && !isSubmitting
                    ? 'bg-primary text-white hover:bg-primary-600 micro-interaction' :'bg-surface-light text-text-secondary cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Posting...</span>
                  </div>
                ) : (
                  'Post Comment'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No comments yet</p>
            <p className="text-sm text-text-tertiary mt-1">
              Start the conversation by adding the first comment
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={() => handleDeleteComment(comment.id)}
              formatTimestamp={formatTimestamp}
            />
          ))
        )}
      </div>

      {/* Comment Guidelines */}
      {comments.length === 0 && (
        <div className="mt-6 p-4 bg-background rounded-lg border border-border">
          <h4 className="text-sm font-medium text-text-primary mb-2">Comment Guidelines</h4>
          <ul className="text-xs text-text-secondary space-y-1">
            <li>• Keep comments relevant to the task</li>
            <li>• Be respectful and constructive</li>
            <li>• Use @mentions to notify team members</li>
            <li>• Add updates on progress or blockers</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const CommentItem = ({ comment, onDelete, formatTimestamp }) => {
  const [showActions, setShowActions] = useState(false);
  const isOwnComment = comment.author === 'John Doe';

  return (
    <div
      className="flex space-x-3 p-4 bg-background rounded-lg border border-border hover:border-border-light transition-all duration-150"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex-shrink-0">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="w-full h-full flex items-center justify-center text-white font-medium text-sm" style={{ display: 'none' }}>
          {comment.author.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">
              {comment.author}
            </span>
            <span className="text-xs text-text-secondary">
              {formatTimestamp(comment.timestamp)}
            </span>
          </div>
          
          {showActions && isOwnComment && (
            <div className="flex items-center space-x-1">
              <button
                className="p-1 text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded transition-all duration-150"
                title="Edit comment"
              >
                <Icon name="Edit2" size={14} />
              </button>
              <button
                onClick={onDelete}
                className="p-1 text-error hover:bg-error/20 rounded transition-all duration-150"
                title="Delete comment"
              >
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          )}
        </div>
        
        <div className="text-text-primary text-sm leading-relaxed">
          {comment.content}
        </div>
        
        <div className="flex items-center space-x-4 mt-2">
          <button className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-150">
            Reply
          </button>
          <button className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-150">
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskComments;