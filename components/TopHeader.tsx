import React, { useState, useEffect } from 'react';
import { Search, Shield } from 'lucide-react';

interface TopHeaderProps {
  title: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ title }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-6">
      {/* Logo & Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-cyan-400">National Smart<br/>Security</span>
        </div>
        <div className="h-8 w-px bg-slate-700"></div>
        <h1 className="text-xl font-bold text-white tracking-wide">{title}</h1>
      </div>

      {/* Time & Date */}
      <div className="text-right">
        <p className="text-2xl font-bold text-white">{formatTime(currentTime)}</p>
        <p className="text-xs text-slate-400">{formatDate(currentTime)}</p>
      </div>
    </header>
  );
};

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange 
}) => {
  const filters = ['All', 'Critical', 'High', 'Medium', 'Low'];

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all
              ${activeFilter === filter 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-64 bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
      </div>
    </div>
  );
};
