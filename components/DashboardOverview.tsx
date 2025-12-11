import React from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Users, 
  Car, 
  TrendingUp, 
  TrendingDown,
  Activity,
  CheckCircle,
  Clock,
  MapPin,
  Eye,
  Radio
} from 'lucide-react';
import { Alert, RiskLevel } from '../types';

interface DashboardOverviewProps {
  alerts: Alert[];
  monitoredAlerts: string[];
  resolvedCount: number;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  alerts, 
  monitoredAlerts,
  resolvedCount 
}) => {
  const criticalCount = alerts.filter(a => a.riskLevel === RiskLevel.CRITICAL).length;
  const highCount = alerts.filter(a => a.riskLevel === RiskLevel.HIGH).length;
  const mediumCount = alerts.filter(a => a.riskLevel === RiskLevel.MEDIUM).length;

  const stats = [
    { 
      label: 'Active Incidents', 
      value: alerts.length, 
      icon: AlertTriangle, 
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      trend: '+2 from yesterday',
      trendUp: true
    },
    { 
      label: 'Under Monitoring', 
      value: monitoredAlerts.length, 
      icon: Eye, 
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      trend: 'Active tracking',
      trendUp: null
    },
    { 
      label: 'Resolved Today', 
      value: resolvedCount, 
      icon: CheckCircle, 
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      trend: '+5 from yesterday',
      trendUp: true
    },
    { 
      label: 'Units Deployed', 
      value: 12, 
      icon: Car, 
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      trend: '3 en route',
      trendUp: null
    },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-4`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                {stat.trendUp !== null && (
                  stat.trendUp ? 
                    <TrendingUp className="w-4 h-4 text-green-400" /> :
                    <TrendingDown className="w-4 h-4 text-red-400" />
                )}
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Risk Distribution & System Status */}
      <div className="grid grid-cols-3 gap-4">
        {/* Risk Distribution */}
        <div className="col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Incident Risk Distribution
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-400">Critical</span>
                <span className="text-white">{criticalCount}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all"
                  style={{ width: `${(criticalCount / alerts.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-orange-400">High</span>
                <span className="text-white">{highCount}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all"
                  style={{ width: `${(highCount / alerts.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-yellow-400">Medium</span>
                <span className="text-white">{mediumCount}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full transition-all"
                  style={{ width: `${(mediumCount / alerts.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Absher Connection</span>
              <span className="flex items-center gap-1 text-xs text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Camera Network</span>
              <span className="flex items-center gap-1 text-xs text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                247/250 Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">AI Analysis</span>
              <span className="flex items-center gap-1 text-xs text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Dispatch System</span>
              <span className="flex items-center gap-1 text-xs text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { time: '2 min ago', action: 'Unit dispatched to King Fahd Rd incident', type: 'dispatch', user: 'Officer Hassan' },
            { time: '5 min ago', action: 'Alert ALT-2024-892 acknowledged and under monitoring', type: 'acknowledge', user: 'Officer Khalid' },
            { time: '12 min ago', action: 'New critical alert: Hit and Run detected', type: 'alert', user: 'System' },
            { time: '18 min ago', action: 'Absher verification completed for ID 1048592311', type: 'verify', user: 'System' },
            { time: '25 min ago', action: 'Incident ALT-2024-888 marked as resolved', type: 'resolve', user: 'Officer Ahmad' },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-700 last:border-0 last:pb-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 ${
                activity.type === 'alert' ? 'bg-red-400' :
                activity.type === 'dispatch' ? 'bg-amber-400' :
                activity.type === 'acknowledge' ? 'bg-cyan-400' :
                activity.type === 'verify' ? 'bg-green-400' :
                'bg-slate-400'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-slate-500">{activity.time} • {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
