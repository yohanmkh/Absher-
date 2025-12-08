import React from 'react';
import { AlertCircle, Eye, ShieldCheck, XCircle } from 'lucide-react';
import { Alert } from '../types';

interface ActionCenterProps {
  alert: Alert | null;
  onReport: () => void;
}

export const ActionCenter: React.FC<ActionCenterProps> = ({ alert, onReport }) => {
  const disabled = !alert;

  return (
    <div className="grid grid-cols-3 gap-4">
       <button 
         disabled={disabled}
         className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
       >
          <XCircle className="w-6 h-6 text-slate-400 group-hover:text-white" />
          <span className="text-xs font-bold text-slate-400 group-hover:text-white">DISMISS</span>
       </button>

       <button 
         disabled={disabled}
         className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-amber-900/50 bg-amber-950/20 hover:bg-amber-900/40 hover:border-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
       >
          <Eye className="w-6 h-6 text-amber-500" />
          <span className="text-xs font-bold text-amber-500">MONITOR</span>
       </button>

       <button 
         onClick={onReport}
         disabled={disabled}
         className="relative overflow-hidden flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-red-900 bg-gradient-to-br from-red-950 to-red-900 hover:from-red-900 hover:to-red-800 hover:border-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(239,68,68,0.2)] group"
       >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <AlertCircle className="w-6 h-6 text-white animate-pulse" />
          <span className="text-xs font-bold text-white relative z-10">REPORT TO HQ</span>
       </button>
    </div>
  );
};
