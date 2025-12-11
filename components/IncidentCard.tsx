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
  Radio,
  Fingerprint,
  AlertTriangle,
  Clock,
  Shield
} from 'lucide-react';

interface IncidentCardProps {
  alert: Alert;
  isExpanded?: boolean;
  onSelect: () => void;
  onViewFeed?: () => void;
  onAcknowledge?: () => void;
  onDispatch?: () => void;
  onReport?: () => void;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ 
  alert, 
  isExpanded = false, 
  onSelect,
  onViewFeed,
  onAcknowledge,
  onDispatch,
  onReport
}) => {
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

  const getRiskScore = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL: return '92/100';
      case RiskLevel.HIGH: return '78/100';
      case RiskLevel.MEDIUM: return '55/100';
      case RiskLevel.LOW: return '25/100';
      default: return '0/100';
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
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Time: <span className="text-white">{alert.timestamp}</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Location: <span className="text-white">{alert.location}</span>
            </span>
            <span>Risk Level: <span className={getRiskTextColor(alert.riskLevel)}>{alert.riskLevel} ({getRiskScore(alert.riskLevel)})</span></span>
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
            {alert.location}
          </div>
          <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded font-mono">
            {alert.timestamp}
          </div>
        </div>

        {/* Right: Subject Info - Absher Verification */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          {alert.person ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-cyan-400" />
                <p className="text-xs text-cyan-400 font-semibold">Identified Subject: Match found in National DB</p>
              </div>
              
              <div className="flex gap-3">
                <div className="relative">
                  <img 
                    src={alert.person.imageUrl}
                    alt="Subject"
                    className="w-20 h-24 rounded object-cover border-2 border-red-500"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                    <Fingerprint className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="text-xs space-y-1.5 flex-1">
                  <p className="text-slate-400">ID: <span className="text-cyan-400 font-mono">{alert.person.id}</span></p>
                  <p className="text-slate-400">Name: <span className="text-white font-semibold">{alert.person.name}</span></p>
                  <p className="text-slate-400">Arabic: <span className="text-white font-arabic">{alert.person.nameAr}</span></p>
                  <p className="text-slate-400">Age: <span className="text-white">{alert.person.age} years</span></p>
                  <p className="text-slate-400">Status: <span className="text-yellow-400">Watchlist</span> - <span className="text-red-400">High Risk</span></p>
                </div>
              </div>

              {/* History */}
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-500 mb-1">Recent Flags:</p>
                <div className="flex flex-wrap gap-1">
                  {alert.person.history.map((item, i) => (
                    <span key={i} className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <AlertTriangle className="w-8 h-8 mb-2" />
              <p className="text-sm">No biometric match found</p>
              <p className="text-xs">Manual verification required</p>
            </div>
          )}
        </div>
      </div>

      {/* Vehicle Info if available */}
      {alert.vehicle && (
        <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Car className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400 font-semibold">Vehicle Information</span>
          </div>
          <div className="grid grid-cols-5 gap-4 text-xs">
            <div>
              <p className="text-slate-500">Plate</p>
              <p className="text-white font-mono">{alert.vehicle.plate}</p>
            </div>
            <div>
              <p className="text-slate-500">Make</p>
              <p className="text-white">{alert.vehicle.make}</p>
            </div>
            <div>
              <p className="text-slate-500">Model</p>
              <p className="text-white">{alert.vehicle.model}</p>
            </div>
            <div>
              <p className="text-slate-500">Color</p>
              <p className="text-white">{alert.vehicle.color}</p>
            </div>
            <div>
              <p className="text-slate-500">Year</p>
              <p className="text-white">{alert.vehicle.year}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onViewFeed?.(); }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Video className="w-4 h-4" />
          View Live Feed
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onAcknowledge?.(); }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <CheckCircle className="w-4 h-4" />
          Acknowledge & Monitor
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDispatch?.(); }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Truck className="w-4 h-4" />
          Dispatch Unit
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onReport?.(); }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors text-sm font-medium"
        >
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
  image?: string;
  details: { label: string; value: string; color?: string }[];
  actions: { label: string; onClick?: () => void }[];
}

export const CompactCard: React.FC<CompactCardProps> = ({ title, icon, image, details, actions }) => {
  const IconComponent = icon === 'vehicle' ? Car : Users;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/30 transition-all">
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
          src={image || "https://i.postimg.cc/RWL0Sf7g/Whats-App-Image-2025-12-11-at-20-55-13.jpg"}
          alt="Alert"
          className="w-20 h-16 rounded object-cover border border-slate-600"
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
            onClick={action.onClick}
            className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};
