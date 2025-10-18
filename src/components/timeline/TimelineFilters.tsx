'use client';

import { memo } from 'react';
import { TIMELINE_CATEGORIES } from './TimelineConfig';

interface TimelineFiltersProps {
  activeFilter: string;
  onFilterChange: (filterKey: string) => void;
}

export const TimelineFilters = memo(function TimelineFilters({ 
  activeFilter, 
  onFilterChange 
}: TimelineFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TIMELINE_CATEGORIES.map((category) => (
        <button
          key={category.key}
          onClick={() => onFilterChange(category.key)}
          className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            activeFilter === category.key
              ? 'bg-blue-600 text-white shadow-elevation-dark-md shadow-blue-600/40 scale-[1.02] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:rounded-t-lg'
              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700/30 shadow-elevation-dark-sm hover:shadow-elevation-dark-md hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0'
          }`}
          aria-label={`Filter by ${category.label}`}
          aria-pressed={activeFilter === category.key}
        >
          <span className="mr-1.5 text-xs" aria-hidden="true">{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
});
