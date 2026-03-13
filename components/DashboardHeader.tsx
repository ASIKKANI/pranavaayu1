import React, { useRef } from 'react';
import { Leaf, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  lastUpdated: string;
  deviceId?: string;
  systemStatus?: string;
  onImportCSV?: (file: File) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ lastUpdated, deviceId, systemStatus, onImportCSV }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImportCSV) {
      onImportCSV(file);
    }
    // Reset so same file can be re-imported
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const statusColor = systemStatus === 'Optimal'
    ? 'bg-emerald-500'
    : systemStatus === 'Moderate'
      ? 'bg-amber-500'
      : 'bg-rose-500';

  const statusTextColor = systemStatus === 'Optimal'
    ? 'text-emerald-600 dark:text-emerald-400'
    : systemStatus === 'Moderate'
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-rose-600 dark:text-rose-400';

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="p-2.5 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-xl backdrop-blur-sm border border-emerald-200/30"
        >
          <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-950 dark:text-emerald-50">PRANAVAAYU</h1>
          <p className="text-xs text-emerald-700/70 dark:text-emerald-400/70 font-semibold tracking-widest uppercase">
            {deviceId && deviceId !== 'DEMO_UNIT' ? deviceId : 'Garden Air Ecosystem V5'}
          </p>
        </div>
      </div>

      {/* Right Section: Import + Status */}
      <div className="flex items-center gap-3">
        {/* CSV Import Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(34,197,94,0.3)] transition-all text-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Import CSV</span>
        </motion.button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Live Status Cluster */}
        <div className="flex items-center gap-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/40 dark:border-slate-700 shadow-sm">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800/60 dark:text-emerald-200/60">Last Updated</span>
            <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100 font-mono">{lastUpdated}</span>
          </div>

          <div className="h-8 w-px bg-emerald-900/10 dark:bg-white/10 mx-1"></div>

          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-4 h-4">
              <motion.div
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className={`absolute inset-0 rounded-full ${statusColor}`}
              />
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                className={`absolute inset-0 rounded-full ${statusColor}`}
              />
              <div className={`relative w-2.5 h-2.5 rounded-full ${statusColor} shadow-lg`} />
            </div>
            <span className={`text-xs font-bold ${statusTextColor} tracking-wide`}>LIVE FEED</span>
          </div>
        </div>
      </div>
    </div>
  );
};