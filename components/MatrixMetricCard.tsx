import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Cloud, Wind, Activity, Sun, AlertTriangle, CloudFog } from 'lucide-react';
import { MetricData } from '../types';

const IconMap: Record<string, any> = {
  Thermometer, Droplets, Cloud, Wind, Activity, Sun, AlertTriangle, CloudFog
};

interface MatrixMetricCardProps {
  data: MetricData;
}

export const MatrixMetricCard: React.FC<MatrixMetricCardProps> = ({ data }) => {
  const Icon = IconMap[data.icon] || Activity;
  const isBad = data.status === 'BAD';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
      }}
      className={`
        relative rounded-2xl p-5 border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
        ${isBad 
            ? 'bg-gradient-to-br from-white/80 to-rose-50/80 dark:from-slate-900/80 dark:to-rose-950/30 border-rose-200 dark:border-rose-800 shadow-[0_0_20px_rgba(244,63,94,0.15)]' 
            : 'bg-white/50 dark:bg-slate-900/50 border-white/40 dark:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-900/80'
        }
      `}
    >
      {/* Pulse effect for BAD cards */}
      {isBad && (
        <div className="absolute inset-0 rounded-2xl border-2 border-rose-400/30 animate-pulse pointer-events-none" />
      )}

      <div className="flex justify-between items-center h-full">
        <div className="flex flex-col gap-2">
          <div className={`p-2 rounded-lg w-fit ${isBad ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">{data.category}</span>
            <span className={`text-sm font-bold ${isBad ? 'text-rose-900 dark:text-rose-200' : 'text-slate-700 dark:text-slate-200'}`}>{data.name}</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
             <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold tracking-tight ${isBad ? 'text-rose-700 dark:text-rose-400' : 'text-slate-800 dark:text-slate-100'}`}>{data.value}</span>
                <span className="text-xs font-medium text-slate-400">{data.unit}</span>
             </div>
             
             {/* Simple Status Dot */}
             <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-[10px] font-bold uppercase ${isBad ? 'text-rose-600' : data.status === 'GOOD' ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {data.status}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                    isBad ? 'bg-rose-500 animate-pulse' : 
                    data.status === 'GOOD' ? 'bg-amber-500' : 
                    'bg-emerald-500'
                }`} />
             </div>
        </div>
      </div>
    </motion.div>
  );
};