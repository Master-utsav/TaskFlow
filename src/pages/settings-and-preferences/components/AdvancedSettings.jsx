import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AdvancedSettings = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      screenReader: false,
      fontSize: 'medium',
      keyboardNavigation: true
    },
    performance: {
      animations: true,
      autoSave: true,
      autoSaveInterval: '30',
      lazyLoading: true,
      cacheSize: '50'
    },
    integrations: {
      calendar: false,
      email: false,
      notifications: true,
      webhooks: false
    },
    developer: {
      debugMode: false,
      apiLogging: false,
      experimentalFeatures: false,
      betaUpdates: false
    },
    privacy: {
      analytics: false,
      crashReporting: true,
      usageStats: false,
      dataSharing: false
    }
  });

  const handleNestedSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    onSettingsChange();
  };

  const fontSizeOptions = [
    { value: 'small', label: 'Small', description: '14px base size' },
    { value: 'medium', label: 'Medium', description: '16px base size' },
    { value: 'large', label: 'Large', description: '18px base size' },
    { value: 'extra-large', label: 'Extra Large', description: '20px base size' }
  ];

  const autoSaveIntervalOptions = [
    { value: '10', label: '10 seconds' },
    { value: '30', label: '30 seconds' },
    { value: '60', label: '1 minute' },
    { value: '300', label: '5 minutes' },
    { value: '600', label: '10 minutes' }
  ];

  const cacheSizeOptions = [
    { value: '25', label: '25 MB' },
    { value: '50', label: '50 MB' },
    { value: '100', label: '100 MB' },
    { value: '200', label: '200 MB' }
  ];

  const handleResetSection = (section) => {
    const confirmReset = window.confirm(`Are you sure you want to reset all ${section} settings to their default values?`);
    if (confirmReset) {
      // Reset to default values for the section
      const defaultSettings = {
        accessibility: {
          highContrast: false,
          reducedMotion: false,
          screenReader: false,
          fontSize: 'medium',
          keyboardNavigation: true
        },
        performance: {
          animations: true,
          autoSave: true,
          autoSaveInterval: '30',
          lazyLoading: true,
          cacheSize: '50'
        },
        integrations: {
          calendar: false,
          email: false,
          notifications: true,
          webhooks: false
        },
        developer: {
          debugMode: false,
          apiLogging: false,
          experimentalFeatures: false,
          betaUpdates: false
        },
        privacy: {
          analytics: false,
          crashReporting: true,
          usageStats: false,
          dataSharing: false
        }
      };

      setSettings(prev => ({
        ...prev,
        [section]: defaultSettings[section]
      }));
      onSettingsChange();
    }
  };

  const handleClearCache = () => {
    const confirmClear = window.confirm('Are you sure you want to clear the application cache? This may temporarily slow down the app while it rebuilds the cache.');
    if (confirmClear) {
      console.log('Clearing application cache...');
      alert('Cache cleared successfully!');
    }
  };

  const handleExportLogs = () => {
    const mockLogs = `[2024-01-15 10:30:00] INFO: Application started
[2024-01-15 10:30:01] DEBUG: Loading user preferences
[2024-01-15 10:30:02] INFO: Tasks loaded successfully
[2024-01-15 10:31:00] DEBUG: Auto-save triggered
[2024-01-15 10:31:01] INFO: Data saved to local storage`;

    const dataBlob = new Blob([mockLogs], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow-logs-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Accessibility Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Icon name="Eye" size={20} />
            Accessibility
          </h3>
          <button
            onClick={() => handleResetSection('accessibility')}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Reset to defaults
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">High Contrast Mode</h4>
              <p className="text-sm text-text-secondary">Increase contrast for better visibility</p>
            </div>
            <button
              onClick={() => handleNestedSettingChange('accessibility', 'highContrast', !settings.accessibility.highContrast)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.accessibility.highContrast ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Reduced Motion</h4>
              <p className="text-sm text-text-secondary">Minimize animations and transitions</p>
            </div>
            <button
              onClick={() => handleNestedSettingChange('accessibility', 'reducedMotion', !settings.accessibility.reducedMotion)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.accessibility.reducedMotion ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.accessibility.reducedMotion ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Screen Reader Support</h4>
              <p className="text-sm text-text-secondary">Enhanced support for screen readers</p>
            </div>
            <button
              onClick={() => handleNestedSettingChange('accessibility', 'screenReader', !settings.accessibility.screenReader)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.accessibility.screenReader ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.accessibility.screenReader ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div>
            <label htmlFor="fontSize" className="block text-sm font-medium text-text-primary mb-2">
              Font Size
            </label>
            <select
              id="fontSize"
              value={settings.accessibility.fontSize}
              onChange={(e) => handleNestedSettingChange('accessibility', 'fontSize', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {fontSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Icon name="Zap" size={20} />
            Performance
          </h3>
          <button
            onClick={() => handleResetSection('performance')}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Reset to defaults
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Enable Animations</h4>
              <p className="text-sm text-text-secondary">Show smooth transitions and animations</p>
            </div>
            <button
              onClick={() => handleNestedSettingChange('performance', 'animations', !settings.performance.animations)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.performance.animations ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.performance.animations ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Auto-save</h4>
              <p className="text-sm text-text-secondary">Automatically save changes as you work</p>
            </div>
            <button
              onClick={() => handleNestedSettingChange('performance', 'autoSave', !settings.performance.autoSave)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.performance.autoSave ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.performance.autoSave ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div>
            <label htmlFor="autoSaveInterval" className="block text-sm font-medium text-text-primary mb-2">
              Auto-save Interval
            </label>
            <select
              id="autoSaveInterval"
              value={settings.performance.autoSaveInterval}
              onChange={(e) => handleNestedSettingChange('performance', 'autoSaveInterval', e.target.value)}
              disabled={!settings.performance.autoSave}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150 disabled:opacity-50"
            >
              {autoSaveIntervalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Lazy Loading</h4>
              <p className="text-sm text-text-secondary">Load content as needed to improve performance</p>
            </div>
            <button
              onClick={() => handleNestedSettingChange('performance', 'lazyLoading', !settings.performance.lazyLoading)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.performance.lazyLoading ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.performance.lazyLoading ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cacheSize" className="block text-sm font-medium text-text-primary mb-2">
                Cache Size
              </label>
              <select
                id="cacheSize"
                value={settings.performance.cacheSize}
                onChange={(e) => handleNestedSettingChange('performance', 'cacheSize', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
              >
                {cacheSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleClearCache}
                className="w-full px-4 py-2 bg-warning/20 text-warning rounded-lg hover:bg-warning/30 transition-all duration-150 flex items-center justify-center gap-2"
              >
                <Icon name="Trash2" size={16} />
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Icon name="Link" size={20} />
            Integrations
          </h3>
          <button
            onClick={() => handleResetSection('integrations')}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Reset to defaults
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(settings.integrations).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <h4 className="font-medium text-text-primary capitalize">
                  {key === 'webhooks' ? 'Webhooks' : key} Integration
                </h4>
                <p className="text-sm text-text-secondary">
                  {key === 'calendar' && 'Sync tasks with your calendar application'}
                  {key === 'email' && 'Send task reminders via email'}
                  {key === 'notifications' && 'Enable system notifications'}
                  {key === 'webhooks' && 'Send task updates to external services'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {(key === 'calendar' || key === 'email' || key === 'webhooks') && (
                  <span className="text-xs text-text-secondary bg-warning/20 text-warning px-2 py-1 rounded">
                    Coming Soon
                  </span>
                )}
                <button
                  onClick={() => handleNestedSettingChange('integrations', key, !value)}
                  disabled={key === 'calendar' || key === 'email' || key === 'webhooks'}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150 disabled:opacity-50
                    ${value ? 'bg-primary' : 'bg-border'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                      ${value ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Options Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Icon name="Code" size={20} />
            Developer Options
          </h3>
          <button
            onClick={() => handleResetSection('developer')}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Reset to defaults
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(settings.developer).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <h4 className="font-medium text-text-primary">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-text-secondary">
                  {key === 'debugMode' && 'Enable debug mode for troubleshooting'}
                  {key === 'apiLogging' && 'Log API requests and responses'}
                  {key === 'experimentalFeatures' && 'Enable experimental features (may be unstable)'}
                  {key === 'betaUpdates' && 'Receive beta updates before general release'}
                </p>
              </div>
              <button
                onClick={() => handleNestedSettingChange('developer', key, !value)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                  ${value ? 'bg-primary' : 'bg-border'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                    ${value ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Export Debug Logs</h4>
              <p className="text-sm text-text-secondary">Download application logs for troubleshooting</p>
            </div>
            <button
              onClick={handleExportLogs}
              className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all duration-150 flex items-center gap-2"
            >
              <Icon name="Download" size={16} />
              Export Logs
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Icon name="Shield" size={20} />
            Privacy
          </h3>
          <button
            onClick={() => handleResetSection('privacy')}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Reset to defaults
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(settings.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <h4 className="font-medium text-text-primary">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-text-secondary">
                  {key === 'analytics' && 'Share anonymous usage analytics to help improve the app'}
                  {key === 'crashReporting' && 'Automatically report crashes to help fix bugs'}
                  {key === 'usageStats' && 'Collect usage statistics for feature improvement'}
                  {key === 'dataSharing' && 'Allow sharing of anonymized data with third parties'}
                </p>
              </div>
              <button
                onClick={() => handleNestedSettingChange('privacy', key, !value)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                  ${value ? 'bg-primary' : 'bg-border'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                    ${value ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;