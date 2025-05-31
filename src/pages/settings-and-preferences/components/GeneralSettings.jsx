import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GeneralSettings = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    timezone: 'UTC',
    notifications: {
      desktop: true,
      email: false,
      sound: true,
      taskReminders: true,
      groupUpdates: false
    },
    startOfWeek: 'monday',
    defaultView: 'dashboard'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    onSettingsChange();
  };

  const handleNotificationChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
    onSettingsChange();
  };

  const themeOptions = [
    { value: 'dark', label: 'Dark', description: 'Dark theme for reduced eye strain' },
    { value: 'light', label: 'Light', description: 'Light theme for bright environments' },
    { value: 'auto', label: 'Auto', description: 'Follow system preference' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'it', label: 'Italiano', flag: '🇮🇹' }
  ];

  const dateFormatOptions = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', example: '25/12/2024' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', example: '12/25/2024' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2024-12-25' }
  ];

  const timeFormatOptions = [
    { value: '12h', label: '12 Hour', example: '2:30 PM' },
    { value: '24h', label: '24 Hour', example: '14:30' }
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'EST', label: 'EST (Eastern Standard Time)' },
    { value: 'PST', label: 'PST (Pacific Standard Time)' },
    { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
    { value: 'CET', label: 'CET (Central European Time)' }
  ];

  const startOfWeekOptions = [
    { value: 'sunday', label: 'Sunday' },
    { value: 'monday', label: 'Monday' }
  ];

  const defaultViewOptions = [
    { value: 'dashboard', label: 'Dashboard Overview' },
    { value: 'groups', label: 'Task Groups' },
    { value: 'search', label: 'Search Interface' }
  ];

  return (
    <div className="space-y-8">
      {/* Appearance Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Palette" size={20} />
          Appearance
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Theme
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSettingChange('theme', option.value)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-150 text-left
                    ${settings.theme === option.value
                      ? 'border-primary bg-primary/10' :'border-border hover:border-border-light bg-background'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full ${
                      option.value === 'dark' ? 'bg-slate-800' :
                      option.value === 'light'? 'bg-white border border-gray-300' : 'bg-gradient-to-r from-slate-800 to-white'
                    }`} />
                    <span className="font-medium text-text-primary">{option.label}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Language & Region Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Globe" size={20} />
          Language & Region
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-text-primary mb-2">
              Language
            </label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.flag} {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-text-primary mb-2">
              Timezone
            </label>
            <select
              id="timezone"
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {timezoneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateFormat" className="block text-sm font-medium text-text-primary mb-2">
              Date Format
            </label>
            <select
              id="dateFormat"
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {dateFormatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.example})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timeFormat" className="block text-sm font-medium text-text-primary mb-2">
              Time Format
            </label>
            <select
              id="timeFormat"
              value={settings.timeFormat}
              onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {timeFormatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.example})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Bell" size={20} />
          Notifications
        </h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <h4 className="font-medium text-text-primary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-text-secondary">
                  {key === 'desktop' && 'Show desktop notifications for important updates'}
                  {key === 'email' && 'Receive email notifications for task reminders'}
                  {key === 'sound' && 'Play sound for notifications'}
                  {key === 'taskReminders' && 'Get notified about upcoming task deadlines'}
                  {key === 'groupUpdates' && 'Receive notifications when group tasks are updated'}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(key, !value)}
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

      {/* General Preferences Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Settings" size={20} />
          General Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startOfWeek" className="block text-sm font-medium text-text-primary mb-2">
              Start of Week
            </label>
            <select
              id="startOfWeek"
              value={settings.startOfWeek}
              onChange={(e) => handleSettingChange('startOfWeek', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {startOfWeekOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="defaultView" className="block text-sm font-medium text-text-primary mb-2">
              Default View
            </label>
            <select
              id="defaultView"
              value={settings.defaultView}
              onChange={(e) => handleSettingChange('defaultView', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {defaultViewOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;