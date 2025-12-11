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

   const selectedAlert = MOCK_ALERTS.find(a => a.id === selectedAlertId) || null;

   // Dismiss handler: remove alert from list
   const handleDismiss = () => {
      if (selectedAlertId) {
         setSelectedAlertId(null);
         // Optionally, remove from MOCK_ALERTS if you want to hide it
      }
   };

   // Monitor handler: add to monitored list
   const handleMonitor = () => {
      if (selectedAlertId && !monitoredAlerts.includes(selectedAlertId)) {
         setMonitoredAlerts([...monitoredAlerts, selectedAlertId]);
      }
   };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Header />
      
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
        <section className="col-span-1 md:col-span-7 flex flex-col gap-6 h-full overflow-y-auto md:overflow-hidden">
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[65%]">
              {/* Alerts List */}
              <div className="lg:col-span-1 h-full">
                 <AlertsList 
                    alerts={MOCK_ALERTS} 
                    selectedId={selectedAlertId} 
                    onSelect={setSelectedAlertId} 
                 />
              </div>

              {/* Intelligence Panel (AI) */}
              <div className="lg:col-span-2 h-full glass-panel rounded-xl p-4 shadow-lg border-t-2 border-t-cyan-500">
                 <IntelligencePanel alert={selectedAlert} />
              </div>
           </div>

           {/* Action Center */}
           <div className="h-[35%] flex flex-col justify-end pb-4">
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
