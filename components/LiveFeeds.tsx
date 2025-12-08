import React, { useState } from 'react';
import { CAMERAS } from '../constants';
import { Radio, Maximize2, X, Activity } from 'lucide-react';

export const LiveFeeds: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<typeof CAMERAS[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 h-full">
        {CAMERAS.map((cam) => (
          <button 
            key={cam.id} 
            onClick={() => setSelectedCamera(cam)}
            className="relative group overflow-hidden rounded-lg border border-slate-800 bg-black hover:border-cyan-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-full h-full text-left"
          >
            {/* Simulated Image */}
            <img 
              src={cam.url} 
              alt={cam.name} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 grayscale-[0.3] contrast-125" 
            />
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[10px] w-full animate-scan pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

            {/* Overlay Info */}
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 border border-cyan-900/50 flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse-fast"></div>
               REC
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/50 px-1 rounded">
              {cam.name}
            </div>
            
            {/* Hover Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Maximize2 className="w-8 h-8 text-white/80 drop-shadow-lg" />
            </div>
          </button>
        ))}
      </div>

      {/* Modal View */}
      {selectedCamera && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200">
           {/* Close Button */}
           <button 
             onClick={() => setSelectedCamera(null)}
             className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[110]"
           >
             <X className="w-8 h-8" />
           </button>

           <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg border border-slate-800 overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img 
                src={selectedCamera.url} 
                alt={selectedCamera.name} 
                className="w-full h-full object-cover" 
              />
              
              {/* Large View Overlays */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>
              
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start">
                 <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                       <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                       {selectedCamera.name}
                    </h2>
                    <p className="text-sm text-slate-400 font-mono mt-1">ID: CAM-{selectedCamera.id}09 • STREAM: 4K • LATENCY: 24ms</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/50 text-red-500 text-xs font-bold rounded animate-pulse">LIVE</span>
                    <span className="px-2 py-1 bg-cyan-900/30 border border-cyan-800 text-cyan-400 text-xs font-mono rounded">AI ANALYSIS ACTIVE</span>
                 </div>
              </div>

              {/* Data Overlay Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                 <div className="flex items-end justify-between">
                    <div className="font-mono text-xs text-green-500 space-y-1">
                       <p>NO ACTIVE THREATS DETECTED IN FOV</p>
                       <p className="text-slate-500">Objects: 0 | Vehicles: 4 | Pedestrians: 12</p>
                    </div>
                    <Activity className="w-12 h-6 text-cyan-500" />
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};