import React, { useState } from 'react';
import { 
  Search, 
  Fingerprint, 
  User, 
  Car, 
  Shield, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Clock,
  FileText,
  Camera
} from 'lucide-react';
import { Alert } from '../types';

interface VerificationTabProps {
  alerts: Alert[];
}

export const VerificationTab: React.FC<VerificationTabProps> = ({ alerts }) => {
  const [searchType, setSearchType] = useState<'person' | 'vehicle'>('person');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Alert | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      // Find matching alert
      const found = alerts.find(a => 
        searchType === 'person' 
          ? a.person?.id.includes(searchQuery) || a.person?.name.toLowerCase().includes(searchQuery.toLowerCase())
          : a.vehicle?.plate.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(found || null);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Search Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-semibold text-white">Absher National Database Verification</h2>
        </div>

        {/* Search Type Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSearchType('person')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              searchType === 'person' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <User className="w-4 h-4" />
            Person Lookup
          </button>
          <button
            onClick={() => setSearchType('vehicle')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              searchType === 'vehicle' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Car className="w-4 h-4" />
            Vehicle Lookup
          </button>
        </div>

        {/* Search Input */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder={searchType === 'person' ? 'Enter National ID or Name...' : 'Enter License Plate...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!searchQuery || isSearching}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Searching...
              </>
            ) : (
              <>
                <Fingerprint className="w-4 h-4" />
                Verify
              </>
            )}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-4">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-xs transition-colors">
            <Camera className="w-3 h-3" />
            Scan from Camera
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-xs transition-colors">
            <FileText className="w-3 h-3" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResult && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="bg-green-500/10 border-b border-green-500/30 px-6 py-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Match Found in National Database</span>
          </div>

          <div className="p-6">
            {searchType === 'person' && searchResult.person && (
              <div className="grid grid-cols-3 gap-6">
                {/* Photo */}
                <div className="flex flex-col items-center">
                  <img 
                    src={searchResult.person.imageUrl}
                    alt="Subject"
                    className="w-40 h-48 rounded-lg object-cover border-4 border-slate-600 mb-3"
                  />
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <Fingerprint className="w-4 h-4" />
                    Biometric Verified
                  </div>
                </div>

                {/* Details */}
                <div className="col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">National ID</p>
                      <p className="text-lg font-mono text-cyan-400">{searchResult.person.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Status</p>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                        <AlertTriangle className="w-3 h-3" />
                        Watchlist - High Risk
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Full Name (English)</p>
                      <p className="text-white font-semibold">{searchResult.person.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Full Name (Arabic)</p>
                      <p className="text-white font-semibold font-arabic text-lg">{searchResult.person.nameAr}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Age</p>
                      <p className="text-white">{searchResult.person.age} years</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Last Seen</p>
                      <p className="text-white">{searchResult.location}</p>
                    </div>
                  </div>

                  {/* History */}
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Violation History</p>
                    <div className="flex flex-wrap gap-2">
                      {searchResult.person.history.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs border border-red-500/30">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-700">
                    <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-sm font-medium transition-colors">
                      Create Alert
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
                      View Full Profile
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
                      Print Report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {searchType === 'vehicle' && searchResult.vehicle && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">License Plate</p>
                    <p className="text-2xl font-mono text-cyan-400">{searchResult.vehicle.plate}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Make</p>
                      <p className="text-white">{searchResult.vehicle.make}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Model</p>
                      <p className="text-white">{searchResult.vehicle.model}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Color</p>
                      <p className="text-white">{searchResult.vehicle.color}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Year</p>
                      <p className="text-white">{searchResult.vehicle.year}</p>
                    </div>
                  </div>
                </div>
                {searchResult.person && (
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-xs text-cyan-400 mb-3 font-semibold">Registered Owner</p>
                    <div className="flex gap-3">
                      <img 
                        src={searchResult.person.imageUrl}
                        alt="Owner"
                        className="w-16 h-20 rounded object-cover border-2 border-slate-600"
                      />
                      <div className="text-sm space-y-1">
                        <p className="text-white font-semibold">{searchResult.person.name}</p>
                        <p className="text-slate-400 font-mono text-xs">ID: {searchResult.person.id}</p>
                        <p className="text-red-400 text-xs">Status: Watchlist</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Result */}
      {searchQuery && !isSearching && searchResult === null && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
          <XCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">No Match Found</p>
          <p className="text-sm text-slate-400">No records found for "{searchQuery}" in the National Database</p>
        </div>
      )}

      {/* Recent Verifications */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          Recent Verifications
        </h3>
        <div className="space-y-2">
          {alerts.filter(a => a.person).slice(0, 5).map((alert, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
              <img 
                src={alert.person!.imageUrl}
                alt=""
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1">
                <p className="text-sm text-white">{alert.person!.name}</p>
                <p className="text-xs text-slate-500">ID: {alert.person!.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-400">Verified</p>
                <p className="text-xs text-slate-500">{alert.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
