export type QualityStatus = 'BEST' | 'GOOD' | 'BAD';
export type MetricCategory = 'Particulates' | 'Gases' | 'Compounds' | 'Environment';

export interface ChartPoint {
  value: number;
  [key: string]: any;
}

export interface MetricData {
  id: string;
  name: string;
  chemical?: string;
  value: number;
  unit: string;
  status: QualityStatus;
  category: MetricCategory;
  icon: string; // key for the icon component
}

export interface IndexData {
  id: string;
  name: string;
  value: number;
  unit: string;
  color: string;
}

export interface DashboardData {
  deviceId: string;
  lastUpdated: string;
  systemStatus: string;
  metrics: MetricData[];
  indices: IndexData[];
}