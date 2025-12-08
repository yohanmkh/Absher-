import { Alert, RiskLevel } from './types';

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'ALT-2024-892',
    type: 'Hit and Run Incident',
    location: 'King Fahd Rd / Takhassusi St',
    timestamp: '14:32:05',
    riskLevel: RiskLevel.CRITICAL,
    description: 'Vehicle detected fleeing scene of collision near Kingdom Centre. Speed: 140km/h.',
    coordinates: { x: 45, y: 35 },
    status: 'active',
    vehicle: {
      plate: '970-ABC',
      make: 'Toyota',
      model: 'Camry',
      color: 'White',
      year: '2021'
    },
    person: {
      id: '1048592311',
      name: 'Khalid Al-Rimal',
      nameAr: 'خالد الرمال',
      age: 28,
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', // Portrait of a man
      history: ['Speeding (3x)', 'Red Light Violation', 'Restricted Zone Entry (3x)']
    }
  },
  {
    id: 'ALT-2024-891',
    type: 'Suspicious Behavior',
    location: 'Al Olaya St, Near Faisaliah',
    timestamp: '14:15:00',
    riskLevel: RiskLevel.MEDIUM,
    description: 'Individual lingering near secure facility perimeter for > 20 mins.',
    coordinates: { x: 55, y: 55 },
    status: 'investigating'
  },
  {
    id: 'ALT-2024-889',
    type: 'Vehicle Theft Attempt',
    location: 'Riyadh Park, Northern Ring Rd',
    timestamp: '13:55:22',
    riskLevel: RiskLevel.HIGH,
    description: 'Forced entry detected on parked luxury vehicle in VIP section.',
    coordinates: { x: 30, y: 20 },
    status: 'active'
  }
];

export const CAMERAS = [
  { 
    id: 1, 
    name: 'King Fahd Rd (N)', 
    url: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1000&auto=format&fit=crop' 
  }, // Riyadh Highway/Architecture
  { 
    id: 2, 
    name: 'Takhassusi St (North)', 
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000&auto=format&fit=crop' 
  }, // City Traffic / Street View
  { 
    id: 3, 
    name: 'Olaya District Main', 
    url: 'https://images.unsplash.com/photo-1551041777-ed02bed74fc4?q=80&w=1000&auto=format&fit=crop' 
  }, // Riyadh Skyline
  { 
    id: 4, 
    name: 'Kingdom Centre Ext', 
    url: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=1000&auto=format&fit=crop'
  }, // Kingdom Centre Night
];

export const MAP_STYLES = {
  default: "grayscale opacity-50 hover:opacity-100 transition-opacity duration-500",
  active: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
};