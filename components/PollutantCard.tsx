import React from 'react';
import { MetricData } from '../types';
import { StatusBadge } from './StatusBadge';
import { motion } from 'framer-motion';

interface PollutantCardProps {
  data: MetricData;
  index: number;
}

export const PollutantCard: React.FC<PollutantCardProps> = ({ data, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
      whileHover={{ 
        scale: 1.02, 
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        transition: { duration: 0.2 } 
      }}
      className="bg-white/80 dark:bg-slate-900/60 dark:hover:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-lg dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-full group"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-slate-800 dark:text-slate-200 font-bold text-lg leading-none group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{data.name}</h4>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-1" title={data.chemical}>{data.chemical}</p>
        </div>
        <StatusBadge status={data.status} />
      </div>
      
      <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-50 dark:border-slate-800/50">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">{data.value}</span>
          <span className="text-slate-400 dark:text-slate-600 text-xs font-medium">{data.unit}</span>
        </div>
        {/* Visual indicator bar */}
        <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: data.status === 'BAD' ? '90%' : data.status === 'GOOD' ? '60%' : '30%' }}
            transition={{ duration: 1, delay: 0.5 + (index * 0.05) }}
            className={`h-full rounded-full ${
              data.status === 'BAD' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 
              data.status === 'GOOD' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
            }`} 
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};