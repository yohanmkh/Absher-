import React from 'react';
import { Alert, RiskLevel } from '../types';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

interface AlertsListProps {
  alerts: Alert[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const AlertsList: React.FC<AlertsListProps> = ({ alerts, selectedId, onSelect }) => {
  return (
   <div className="flex flex-col h-full bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
       <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center shrink-0">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
             <AlertTriangle className="w-4 h-4 text-cyan-500" /> Active Incidents
          </h2>
          <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30">
            {alerts.length} CRITICAL
          </span>
       </div>
       
   <div className="flex-1 overflow-y-auto p-2 space-y-2" style={{ maxHeight: 'calc(100% - 60px)' }}>
          {alerts.map((alert) => {
             const isSelected = selectedId === alert.id;
             const isCritical = alert.riskLevel === RiskLevel.CRITICAL;
             
             return (
               <div 
                 key={alert.id}
                 onClick={() => onSelect(alert.id)}
                 className={`
                    p-3 rounded-lg cursor-pointer transition-all border
                    ${isSelected 
                        ? 'bg-cyan-950/30 border-cyan-500/50 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' 
                        : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'}
                 `}
               >
                  <div className="flex justify-between items-start mb-1">
                     <span className={`text-xs font-bold px-1.5 py-0.5 rounded border 
                        ${isCritical 
                            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}
                     `}>
                        {alert.riskLevel}
                     </span>
                     <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {alert.timestamp}
                     </span>
                  </div>
                  
                  <h3 className={`font-medium text-sm mb-1 ${isSelected ? 'text-cyan-100' : 'text-slate-200'}`}>
                     {alert.type}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                     <MapPin className="w-3 h-3" />
                     {alert.location}
                  </div>
               </div>
             );
          })}
       </div>
    </div>
  );
};
