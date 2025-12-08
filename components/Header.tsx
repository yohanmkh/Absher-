import React from 'react';
import { ShieldAlert, User, Bell, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-cyan-900/30 rounded-lg border border-cyan-800">
          <ShieldAlert className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-white font-arabic">
            ABSHER <span className="text-cyan-400">AMAN</span>
          </h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest">National Command Center</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
         <span className="text-red-500 font-bold animate-pulse text-sm px-3 py-1 bg-red-950/30 border border-red-900/50 rounded-full">
            LIVE MONITORING
         </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right hidden md:block">
          <p className="text-sm font-mono text-cyan-500">{new Date().toLocaleTimeString()}</p>
          <p className="text-xs text-slate-500">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
          <button className="p-2 hover:bg-slate-800 rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-800 p-1.5 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <span className="text-sm font-medium text-slate-300 hidden md:block">Officer Al-Saud</span>
          </div>
        </div>
      </div>
    </header>
  );
};
