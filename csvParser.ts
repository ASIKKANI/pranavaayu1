import { DashboardData, MetricData, IndexData, QualityStatus, MetricCategory } from './types';

// ── Thresholds for determining QualityStatus ──
interface Threshold {
    best: [number, number]; // [min, max] inclusive range for BEST
    good: [number, number]; // [min, max] inclusive range for GOOD
}

const THRESHOLDS: Record<string, Threshold> = {
    aqi: { best: [0, 50], good: [0, 100] },
    pm1: { best: [0, 10], good: [0, 25] },
    'pm2.5': { best: [0, 12], good: [0, 35] },
    pm4: { best: [0, 25], good: [0, 50] },
    pm10: { best: [0, 50], good: [0, 100] },
    co2: { best: [0, 600], good: [0, 1000] },
    tvoc: { best: [0, 150], good: [0, 300] },
    nox: { best: [0, 20], good: [0, 40] },
    temperature: { best: [20, 25], good: [18, 28] },
    humidity: { best: [40, 60], good: [30, 70] },
};

function getStatus(metricKey: string, value: number): QualityStatus {
    const t = THRESHOLDS[metricKey.toLowerCase()];
    if (!t) return 'GOOD';
    if (value >= t.best[0] && value <= t.best[1]) return 'BEST';
    if (value >= t.good[0] && value <= t.good[1]) return 'GOOD';
    return 'BAD';
}

// ── CSV column → metric mapping ──
interface ColumnMapping {
    csvHeader: string;
    id: string;
    name: string;
    unit: string;
    category: MetricCategory;
    icon: string;
    thresholdKey: string;
}

const COLUMN_MAP: ColumnMapping[] = [
    { csvHeader: 'aqi', id: 'aqi', name: 'AQI', unit: 'µg/m³', category: 'Gases', icon: 'Activity', thresholdKey: 'aqi' },
    { csvHeader: 'pm1', id: 'pm1', name: 'PM1', unit: 'µg/m³', category: 'Particulates', icon: 'Wind', thresholdKey: 'pm1' },
    { csvHeader: 'pm2.5', id: 'pm25', name: 'PM2.5', unit: 'µg/m³', category: 'Particulates', icon: 'Wind', thresholdKey: 'pm2.5' },
    { csvHeader: 'pm4', id: 'pm4', name: 'PM4', unit: 'µg/m³', category: 'Particulates', icon: 'Wind', thresholdKey: 'pm4' },
    { csvHeader: 'pm10', id: 'pm10', name: 'PM10', unit: 'µg/m³', category: 'Particulates', icon: 'Wind', thresholdKey: 'pm10' },
    { csvHeader: 'co2', id: 'co2', name: 'CO2', unit: 'ppm', category: 'Gases', icon: 'Cloud', thresholdKey: 'co2' },
    { csvHeader: 'tvoc', id: 'tvoc', name: 'TVOC', unit: 'ppb', category: 'Compounds', icon: 'Activity', thresholdKey: 'tvoc' },
    { csvHeader: 'nox', id: 'nox', name: 'NOx', unit: 'µg/m³', category: 'Gases', icon: 'Wind', thresholdKey: 'nox' },
    { csvHeader: 'temperature', id: 'temp', name: 'TEMP', unit: '°C', category: 'Environment', icon: 'Thermometer', thresholdKey: 'temperature' },
    { csvHeader: 'humidity', id: 'humidity', name: 'HUMIDITY', unit: '%RH', category: 'Environment', icon: 'Droplets', thresholdKey: 'humidity' },
];

// Normalize CSV header to a simple lowercase key, stripping units in parentheses
function normalizeHeader(h: string): string {
    return h
        .replace(/\(.*?\)/g, '')   // remove (µg/m³), (ppm), etc.
        .replace(/[^a-z0-9.]/gi, '') // keep only alphanum and dot
        .toLowerCase()
        .trim();
}

export function parseCSVText(text: string): { headers: string[]; rows: string[][] } {
    const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
    if (lines.length === 0) return { headers: [], rows: [] };

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(line => line.split(',').map(v => v.trim()));
    return { headers, rows };
}

export function csvToDashboardData(text: string): DashboardData | null {
    const { headers, rows } = parseCSVText(text);
    if (headers.length === 0 || rows.length === 0) return null;

    // Use the LAST row (most recent reading)
    const row = rows[rows.length - 1];

    // Build a normalized header → value map
    const dataMap: Record<string, string> = {};
    headers.forEach((h, i) => {
        dataMap[normalizeHeader(h)] = row[i] || '';
    });

    // Extract deviceId and date
    const deviceId = dataMap['deviceid'] || 'Unknown';
    const rawDate = dataMap['date'] || '';
    const lastUpdated = rawDate || new Date().toLocaleString();

    // Build metrics
    const metrics: MetricData[] = [];
    for (const col of COLUMN_MAP) {
        const rawVal = dataMap[col.csvHeader];
        if (rawVal === undefined || rawVal === '') continue;
        const value = parseFloat(rawVal);
        if (isNaN(value)) continue;

        metrics.push({
            id: col.id,
            name: col.name,
            value,
            unit: col.unit,
            status: getStatus(col.thresholdKey, value),
            category: col.category,
            icon: col.icon,
        });
    }

    // Build indices
    const indices: IndexData[] = [];
    const indexMap: { key: string; name: string; color: string }[] = [
        { key: 'healthindex', name: 'Health Index', color: '#ef4444' },
        { key: 'productivityindex', name: 'Productivity Index', color: '#3b82f6' },
        { key: 'energyindex', name: 'Energy Index', color: '#f59e0b' },
    ];

    for (const idx of indexMap) {
        const rawVal = dataMap[idx.key];
        if (rawVal === undefined || rawVal === '') continue;
        const value = parseFloat(rawVal);
        if (isNaN(value)) continue;
        indices.push({
            id: idx.key,
            name: idx.name,
            value,
            unit: '%',
            color: idx.color,
        });
    }

    // Determine system status
    const hasBad = metrics.some(m => m.status === 'BAD');
    const hasGood = metrics.some(m => m.status === 'GOOD');
    const systemStatus = hasBad ? 'Attention Required' : hasGood ? 'Moderate' : 'Optimal';

    return {
        deviceId,
        lastUpdated,
        systemStatus,
        metrics,
        indices,
    };
}
