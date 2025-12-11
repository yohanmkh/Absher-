import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader, FilterTabs } from './components/TopHeader';
import { IncidentCard, CompactCard } from './components/IncidentCard';
import { MapPanel } from './components/MapPanel';
import { Modal } from './components/Modal';
import { DashboardOverview } from './components/DashboardOverview';
import { VerificationTab } from './components/VerificationTab';
import { HistoryTab } from './components/HistoryTab';
import { LiveFeeds } from './components/LiveFeeds';
import { MOCK_ALERTS } from './constants';
import { RiskLevel } from './types';
import { Plus, Video } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [monitoredAlerts, setMonitoredAlerts] = useState<string[]>([]);
  const [resolvedCount, setResolvedCount] = useState(8);
  const [actionFeedback, setActionFeedback] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [showLiveFeed, setShowLiveFeed] = useState(false);

  // Filter alerts based on active filter and search
  const filteredAlerts = MOCK_ALERTS.filter(alert => {
    const matchesFilter = activeFilter === 'All' || alert.riskLevel === activeFilter.toUpperCase();
    const matchesSearch = searchQuery === '' || 
      alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedAlert = MOCK_ALERTS.find(a => a.id === selectedAlertId) || null;

  // Show feedback toast
  const showFeedback = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setActionFeedback({ message, type });
    setTimeout(() => setActionFeedback(null), 3000);
  };

  // Action handlers
  const handleViewFeed = (alertId: string) => {
    setSelectedAlertId(alertId);
    setShowLiveFeed(true);
    showFeedback('Opening live camera feed...', 'info');
  };

  const handleAcknowledge = (alertId: string) => {
    if (!monitoredAlerts.includes(alertId)) {
      setMonitoredAlerts([...monitoredAlerts, alertId]);
      showFeedback(`Alert ${alertId} acknowledged and under monitoring`, 'success');
    } else {
      showFeedback(`Alert ${alertId} is already being monitored`, 'info');
    }
  };

  const handleDispatch = (alertId: string) => {
    showFeedback(`Dispatching nearest unit to incident ${alertId}...`, 'warning');
  };

  const handleReport = (alertId: string) => {
    setSelectedAlertId(alertId);
    setIsModalOpen(true);
  };

  // Get title based on active tab
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'DASHBOARD OVERVIEW';
      case 'alerts': return 'LIVE ALERTS & INCIDENTS';
      case 'map': return 'GEOSPATIAL MONITORING';
      case 'verification': return 'ABSHER VERIFICATION';
      case 'history': return 'INCIDENT HISTORY';
      case 'settings': return 'SYSTEM SETTINGS';
      default: return 'NATIONAL SMART SECURITY';
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview 
            alerts={MOCK_ALERTS}
            monitoredAlerts={monitoredAlerts}
            resolvedCount={resolvedCount}
          />
        );

      case 'map':
        return (
          <div className="h-full p-6">
            <div className="h-full rounded-xl overflow-hidden border border-slate-700">
              <MapPanel 
                alerts={MOCK_ALERTS}
                selectedAlertId={selectedAlertId}
                onSelectAlert={setSelectedAlertId}
              />
            </div>
          </div>
        );

      case 'verification':
        return <VerificationTab alerts={MOCK_ALERTS} />;

      case 'history':
        return <HistoryTab alerts={MOCK_ALERTS} />;

      case 'settings':
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center text-slate-500">
              <p className="text-lg mb-2">Settings Panel</p>
              <p className="text-sm">System configuration options would appear here</p>
            </div>
          </div>
        );
      
      case 'alerts':
      default:
        return (
          <>
            <FilterTabs 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Main Incident Cards */}
              {filteredAlerts.map(alert => (
                <IncidentCard 
                  key={alert.id}
                  alert={alert}
                  onSelect={() => setSelectedAlertId(alert.id)}
                  onViewFeed={() => handleViewFeed(alert.id)}
                  onAcknowledge={() => handleAcknowledge(alert.id)}
                  onDispatch={() => handleDispatch(alert.id)}
                  onReport={() => handleReport(alert.id)}
                />
              ))}

              {/* Compact Cards Row */}
              <div className="grid grid-cols-2 gap-4">
                <CompactCard 
                  title="Vehicle Alert - Riyadh Ring Road"
                  icon="vehicle"
                  image="https://i.postimg.cc/143zrMkL/Whats-App-Image-2025-12-12-at-00-13-30.jpg"
                  details={[
                    { label: 'Plate', value: 'KSA 1234 ABC' },
                    { label: 'Model', value: 'Toyota Camry (White)' },
                    { label: 'Status', value: 'Stolen Vehicle Report' },
                    { label: 'Risk Level', value: 'High (78/100)', color: 'text-orange-400' },
                  ]}
                  actions={[
                    { label: 'Track Vehicle', onClick: () => showFeedback('Tracking vehicle...', 'info') },
                    { label: 'Verify Owner', onClick: () => setActiveTab('verification') },
                    { label: 'Dispatch Unit', onClick: () => showFeedback('Dispatching traffic unit...', 'warning') }
                  ]}
                />
                <CompactCard 
                  title="Crowd Gathering - Downtown Plaza"
                  icon="crowd"
                  image="https://i.postimg.cc/bdwv9L74/Whats-App-Image-2025-12-12-at-00-13-33.jpg"
                  details={[
                    { label: 'Location', value: 'King Fahd Plaza' },
                    { label: 'Density', value: 'High' },
                    { label: 'Risk Level', value: 'Medium (55/100)', color: 'text-yellow-400' },
                    { label: 'Analysis', value: 'Unusual assembly pattern' },
                  ]}
                  actions={[
                    { label: 'Monitor', onClick: () => showFeedback('Situation under monitoring', 'success') },
                    { label: 'Request Patrol', onClick: () => showFeedback('Patrol requested', 'warning') },
                    { label: 'View Cameras', onClick: () => setShowLiveFeed(true) }
                  ]}
                />
              </div>

              {/* New Manual Check Button */}
              <button 
                onClick={() => setActiveTab('verification')}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">New Manual Check</span>
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen h-screen bg-slate-950 text-slate-200 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader title={getTabTitle()} />
        
        {/* Action Feedback Toast */}
        {actionFeedback && (
          <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-lg shadow-lg font-medium text-sm flex items-center gap-2 animate-pulse ${
            actionFeedback.type === 'success' ? 'bg-green-500 text-white' :
            actionFeedback.type === 'warning' ? 'bg-amber-500 text-black' :
            'bg-cyan-500 text-black'
          }`}>
            {actionFeedback.message}
          </div>
        )}
        
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-900/30">
          {renderContent()}
        </main>
      </div>

      {/* Live Feed Modal */}
      {showLiveFeed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-[80%] max-w-4xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-white">Live Camera Feed</span>
                <span className="flex items-center gap-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE
                </span>
              </div>
              <button 
                onClick={() => setShowLiveFeed(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <LiveFeeds />
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
