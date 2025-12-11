import React, { useState } from 'react';
import { Header } from './components/Header';
import { MapPanel } from './components/MapPanel';
import { LiveFeeds } from './components/LiveFeeds';
import { AlertsList } from './components/AlertsList';
import { IntelligencePanel } from './components/IntelligencePanel';
import { ActionCenter } from './components/ActionCenter';
import { Modal } from './components/Modal';
import { MOCK_ALERTS } from './constants';

const App: React.FC = () => {

   const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [monitoredAlerts, setMonitoredAlerts] = useState<string[]>([]);
   const [actionFeedback, setActionFeedback] = useState<string | null>(null);

   const selectedAlert = MOCK_ALERTS.find(a => a.id === selectedAlertId) || null;

   // Show feedback message
   const showFeedback = (message: string) => {
      setActionFeedback(message);
      setTimeout(() => setActionFeedback(null), 3000);
   };

   // Dismiss handler: deselect and show feedback
   const handleDismiss = () => {
      if (selectedAlertId) {
         showFeedback(`Alert ${selectedAlertId} dismissed`);
         setSelectedAlertId(null);
      }
   };

   // Monitor handler: add to monitored list and show feedback
   const handleMonitor = () => {
      if (selectedAlertId && !monitoredAlerts.includes(selectedAlertId)) {
         setMonitoredAlerts([...monitoredAlerts, selectedAlertId]);
         showFeedback(`Alert ${selectedAlertId} is now being monitored`);
      } else if (selectedAlertId) {
         showFeedback(`Alert ${selectedAlertId} is already monitored`);
      }
   };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Header />
      
      {/* Action Feedback Toast */}
      {actionFeedback && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-cyan-500 text-black px-6 py-3 rounded-lg shadow-lg font-bold text-sm animate-pulse">
          {actionFeedback}
        </div>
      )}
      
      <main className="p-4 md:p-6 h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-12 gap-6 overflow-hidden">
        
        {/* LEFT COLUMN: Monitoring (Map & Feeds) */}
        <section className="col-span-1 md:col-span-5 flex flex-col gap-6 h-full overflow-y-auto md:overflow-hidden">
          {/* Map Section */}
          <div className="h-[45%] glass-panel rounded-xl p-1 relative shadow-lg">
             <div className="absolute top-3 left-3 z-10 bg-slate-900/80 px-2 py-1 rounded border border-slate-700 text-xs font-mono text-cyan-400">
                GEOSPATIAL MONITORING
             </div>
             <MapPanel 
                alerts={MOCK_ALERTS} 
                selectedAlertId={selectedAlertId} 
                onSelectAlert={setSelectedAlertId} 
             />
          </div>
          
          {/* Live Feeds Section */}
          <div className="h-[55%] flex flex-col">
             <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Active Camera Feeds
             </h3>
             <LiveFeeds />
          </div>
        </section>

        {/* RIGHT COLUMN: Intelligence & Actions */}
        <section className="col-span-1 md:col-span-7 flex flex-col gap-6 h-full overflow-y-auto">
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
              {/* Alerts List */}
              <div className="lg:col-span-1 h-full min-h-[300px] max-h-[400px] overflow-hidden">
                 <AlertsList 
                    alerts={MOCK_ALERTS} 
                    selectedId={selectedAlertId} 
                    onSelect={setSelectedAlertId} 
                 />
              </div>

              {/* Intelligence Panel (AI) */}
              <div className="lg:col-span-2 h-full min-h-[300px] glass-panel rounded-xl p-4 shadow-lg border-t-2 border-t-cyan-500 overflow-y-auto">
                 <IntelligencePanel alert={selectedAlert} />
              </div>
           </div>

           {/* Action Center */}
           <div className="shrink-0 pb-4">
              <div className="glass-panel p-6 rounded-xl border-t border-slate-700 bg-gradient-to-b from-slate-900/50 to-slate-950/80">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                       Command & Control Actions
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">
                       AUTH: OFFICER LEVEL 4
                    </span>
                 </div>
                 <ActionCenter 
                    alert={selectedAlert} 
                    onDismiss={handleDismiss}
                    onMonitor={handleMonitor}
                    onReport={() => setIsModalOpen(true)} 
                 />
              </div>
              
              <div className="flex justify-between items-center mt-4 text-[10px] text-slate-600 font-mono uppercase">
                  <span>Smart Continuous Risk Analysis</span>
                  <span className="hidden md:inline">|</span>
                  <span>Instant ID Verification</span>
                  <span className="hidden md:inline">|</span>
                  <span>Real-time Decision Support</span>
              </div>
           </div>
        </section>

      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
