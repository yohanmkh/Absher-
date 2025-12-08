export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Vehicle {
  plate: string;
  make: string;
  model: string;
  color: string;
  year: string;
}

export interface Person {
  id: string;
  name: string;
  nameAr: string;
  age: number;
  imageUrl: string;
  history: string[];
}

export interface Alert {
  id: string;
  type: string;
  location: string;
  timestamp: string;
  riskLevel: RiskLevel;
  description: string;
  coordinates: { x: number; y: number };
  status: 'active' | 'investigating' | 'resolved';
  person?: Person;
  vehicle?: Vehicle;
}

export interface AiAnalysisResult {
  riskScore: number;
  reasoning: string;
  recommendation: string;
  threatVectors: string[];
  historicalCorrelation: string;
}