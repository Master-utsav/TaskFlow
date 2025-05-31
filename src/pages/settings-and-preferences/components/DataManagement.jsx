import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DataManagement = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    syncEnabled: false,
    storageLocation: 'local',
    dataRetention: '1year',
    exportFormat: 'json'
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [lastBackup, setLastBackup] = useState('2024-01-15T10:30:00Z');

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    onSettingsChange();
  };

  const handleExportData = async (format) => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData = {
        tasks: [
          { id: 1, title: 'Complete project documentation', status: 'in-progress', priority: 'high' },
          { id: 2, title: 'Review team feedback', status: 'todo', priority: 'medium' }
        ],
        groups: [
          { id: 1, name: 'Work Projects', taskCount: 5 },
          { id: 2, name: 'Personal', taskCount: 3 }
        ],
        settings: settings,
        exportDate: new Date().toISOString()
      };

      const dataStr = format === 'json' 
        ? JSON.stringify(mockData, null, 2)
        : convertToCSV(mockData);
      
      const dataBlob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `taskflow-export-${new Date().toISOString().split('T')[0]}.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const convertToCSV = (data) => {
    const tasks = data.tasks;
    const headers = ['ID', 'Title', 'Status', 'Priority'];
    const csvContent = [
      headers.join(','),
      ...tasks.map(task => [task.id, `"${task.title}"`, task.status, task.priority].join(','))
    ].join('\n');
    return csvContent;
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const content = e.target.result;
        let importedData;
        
        if (file.type === 'application/json' || file.name.endsWith('.json')) {
          importedData = JSON.parse(content);
        } else {
          // Handle CSV import
          importedData = parseCSV(content);
        }
        
        // Simulate import process
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Imported data:', importedData);
        alert(`Successfully imported ${importedData.tasks?.length || 0} tasks and ${importedData.groups?.length || 0} groups`);
      } catch (error) {
        console.error('Import failed:', error);
        alert('Import failed. Please check your file format.');
      } finally {
        setIsImporting(false);
        event.target.value = '';
      }
    };
    
    reader.readAsText(file);
  };

  const parseCSV = (content) => {
    const lines = content.split('\n');
    const headers = lines[0].split(',');
    const tasks = lines.slice(1).map((line, index) => {
      const values = line.split(',');
      return {
        id: parseInt(values[0]) || index + 1,
        title: values[1]?.replace(/"/g, '') || '',
        status: values[2] || 'todo',
        priority: values[3] || 'medium'
      };
    }).filter(task => task.title);
    
    return { tasks, groups: [] };
  };

  const handleBackupNow = async () => {
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastBackup(new Date().toISOString());
      alert('Backup completed successfully!');
    } catch (error) {
      console.error('Backup failed:', error);
      alert('Backup failed. Please try again.');
    }
  };

  const handleClearAllData = () => {
    const confirmClear = window.confirm(
      'Are you sure you want to clear all data? This action cannot be undone. Make sure you have exported your data first.'
    );
    
    if (confirmClear) {
      const doubleConfirm = window.confirm(
        'This will permanently delete all your tasks, groups, and settings. Type "DELETE" to confirm.'
      );
      
      if (doubleConfirm) {
        console.log('Clearing all data...');
        alert('All data has been cleared.');
      }
    }
  };

  const backupFrequencyOptions = [
    { value: 'never', label: 'Never' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const storageLocationOptions = [
    { value: 'local', label: 'Local Storage' },
    { value: 'cloud', label: 'Cloud Storage (Coming Soon)', disabled: true }
  ];

  const dataRetentionOptions = [
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: 'forever', label: 'Forever' }
  ];

  const exportFormatOptions = [
    { value: 'json', label: 'JSON', description: 'Complete data with all settings' },
    { value: 'csv', label: 'CSV', description: 'Tasks only, spreadsheet compatible' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStorageUsage = () => {
    // Mock storage calculation
    return {
      used: 2.4,
      total: 10,
      percentage: 24
    };
  };

  const storageUsage = getStorageUsage();

  return (
    <div className="space-y-8">
      {/* Storage Overview Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="HardDrive" size={20} />
          Storage Overview
        </h3>
        <div className="bg-background rounded-lg border border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{storageUsage.used} MB</div>
              <div className="text-sm text-text-secondary">Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{storageUsage.total} MB</div>
              <div className="text-sm text-text-secondary">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{storageUsage.percentage}%</div>
              <div className="text-sm text-text-secondary">Usage</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-text-secondary mb-2">
              <span>Storage Usage</span>
              <span>{storageUsage.used} MB of {storageUsage.total} MB</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${storageUsage.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Backup Settings Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Shield" size={20} />
          Backup Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Automatic Backup</h4>
              <p className="text-sm text-text-secondary">Automatically backup your data at regular intervals</p>
            </div>
            <button
              onClick={() => handleSettingChange('autoBackup', !settings.autoBackup)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150
                ${settings.autoBackup ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150
                  ${settings.autoBackup ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="backupFrequency" className="block text-sm font-medium text-text-primary mb-2">
                Backup Frequency
              </label>
              <select
                id="backupFrequency"
                value={settings.backupFrequency}
                onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                disabled={!settings.autoBackup}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150 disabled:opacity-50"
              >
                {backupFrequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="storageLocation" className="block text-sm font-medium text-text-primary mb-2">
                Storage Location
              </label>
              <select
                id="storageLocation"
                value={settings.storageLocation}
                onChange={(e) => handleSettingChange('storageLocation', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
              >
                {storageLocationOptions.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Last Backup</h4>
              <p className="text-sm text-text-secondary">{formatDate(lastBackup)}</p>
            </div>
            <button
              onClick={handleBackupNow}
              className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all duration-150 flex items-center gap-2"
            >
              <Icon name="Download" size={16} />
              Backup Now
            </button>
          </div>
        </div>
      </div>

      {/* Export Data Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Upload" size={20} />
          Export Data
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="exportFormat" className="block text-sm font-medium text-text-primary mb-2">
              Export Format
            </label>
            <select
              id="exportFormat"
              value={settings.exportFormat}
              onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {exportFormatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleExportData('json')}
              disabled={isExporting}
              className="p-4 bg-background border border-border rounded-lg hover:bg-surface-light/50 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  {isExporting ? (
                    <Icon name="Loader2" size={20} className="text-primary animate-spin" />
                  ) : (
                    <Icon name="FileText" size={20} className="text-primary" />
                  )}
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-text-primary">Export as JSON</h4>
                  <p className="text-sm text-text-secondary">Complete backup with all data</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleExportData('csv')}
              disabled={isExporting}
              className="p-4 bg-background border border-border rounded-lg hover:bg-surface-light/50 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  {isExporting ? (
                    <Icon name="Loader2" size={20} className="text-accent animate-spin" />
                  ) : (
                    <Icon name="Table" size={20} className="text-accent" />
                  )}
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-text-primary">Export as CSV</h4>
                  <p className="text-sm text-text-secondary">Tasks only for spreadsheets</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Import Data Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Download" size={20} />
          Import Data
        </h3>
        <div className="space-y-4">
          <div className="p-6 bg-background border-2 border-dashed border-border rounded-lg text-center">
            <Icon name="Upload" size={48} className="text-text-secondary mx-auto mb-4" />
            <h4 className="font-medium text-text-primary mb-2">Import Your Data</h4>
            <p className="text-sm text-text-secondary mb-4">
              Upload a JSON or CSV file to restore your tasks and groups
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-150 cursor-pointer">
              {isImporting ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={16} />
                  Choose File
                </>
              )}
              <input
                type="file"
                accept=".json,.csv"
                onChange={handleImportData}
                disabled={isImporting}
                className="hidden"
              />
            </label>
          </div>

          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div className="text-sm">
                <p className="text-warning font-medium mb-1">Import Warning</p>
                <p className="text-text-secondary">
                  Importing data will merge with your existing tasks and groups. Duplicate items may be created.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Retention Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Clock" size={20} />
          Data Retention
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="dataRetention" className="block text-sm font-medium text-text-primary mb-2">
              Keep Completed Tasks For
            </label>
            <select
              id="dataRetention"
              value={settings.dataRetention}
              onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-150"
            >
              {dataRetentionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-sm text-text-secondary mt-2">
              Completed tasks older than this period will be automatically archived
            </p>
          </div>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div>
        <h3 className="text-lg font-semibold text-error mb-4 flex items-center gap-2">
          <Icon name="AlertTriangle" size={20} />
          Danger Zone
        </h3>
        <div className="p-6 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-error mb-2">Clear All Data</h4>
              <p className="text-sm text-text-secondary">
                Permanently delete all tasks, groups, and settings. This action cannot be undone.
              </p>
            </div>
            <button
              onClick={handleClearAllData}
              className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/80 transition-all duration-150 flex items-center gap-2 ml-4"
            >
              <Icon name="Trash2" size={16} />
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;