import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MiniCalendar = ({ onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const tasksOnDates = {
    '2024-12-15': { count: 3, hasOverdue: false },
    '2024-12-16': { count: 2, hasOverdue: true },
    '2024-12-18': { count: 1, hasOverdue: false },
    '2024-12-20': { count: 4, hasOverdue: false },
    '2024-12-22': { count: 2, hasOverdue: false },
    '2024-12-25': { count: 1, hasOverdue: false }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  const formatDateKey = (day) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const handleDateClick = (day) => {
    const dateKey = formatDateKey(day);
    const tasksOnDate = tasksOnDates[dateKey];
    if (tasksOnDate) {
      onDateClick({
        date: new Date(currentYear, currentMonth, day),
        taskCount: tasksOnDate.count,
        hasOverdue: tasksOnDate.hasOverdue
      });
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 w-8"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(day);
      const tasksOnDate = tasksOnDates[dateKey];
      const isCurrentDay = isToday(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
            h-8 w-8 rounded-lg text-sm font-medium transition-all duration-150 relative
            ${isCurrentDay
              ? 'bg-primary text-white'
              : tasksOnDate
              ? 'bg-accent/20 text-accent hover:bg-accent/30' :'text-text-primary hover:bg-surface-light/50'
            }
          `}
        >
          {day}
          {tasksOnDate && (
            <div className={`
              absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center
              ${tasksOnDate.hasOverdue ? 'bg-error' : 'bg-accent'}
            `}>
              <span className="text-white text-xs leading-none">
                {tasksOnDate.count}
              </span>
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Calendar</h3>
        <button
          onClick={() => window.location.href = '/task-detail-view'}
          className="text-sm text-primary hover:text-primary-600 transition-colors duration-150"
        >
          View Schedule
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-all duration-150"
        >
          <Icon name="ChevronLeft" size={16} />
        </button>
        
        <h4 className="text-sm font-semibold text-text-primary">
          {monthNames[currentMonth]} {currentYear}
        </h4>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-all duration-150"
        >
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-text-secondary"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="space-y-2 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-text-secondary">Today</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <span className="text-text-secondary">Has tasks</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-error rounded-full"></div>
          <span className="text-text-secondary">Has overdue</span>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;