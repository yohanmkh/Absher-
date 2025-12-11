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
      imageUrl: require('./assets/WhatsApp Image 2025-12-11 at 20.54.09.jpeg'), // Local photo
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
    name: 'Local Photo 1', 
    url: require('./assets/WhatsApp Image 2025-12-11 at 20.54.09.jpeg')
  },
  { 
    id: 2, 
    name: 'Local Photo 2', 
    url: require('./assets/WhatsApp Image 2025-12-11 at 20.55.13.jpeg')
  },
];

export const MAP_STYLES = {
  default: "grayscale opacity-50 hover:opacity-100 transition-opacity duration-500",
  active: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
};