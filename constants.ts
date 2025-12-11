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
  imageUrl: 'https://i.postimg.cc/TKJPdmVk/Whats-App-Image-2025-12-11-at-20-54-09.jpg', // External photo
      history: ['Speeding (3x)', 'Red Light Violation', 'Restricted Zone Entry (3x)']
    }
  },
  {
    id: 'ALT-2024-900',
    type: 'Unauthorized Entry',
    location: 'Diplomatic Quarter',
    timestamp: '15:10:22',
    riskLevel: RiskLevel.HIGH,
    description: 'Individual detected breaching restricted area perimeter.',
    coordinates: { x: 60, y: 40 },
    status: 'active',
    person: {
      id: '2059841234',
      name: 'Sara Al-Mutairi',
      nameAr: 'سارة المطيري',
      age: 34,
      imageUrl: 'https://i.postimg.cc/RWL0Sf7g/Whats-App-Image-2025-12-11-at-20-55-13.jpg',
      history: ['Access Violation', 'Previous Trespassing']
    }
  },
  {
    id: 'ALT-2024-901',
    type: 'Suspicious Package',
    location: 'Riyadh Metro Station',
    timestamp: '15:22:10',
    riskLevel: RiskLevel.MEDIUM,
    description: 'Unattended package reported by security camera.',
    coordinates: { x: 30, y: 60 },
    status: 'active',
    person: {
      id: '3098127654',
      name: 'Fahad Al-Qahtani',
      nameAr: 'فهد القحطاني',
      age: 41,
      imageUrl: 'https://i.postimg.cc/TKJPdmVk/Whats-App-Image-2025-12-11-at-20-54-09.jpg',
      history: ['Lost Property (2x)', 'Security Check (1x)']
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
    name: 'Photo 1', 
    url: 'https://i.postimg.cc/TKJPdmVk/Whats-App-Image-2025-12-11-at-20-54-09.jpg'
  },
  { 
    id: 2, 
    name: 'Photo 2', 
    url: 'https://i.postimg.cc/RWL0Sf7g/Whats-App-Image-2025-12-11-at-20-55-13.jpg'
  },
  { 
    id: 3, 
    name: 'Photo 3', 
    url: 'https://i.postimg.cc/143zrMkL/Whats-App-Image-2025-12-12-at-00-13-30.jpg'
  },
  { 
    id: 4, 
    name: 'Photo 4', 
    url: 'https://i.postimg.cc/bdwv9L74/Whats-App-Image-2025-12-12-at-00-13-33.jpg'
  },
];

export const MAP_STYLES = {
  default: "grayscale opacity-50 hover:opacity-100 transition-opacity duration-500",
  active: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
};