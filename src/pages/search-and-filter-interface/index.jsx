import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'components/AppIcon';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ResultsList from './components/ResultsList';
import BulkOperationsToolbar from './components/BulkOperationsToolbar';
import SavedSearches from './components/SavedSearches';

const SearchAndFilterInterface = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    status: [],
    priority: [],
    groups: [],
    tags: [],
    dateRange: { start: '', end: '' },
    assignee: []
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState('list');

  // Mock data for tasks across all groups
  const allTasks = [
    {
      id: 1,
      title: "Complete project documentation",
      description: "Write comprehensive documentation for the new feature implementation including API specs and user guides.",
      status: "in-progress",
      priority: "high",
      group: "Work",
      groupColor: "bg-blue-500",
      tags: ["documentation", "api", "urgent"],
      assignee: "John Doe",
      dueDate: "2024-01-15",
      createdDate: "2024-01-10",
      completedDate: null,
      estimatedTime: "4 hours"
    },
    {
      id: 2,
      title: "Review team feedback",
      description: "Go through all team feedback from the quarterly review and prepare action items.",
      status: "todo",
      priority: "medium",
      group: "Work",
      groupColor: "bg-blue-500",
      tags: ["review", "team", "feedback"],
      assignee: "Jane Smith",
      dueDate: "2024-01-18",
      createdDate: "2024-01-12",
      completedDate: null,
      estimatedTime: "2 hours"
    },
    {
      id: 3,
      title: "Plan weekend trip",
      description: "Research destinations, book accommodations, and create itinerary for the upcoming weekend getaway.",
      status: "completed",
      priority: "low",
      group: "Personal",
      groupColor: "bg-green-500",
      tags: ["travel", "planning", "weekend"],
      assignee: "John Doe",
      dueDate: "2024-01-12",
      createdDate: "2024-01-08",
      completedDate: "2024-01-11",
      estimatedTime: "3 hours"
    },
    {
      id: 4,
      title: "Update portfolio website",
      description: "Add recent projects, update skills section, and optimize for better performance and SEO.",
      status: "in-progress",
      priority: "medium",
      group: "Projects",
      groupColor: "bg-purple-500",
      tags: ["portfolio", "website", "seo"],
      assignee: "John Doe",
      dueDate: "2024-01-20",
      createdDate: "2024-01-09",
      completedDate: null,
      estimatedTime: "6 hours"
    },
    {
      id: 5,
      title: "Grocery shopping",
      description: "Buy weekly groceries including fresh vegetables, fruits, and household essentials.",
      status: "todo",
      priority: "low",
      group: "Personal",
      groupColor: "bg-green-500",
      tags: ["shopping", "groceries", "weekly"],
      assignee: "Jane Smith",
      dueDate: "2024-01-14",
      createdDate: "2024-01-13",
      completedDate: null,
      estimatedTime: "1 hour"
    },
    {
      id: 6,
      title: "Client presentation prep",
      description: "Prepare slides and demo for the upcoming client presentation on the new product features.",
      status: "todo",
      priority: "high",
      group: "Work",
      groupColor: "bg-blue-500",
      tags: ["presentation", "client", "demo"],
      assignee: "John Doe",
      dueDate: "2024-01-16",
      createdDate: "2024-01-11",
      completedDate: null,
      estimatedTime: "5 hours"
    }
  ];

  const savedSearches = [
    { id: 1, name: "High Priority Tasks", query: "", filters: { priority: ["high"] } },
    { id: 2, name: "Due This Week", query: "", filters: { dateRange: { start: "2024-01-14", end: "2024-01-21" } } },
    { id: 3, name: "Work Projects", query: "", filters: { groups: ["Work"] } },
    { id: 4, name: "Completed Tasks", query: "", filters: { status: ["completed"] } }
  ];

  // Filter and search logic
  const filteredTasks = useMemo(() => {
    let filtered = allTasks;

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.tags.some(tag => tag.toLowerCase().includes(query)) ||
        task.assignee.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (activeFilters.status.length > 0) {
      filtered = filtered.filter(task => activeFilters.status.includes(task.status));
    }

    // Priority filter
    if (activeFilters.priority.length > 0) {
      filtered = filtered.filter(task => activeFilters.priority.includes(task.priority));
    }

    // Groups filter
    if (activeFilters.groups.length > 0) {
      filtered = filtered.filter(task => activeFilters.groups.includes(task.group));
    }

    // Tags filter
    if (activeFilters.tags.length > 0) {
      filtered = filtered.filter(task =>
        activeFilters.tags.some(tag => task.tags.includes(tag))
      );
    }

    // Date range filter
    if (activeFilters.dateRange.start || activeFilters.dateRange.end) {
      filtered = filtered.filter(task => {
        const taskDate = new Date(task.dueDate);
        const startDate = activeFilters.dateRange.start ? new Date(activeFilters.dateRange.start) : null;
        const endDate = activeFilters.dateRange.end ? new Date(activeFilters.dateRange.end) : null;
        
        if (startDate && taskDate < startDate) return false;
        if (endDate && taskDate > endDate) return false;
        return true;
      });
    }

    // Assignee filter
    if (activeFilters.assignee.length > 0) {
      filtered = filtered.filter(task => activeFilters.assignee.includes(task.assignee));
    }

    return filtered;
  }, [searchQuery, activeFilters, allTasks]);

  // Sort logic
  const sortedTasks = useMemo(() => {
    const sorted = [...filteredTasks];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'relevance':
          // Simple relevance based on search query match
          if (searchQuery.trim()) {
            const aRelevance = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 1;
            const bRelevance = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 1;
            comparison = bRelevance - aRelevance;
          }
          break;
        case 'dueDate':
          comparison = new Date(a.dueDate) - new Date(b.dueDate);
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        case 'createdDate':
          comparison = new Date(a.createdDate) - new Date(b.createdDate);
          break;
        case 'alphabetical':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return sorted;
  }, [filteredTasks, sortBy, sortOrder, searchQuery]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      status: [],
      priority: [],
      groups: [],
      tags: [],
      dateRange: { start: '', end: '' },
      assignee: []
    });
    setSearchQuery('');
  };

  const handleTaskSelect = (taskId, isSelected) => {
    if (isSelected) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === sortedTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(sortedTasks.map(task => task.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on tasks:`, selectedTasks);
    setSelectedTasks([]);
  };

  const handleSavedSearchSelect = (savedSearch) => {
    setSearchQuery(savedSearch.query || '');
    setActiveFilters(savedSearch.filters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.status.length > 0) count++;
    if (activeFilters.priority.length > 0) count++;
    if (activeFilters.groups.length > 0) count++;
    if (activeFilters.tags.length > 0) count++;
    if (activeFilters.dateRange.start || activeFilters.dateRange.end) count++;
    if (activeFilters.assignee.length > 0) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSidebarToggle={handleSidebarToggle}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={handleMobileMenuClose}
      />

      <main className={`
        pt-16 transition-all duration-300 ease-in-out min-h-screen
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                  Search & Filter
                </h1>
                <p className="text-text-secondary">
                  Find and organize your tasks across all groups
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150"
                  title={`Switch to ${viewMode === 'list' ? 'grid' : 'list'} view`}
                >
                  <Icon name={viewMode === 'list' ? 'Grid3X3' : 'List'} size={20} />
                </button>
                
                <button
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                    ${isFilterPanelOpen 
                      ? 'bg-primary/20 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-light/50'
                    }
                  `}
                >
                  <Icon name="Filter" size={16} />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-accent text-white text-xs rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={() => setSearchQuery('')}
              resultsCount={sortedTasks.length}
              totalCount={allTasks.length}
            />
          </div>

          <div className="flex gap-6">
            {/* Filter Panel */}
            {isFilterPanelOpen && (
              <div className="w-80 flex-shrink-0 hidden lg:block">
                <div className="sticky top-24">
                  <FilterPanel
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    allTasks={allTasks}
                  />
                  
                  <div className="mt-6">
                    <SavedSearches
                      savedSearches={savedSearches}
                      onSelect={handleSavedSearchSelect}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort Controls */}
              <div className="flex items-center justify-between mb-4 p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
                    <span className="text-sm font-medium text-text-primary">Sort by:</span>
                  </div>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 bg-background border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                    <option value="createdDate">Created Date</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150"
                    title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                  >
                    <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={16} />
                  </button>
                </div>

                <div className="text-sm text-text-secondary">
                  {sortedTasks.length} of {allTasks.length} tasks
                </div>
              </div>

              {/* Bulk Operations */}
              {selectedTasks.length > 0 && (
                <div className="mb-4">
                  <BulkOperationsToolbar
                    selectedCount={selectedTasks.length}
                    totalCount={sortedTasks.length}
                    onSelectAll={handleSelectAll}
                    onBulkAction={handleBulkAction}
                    onClearSelection={() => setSelectedTasks([])}
                  />
                </div>
              )}

              {/* Results */}
              <ResultsList
                tasks={sortedTasks}
                selectedTasks={selectedTasks}
                onTaskSelect={handleTaskSelect}
                viewMode={viewMode}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {isFilterPanelOpen && (
            <div className="lg:hidden">
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1100]" onClick={() => setIsFilterPanelOpen(false)} />
              <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-[1200] max-h-[80vh] overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
                    <button
                      onClick={() => setIsFilterPanelOpen(false)}
                      className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  </div>
                  
                  <FilterPanel
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    allTasks={allTasks}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchAndFilterInterface;