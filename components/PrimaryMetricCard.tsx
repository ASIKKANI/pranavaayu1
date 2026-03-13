import React from 'react';
import { MetricData, ChartPoint } from '../types';
import { StatusBadge } from './StatusBadge';
import { SparkLine } from './SparkLine';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

interface PrimaryMetricCardProps {
  data: MetricData;
  history: ChartPoint[];
  index: number;
}

export const PrimaryMetricCard: React.FC<PrimaryMetricCardProps> = ({ data, history, index }) => {
  const getIcon = () => {
    switch (data.id) {
      case 'temp': return <Thermometer className="w-5 h-5 text-slate-400 dark:text-slate-500" />;
      case 'humidity': return <Droplets className="w-5 h-5 text-slate-400 dark:text-slate-500" />;
      case 'co2': return <Wind className="w-5 h-5 text-slate-400 dark:text-slate-500" />;
      default: return <Wind className="w-5 h-5 text-slate-400 dark:text-slate-500" />;
    }
  };

  const getChartColor = (status: string) => {
    switch (status) {
      case 'BAD': return '#be123c'; // Rose 700
      case 'GOOD': return '#b45309'; // Amber 700
      default: return '#10b981'; // Emerald 500 (Brighter for dark mode compatibility)
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800 relative overflow-hidden group"
    >
        {/* Decorative background glow */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-[0.03] group-hover:opacity-10 dark:group-hover:opacity-10 transition-opacity">
             {/* Giant background icon decoration */}
             {React.cloneElement(getIcon() as React.ReactElement<any>, { className: 'w-24 h-24 text-slate-900 dark:text-white' })}
        </div>

      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl transition-colors duration-300">
             {getIcon()}
          </div>
          <span className="text-slate-500 dark:text-slate-400 font-medium text-sm tracking-wide uppercase">{data.chemical || data.name}</span>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <div className="mt-4 relative z-10">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{data.value}</span>
          <span className="text-slate-400 dark:text-slate-500 text-lg font-medium">{data.unit}</span>
        </div>
      </div>

      <SparkLine 
        data={history} 
        color={getChartColor(data.status)} 
        gradientId={`grad-${data.id}`}
      />
    </motion.div>
  );
};