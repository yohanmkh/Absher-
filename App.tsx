import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader, FilterTabs } from './components/TopHeader';
import { IncidentCard, CompactCard } from './components/IncidentCard';
import { MapPanel } from './components/MapPanel';
import { Modal } from './components/Modal';
import { MOCK_ALERTS } from './constants';
import { RiskLevel } from './types';
import { Plus } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter alerts based on active filter and search
  const filteredAlerts = MOCK_ALERTS.filter(alert => {
    const matchesFilter = activeFilter === 'All' || alert.riskLevel === activeFilter.toUpperCase();
    const matchesSearch = searchQuery === '' || 
      alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedAlert = MOCK_ALERTS.find(a => a.id === selectedAlertId) || null;

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <div className="h-full p-6">
            <div className="h-full rounded-xl overflow-hidden">
              <MapPanel 
                alerts={MOCK_ALERTS}
                selectedAlertId={selectedAlertId}
                onSelectAlert={setSelectedAlertId}
              />
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
              {filteredAlerts.filter(a => a.person).map(alert => (
                <IncidentCard 
                  key={alert.id}
                  alert={alert}
                  onSelect={() => setSelectedAlertId(alert.id)}
                />
              ))}

              {/* Compact Cards Row */}
              <div className="grid grid-cols-2 gap-4">
                <CompactCard 
                  title="Vehicle Alert - Riyadh Ring Road"
                  icon="vehicle"
                  details={[
                    { label: 'Plate', value: 'KSA 1234 ABC' },
                    { label: 'Model', value: 'Toyota Camry (White)' },
                    { label: 'Status', value: 'Stolen Vehicle Report' },
                    { label: 'Risk Level', value: 'High (78/100)', color: 'text-orange-400' },
                  ]}
                  actions={['Track Vehicle', 'Verify Owner', 'Dispatch Traffic Unit']}
                />
                <CompactCard 
                  title="Crowd Gathering - Downtown Plaza"
                  icon="crowd"
                  details={[
                    { label: 'Location', value: 'King Fahd Plaza' },
                    { label: 'Density', value: 'High' },
                    { label: 'Risk Level', value: 'Medium (55/100)', color: 'text-yellow-400' },
                    { label: 'Analysis', value: 'Unusual assembly pattern' },
                  ]}
                  actions={['Monitor Situation', 'Request Patrol', 'View Nearby Cameras']}
                />
              </div>

              {/* New Manual Check Button */}
              <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl text-slate-400 hover:text-cyan-400 transition-colors">
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
        <TopHeader title="LIVE ALERTS & INCIDENTS" />
        
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-900/30">
          {renderContent()}
        </main>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
