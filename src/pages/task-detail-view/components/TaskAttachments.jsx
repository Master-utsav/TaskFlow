import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';

const TaskAttachments = ({ task, isEditing, onUpdate }) => {
  const [attachments, setAttachments] = useState(task.attachments || []);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const newAttachments = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileType(file.name),
      url: URL.createObjectURL(file),
      file: file
    }));

    const updatedAttachments = [...attachments, ...newAttachments];
    setAttachments(updatedAttachments);
    onUpdate({ attachments: updatedAttachments });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!isEditing) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isEditing) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
    e.target.value = '';
  };

  const handleDeleteAttachment = (attachmentId) => {
    const updatedAttachments = attachments.filter(attachment => attachment.id !== attachmentId);
    setAttachments(updatedAttachments);
    onUpdate({ attachments: updatedAttachments });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    const typeMap = {
      pdf: 'pdf',
      doc: 'document',
      docx: 'document',
      txt: 'document',
      jpg: 'image',
      jpeg: 'image',
      png: 'image',
      gif: 'image',
      svg: 'image',
      mp4: 'video',
      avi: 'video',
      mov: 'video',
      mp3: 'audio',
      wav: 'audio',
      zip: 'archive',
      rar: 'archive',
      '7z': 'archive',
      fig: 'figma',
      sketch: 'design'
    };
    return typeMap[extension] || 'file';
  };

  const getFileIcon = (type) => {
    const iconMap = {
      pdf: 'FileText',
      document: 'FileText',
      image: 'Image',
      video: 'Video',
      audio: 'Music',
      archive: 'Archive',
      figma: 'Figma',
      design: 'Palette',
      file: 'File'
    };
    return iconMap[type] || 'File';
  };

  const getFileColor = (type) => {
    const colorMap = {
      pdf: 'text-error',
      document: 'text-primary',
      image: 'text-success',
      video: 'text-secondary',
      audio: 'text-warning',
      archive: 'text-text-secondary',
      figma: 'text-accent',
      design: 'text-accent',
      file: 'text-text-secondary'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Paperclip" size={20} className="mr-2" />
          Attachments
        </h3>
        <span className="text-sm text-text-secondary">
          {attachments.length} file{attachments.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Upload Area */}
      {isEditing && (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 mb-6 transition-all duration-150
            ${isDragOver 
              ? 'border-primary bg-primary/10' :'border-border hover:border-border-light bg-background'
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center">
            <Icon 
              name="Upload" 
              size={32} 
              className={`mx-auto mb-3 ${isDragOver ? 'text-primary' : 'text-text-secondary'}`} 
            />
            <p className={`text-sm font-medium mb-1 ${isDragOver ? 'text-primary' : 'text-text-primary'}`}>
              {isDragOver ? 'Drop files here' : 'Drag and drop files here'}
            </p>
            <p className="text-xs text-text-secondary">
              or click to browse • Max 10MB per file
            </p>
          </div>
        </div>
      )}

      {/* Attachments List */}
      <div className="space-y-3">
        {attachments.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Paperclip" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No attachments</p>
            <p className="text-sm text-text-tertiary mt-1">
              {isEditing ? 'Upload files to share with your team' : 'No files have been attached to this task'}
            </p>
          </div>
        ) : (
          attachments.map((attachment) => (
            <AttachmentItem
              key={attachment.id}
              attachment={attachment}
              isEditing={isEditing}
              onDelete={() => handleDeleteAttachment(attachment.id)}
              getFileIcon={getFileIcon}
              getFileColor={getFileColor}
            />
          ))
        )}
      </div>

      {/* File Type Guidelines */}
      {isEditing && attachments.length === 0 && (
        <div className="mt-6 p-4 bg-background rounded-lg border border-border">
          <h4 className="text-sm font-medium text-text-primary mb-2">Supported File Types</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary">
            <div>
              <span className="font-medium">Documents:</span> PDF, DOC, TXT
            </div>
            <div>
              <span className="font-medium">Images:</span> JPG, PNG, GIF, SVG
            </div>
            <div>
              <span className="font-medium">Design:</span> FIG, SKETCH
            </div>
            <div>
              <span className="font-medium">Archives:</span> ZIP, RAR, 7Z
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AttachmentItem = ({ attachment, isEditing, onDelete, getFileIcon, getFileColor }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      if (attachment.url.startsWith('blob:')) {
        // For uploaded files
        const link = document.createElement('a');
        link.href = attachment.url;
        link.download = attachment.name;
        link.click();
      } else {
        // For existing files (mock)
        console.log('Downloading:', attachment.name);
      }
      setIsDownloading(false);
    }, 1000);
  };

  const handlePreview = () => {
    if (attachment.type === 'image') {
      window.open(attachment.url, '_blank');
    } else {
      console.log('Preview not available for this file type');
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border hover:border-border-light transition-all duration-150 group">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-surface ${getFileColor(attachment.type)}`}>
        <Icon name={getFileIcon(attachment.type)} size={20} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-text-primary font-medium truncate">
            {attachment.name}
          </span>
          {attachment.type === 'image' && (
            <button
              onClick={handlePreview}
              className="text-xs text-primary hover:underline"
            >
              Preview
            </button>
          )}
        </div>
        <div className="text-sm text-text-secondary">
          {attachment.size}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-lg transition-all duration-150"
          title="Download"
        >
          {isDownloading ? (
            <div className="w-4 h-4 border-2 border-text-secondary/30 border-t-text-secondary rounded-full animate-spin" />
          ) : (
            <Icon name="Download" size={16} />
          )}
        </button>
        
        {isEditing && (
          <button
            onClick={onDelete}
            className="p-2 text-error hover:bg-error/20 rounded-lg transition-all duration-150"
            title="Delete"
          >
            <Icon name="Trash2" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskAttachments;