import React from 'react';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/dashboard-overview';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <Icon name="AlertTriangle" size={64} className="text-warning mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-text-primary mb-2">404</h1>
          <h2 className="text-xl font-semibold text-text-secondary mb-4">Page Not Found</h2>
          <p className="text-text-tertiary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <button
          onClick={handleGoHome}
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150 micro-interaction"
        >
          <Icon name="Home" size={20} className="mr-2" />
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;