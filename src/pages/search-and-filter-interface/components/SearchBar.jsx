import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SearchBar = ({ searchQuery, onSearchChange, onClearSearch, resultsCount, totalCount }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const searchSuggestions = [
    "high priority tasks",
    "due today",
    "work projects",
    "completed tasks",
    "documentation",
    "review",
    "planning",
    "urgent",
    "team feedback",
    "client presentation"
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase()) &&
        suggestion.toLowerCase() !== searchQuery.toLowerCase()
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0 && isFocused);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur();
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className={`
        relative transition-all duration-150
        ${isFocused ? 'ring-2 ring-primary/50' : ''}
      `}>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search tasks, descriptions, tags, or assignees..."
          className="w-full pl-12 pr-12 py-4 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all duration-150 text-lg"
        />
        
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-150"
            title="Clear search"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2 px-2">
              Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg text-text-primary hover:bg-surface-light/50 transition-all duration-150"
              >
                <Icon name="Search" size={16} className="text-text-secondary" />
                <span className="flex-1">{suggestion}</span>
                <Icon name="CornerDownLeft" size={14} className="text-text-secondary" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Summary */}
      {searchQuery && (
        <div className="flex items-center justify-between mt-3 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <Icon name="Info" size={16} />
            <span>
              Found {resultsCount} result{resultsCount !== 1 ? 's' : ''} out of {totalCount} total tasks
            </span>
          </div>
          
          {resultsCount > 0 && (
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={14} />
              <span>Real-time search</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;