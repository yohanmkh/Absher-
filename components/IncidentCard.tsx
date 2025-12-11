import React from 'react';
import { Alert, RiskLevel } from '../types';
import { 
  MoreVertical, 
  Video, 
  CheckCircle, 
  Truck, 
  FileWarning,
  Car,
  Users,
  MapPin,
  Eye,
  UserCheck,
  Radio
} from 'lucide-react';

interface IncidentCardProps {
  alert: Alert;
  isExpanded?: boolean;
  onSelect: () => void;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ alert, isExpanded = false, onSelect }) => {
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL: return 'bg-red-500 text-white';
      case RiskLevel.HIGH: return 'bg-orange-500 text-white';
      case RiskLevel.MEDIUM: return 'bg-yellow-500 text-black';
      case RiskLevel.LOW: return 'bg-green-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getRiskTextColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL: return 'text-red-400';
      case RiskLevel.HIGH: return 'text-orange-400';
      case RiskLevel.MEDIUM: return 'text-yellow-400';
      case RiskLevel.LOW: return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div 
      onClick={onSelect}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/50 transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-white font-semibold">{alert.type} - {alert.location}</h3>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${getRiskColor(alert.riskLevel)}`}>
              {alert.riskLevel}
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span>Time: <span className="text-white">{alert.timestamp}</span></span>
            <span>Location: <span className="text-white">{alert.location}</span></span>
            <span>Risk Level: <span className={getRiskTextColor(alert.riskLevel)}>{alert.riskLevel} (92/100)</span></span>
          </div>
        </div>
        <button className="p-1 hover:bg-slate-700 rounded">
          <MoreVertical className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Left: Image/Video */}
        <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-video">
          <img 
            src="https://i.postimg.cc/TKJPdmVk/Whats-App-Image-2025-12-11-at-20-54-09.jpg"
            alt="Incident footage"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            LIVE
          </div>
          <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
            Gate B12, T2
          </div>
        </div>

        {/* Right: Subject Info */}
        <div className="bg-slate-900/50 rounded-lg p-4">
          <p className="text-xs text-cyan-400 mb-2">Identified Subject: Potential Match found in National DB</p>
          
          <div className="flex gap-3">
            {alert.person && (
              <img 
                src={alert.person.imageUrl}
                alt="Subject"
                className="w-16 h-20 rounded object-cover border-2 border-red-500"
              />
            )}
            <div className="text-xs space-y-1">
              <p className="text-slate-400">ID: <span className="text-white">[REDACTED]</span></p>
              <p className="text-slate-400">Name: <span className="text-white">{alert.person?.name || 'Unknown'}</span> <span className="text-slate-500">(Alias Possible)</span></p>
              <p className="text-slate-400">Status: <span className="text-yellow-400">Watchlist</span> - <span className="text-red-400">High Risk</span></p>
              <p className="text-slate-400">Recent Flags: <span className="text-white">Multiple border crossings, known associates</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium">
          <Video className="w-4 h-4" />
          View Live Feed
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Acknowledge & Monitor
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium">
          <Truck className="w-4 h-4" />
          Dispatch Unit
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors text-sm font-medium">
          <FileWarning className="w-4 h-4" />
          Report Incident
        </button>
      </div>
    </div>
  );
};

// Compact card for vehicle/crowd alerts
interface CompactCardProps {
  title: string;
  icon: 'vehicle' | 'crowd';
  details: { label: string; value: string; color?: string }[];
  actions: string[];
}

export const CompactCard: React.FC<CompactCardProps> = ({ title, icon, details, actions }) => {
  const IconComponent = icon === 'vehicle' ? Car : Users;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <IconComponent className="w-5 h-5 text-cyan-400" />
          <h4 className="text-white font-semibold text-sm">{title}</h4>
        </div>
        <button className="p-1 hover:bg-slate-700 rounded">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="flex gap-3 mb-3">
        <img 
          src="https://i.postimg.cc/RWL0Sf7g/Whats-App-Image-2025-12-11-at-20-55-13.jpg"
          alt="Alert"
          className="w-20 h-16 rounded object-cover"
        />
        <div className="text-xs space-y-1">
          {details.map((detail, i) => (
            <p key={i} className="text-slate-400">
              {detail.label}: <span className={detail.color || 'text-white'}>{detail.value}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {actions.map((action, i) => (
          <button 
            key={i}
            className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};
