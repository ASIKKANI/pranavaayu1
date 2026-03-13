import { DashboardData } from './types';

export const DASHBOARD_DATA: DashboardData = {
  deviceId: 'DEMO_UNIT',
  lastUpdated: "2024-08-16 | 11:32:11 IST",
  systemStatus: "Attention Required",
  indices: [],
  metrics: [
    { id: 'pm25', name: 'PM2.5', value: 40, unit: 'ug/m3', status: 'BAD', category: 'Particulates', icon: 'Wind' },
    { id: 'pm10', name: 'PM10', value: 49, unit: 'ug/m3', status: 'BEST', category: 'Particulates', icon: 'Wind' },
    { id: 'co2', name: 'CO2', value: 450, unit: 'ppm', status: 'BEST', category: 'Gases', icon: 'Cloud' },
    { id: 'o3', name: 'O3', value: 20, unit: 'ppb', status: 'BEST', category: 'Gases', icon: 'Sun' },
    { id: 'tvoc', name: 'TVOC', value: 225, unit: 'ppb', status: 'GOOD', category: 'Compounds', icon: 'Activity' },
    { id: 'temp', name: 'TEMP', value: 21.03, unit: '°C', status: 'BEST', category: 'Environment', icon: 'Thermometer' },
    { id: 'humidity', name: 'HUMIDITY', value: 69.08, unit: '%RH', status: 'GOOD', category: 'Environment', icon: 'Droplets' },
    { id: 'co', name: 'CO', value: 500, unit: 'ppb', status: 'BEST', category: 'Gases', icon: 'CloudFog' },
    { id: 'ch2o', name: 'CH2O', value: 70, unit: 'ppb', status: 'BAD', category: 'Compounds', icon: 'AlertTriangle' },
    { id: 'so2', name: 'SO2', value: 2.6, unit: 'ppb', status: 'BEST', category: 'Gases', icon: 'Wind' },
    { id: 'no2', name: 'NO2', value: 10, unit: 'ppb', status: 'BEST', category: 'Gases', icon: 'Wind' },
    { id: 'pm1', name: 'PM1', value: 22, unit: 'ug/m3', status: 'GOOD', category: 'Particulates', icon: 'Wind' }
  ]
};