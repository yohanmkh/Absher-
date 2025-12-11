import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User,
  MapPin,
  AlertTriangle,
  Eye,
  FileText,
  Download
} from 'lucide-react';
import { Alert, RiskLevel } from '../types';

interface HistoryTabProps {
  alerts: Alert[];
}

interface HistoryEntry {
  id: string;
  alertId: string;
  type: string;
  location: string;
  timestamp: string;
  resolvedAt: string;
  status: 'resolved' | 'dismissed' | 'escalated';
  officer: string;
  resolution: string;
  riskLevel: RiskLevel;
}

const mockHistory: HistoryEntry[] = [
  {
    id: 'HIS-001',
    alertId: 'ALT-2024-888',
    type: 'Unauthorized Entry',
    location: 'King Abdullah Financial District',
    timestamp: '13:45:00',
    resolvedAt: '14:22:00',
    status: 'resolved',
    officer: 'Officer Ahmad',
    resolution: 'Subject identified and cleared. False alarm - authorized personnel.',
    riskLevel: RiskLevel.HIGH
  },
  {
    id: 'HIS-002',
    alertId: 'ALT-2024-885',
    type: 'Vehicle Speeding',
    location: 'Makkah Road, Exit 15',
    timestamp: '12:30:00',
    resolvedAt: '12:55:00',
    status: 'resolved',
    officer: 'Officer Hassan',
    resolution: 'Traffic unit intercepted. Citation issued.',
    riskLevel: RiskLevel.MEDIUM
  },
  {
    id: 'HIS-003',
    alertId: 'ALT-2024-882',
    type: 'Suspicious Package',
    location: 'Riyadh Gallery Mall',
    timestamp: '11:15:00',
    resolvedAt: '11:45:00',
    status: 'dismissed',
    officer: 'Officer Khalid',
    resolution: 'Package inspected - contained personal belongings. Owner located.',
    riskLevel: RiskLevel.CRITICAL
  },
  {
    id: 'HIS-004',
    alertId: 'ALT-2024-879',
    type: 'Crowd Formation',
    location: 'Tahlia Street',
    timestamp: '10:00:00',
    resolvedAt: '10:30:00',
    status: 'resolved',
    officer: 'Officer Mohammed',
    resolution: 'Crowd dispersed naturally. Event related - concert queue.',
    riskLevel: RiskLevel.LOW
  },
  {
    id: 'HIS-005',
    alertId: 'ALT-2024-875',
    type: 'Hit and Run',
    location: 'Northern Ring Road',
    timestamp: '09:22:00',
    resolvedAt: '11:15:00',
    status: 'escalated',
    officer: 'Officer Faisal',
    resolution: 'Suspect apprehended. Case forwarded to traffic prosecution.',
    riskLevel: RiskLevel.CRITICAL
  },
];

export const HistoryTab: React.FC<HistoryTabProps> = ({ alerts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredHistory = mockHistory.filter(entry => {
    const matchesSearch = searchQuery === '' || 
      entry.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.alertId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || entry.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded"><CheckCircle className="w-3 h-3" />Resolved</span>;
      case 'dismissed':
        return <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-500/20 px-2 py-1 rounded"><XCircle className="w-3 h-3" />Dismissed</span>;
      case 'escalated':
        return <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/20 px-2 py-1 rounded"><AlertTriangle className="w-3 h-3" />Escalated</span>;
      default:
        return null;
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
    const colors = {
      [RiskLevel.CRITICAL]: 'bg-red-500/20 text-red-400 border-red-500/30',
      [RiskLevel.HIGH]: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      [RiskLevel.MEDIUM]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      [RiskLevel.LOW]: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return <span className={`text-xs px-2 py-0.5 rounded border ${colors[level]}`}>{level}</span>;
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-semibold text-white">Incident History</h2>
          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{mockHistory.length} records</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by type, location, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
          {['all', 'resolved', 'dismissed', 'escalated'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all capitalize ${
                filterStatus === status 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {filteredHistory.map((entry) => (
          <div 
            key={entry.id}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-medium">{entry.type}</h3>
                  {getRiskBadge(entry.riskLevel)}
                  {getStatusBadge(entry.status)}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {entry.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {entry.timestamp} → {entry.resolvedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {entry.officer}
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-mono">{entry.alertId}</span>
            </div>
            
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Resolution:</p>
              <p className="text-sm text-white">{entry.resolution}</p>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs transition-colors">
                <Eye className="w-3 h-3" />
                View Details
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs transition-colors">
                <FileText className="w-3 h-3" />
                Full Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{mockHistory.length}</p>
          <p className="text-xs text-slate-400">Total Incidents</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">{mockHistory.filter(h => h.status === 'resolved').length}</p>
          <p className="text-xs text-slate-400">Resolved</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-400">{mockHistory.filter(h => h.status === 'dismissed').length}</p>
          <p className="text-xs text-slate-400">Dismissed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-400">{mockHistory.filter(h => h.status === 'escalated').length}</p>
          <p className="text-xs text-slate-400">Escalated</p>
        </div>
      </div>
    </div>
  );
};
