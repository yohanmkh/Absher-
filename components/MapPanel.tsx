import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Alert } from '../types';
import { MapPin } from 'lucide-react';

interface MapPanelProps {
  alerts: Alert[];
  selectedAlertId: string | null;
  onSelectAlert: (id: string) => void;
}

export const MapPanel: React.FC<MapPanelProps> = ({ alerts, selectedAlertId, onSelectAlert }) => {
  const mapRef = useRef(null);

  // Fix Leaflet marker icons issue
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group">
       {/* Interactive Map */}
       <div className="absolute inset-0 z-0 rounded-xl" style={{ height: '100%', width: '100%' }}>
         <MapContainer
           ref={mapRef}
           center={[24.7136, 46.6753]}
           zoom={12}
           scrollWheelZoom={true}
           style={{ width: '100%', height: '100%', zIndex: 10, position: 'relative' }}
           className="rounded-xl"
         >
           <TileLayer
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             maxZoom={19}
           />
           {alerts.map((alert) => (
             <Marker
               key={alert.id}
               position={[
                 // MapPanel expects coordinates in %, so convert to Riyadh area for demo
                 24.7136 + (alert.coordinates.y - 50) * 0.01,
                 46.6753 + (alert.coordinates.x - 50) * 0.01
               ]}
               eventHandlers={{
                 click: () => onSelectAlert(alert.id)
               }}
             >
               <Popup>
                 <div>
                   <strong>{alert.type}</strong><br />
                   {alert.location}<br />
                   <span className="text-xs text-slate-500">{alert.riskLevel}</span>
                 </div>
               </Popup>
             </Marker>
           ))}
         </MapContainer>
         {/* Overlay Gradient for depth - with reduced opacity */}
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none z-20" style={{ pointerEvents: 'none' }}></div>
       </div>

       {/* Grid Overlay */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-30"></div>
       
       {/* Radar Sweep Effect */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(6,182,212,0.1)_360deg)] animate-[spin_8s_linear_infinite] rounded-full opacity-30"></div>
       </div>

       {/* Alert Pins */}
       {alerts.map((alert) => {
         const isSelected = selectedAlertId === alert.id;
         return (
           <button
             key={alert.id}
             onClick={() => onSelectAlert(alert.id)}
             className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20
                ${isSelected ? 'scale-125 z-30' : 'scale-100 hover:scale-110'}`}
             style={{ left: `${alert.coordinates.x}%`, top: `${alert.coordinates.y}%` }}
           >
             <div className="relative flex items-center justify-center">
                {/* Ping Animation */}
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping 
                  ${alert.riskLevel === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                
                {/* Pin Icon */}
                <div className={`relative p-2 rounded-full border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] 
                  ${isSelected ? 'bg-slate-900 border-white' : 'bg-slate-800 border-slate-600'}
                  ${alert.riskLevel === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'}
                `}>
                  <MapPin className="w-5 h-5 fill-current" />
                </div>
                
                {/* Tooltip */}
                <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/90 text-[10px] text-white whitespace-nowrap border border-slate-700 pointer-events-none transition-opacity z-40
                   ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                   {alert.location}
                </div>
             </div>
           </button>
         );
       })}
       
     <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-500 shadow-lg z-30">
       RIYADH SECTOR • LIVE
     </div>
    </div>
  );
};