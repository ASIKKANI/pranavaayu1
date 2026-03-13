import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Thermometer, Droplets, Cloud, Wind, Activity, Sun, AlertTriangle, CloudFog } from 'lucide-react';
import { MetricData } from '../types';

// Map icon string to component
const IconMap: Record<string, any> = {
  Thermometer, Droplets, Cloud, Wind, Activity, Sun, AlertTriangle, CloudFog
};

interface CoreMetricCardProps {
  data: MetricData;
}

export const CoreMetricCard: React.FC<CoreMetricCardProps> = ({ data }) => {
  const Icon = IconMap[data.icon] || Activity;
  
  // Number Counter Animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(data.id === 'co2' ? 0 : 2));
  
  useEffect(() => {
    const controls = animate(count, data.value, { duration: 2.5, ease: "circOut" });
    return controls.stop;
  }, [data.value]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(34,197,94,0.05)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-emerald-800/60 dark:text-emerald-300/60 uppercase tracking-widest">{data.name}</span>
        </div>
        
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100/80 dark:bg-emerald-900/40 border border-emerald-200/50 dark:border-emerald-800 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">{data.status}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-2">
        <div className="flex items-baseline gap-1">
            <motion.span className="text-5xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter">
                {rounded}
            </motion.span>
            <span className="text-lg font-medium text-emerald-600/60 dark:text-emerald-400/60">{data.unit}</span>
        </div>
      </div>

      {/* Stylized Sparkline */}
      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-30 dark:opacity-20 group-hover:opacity-50 transition-opacity">
        <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
            <path d="M0,50 Q25,20 50,40 T100,10" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" />
            <path d="M0,50 Q25,20 50,40 T100,10 V50 H0" fill="currentColor" className="text-emerald-200 dark:text-emerald-800" />
        </svg>
      </div>
    </motion.div>
  );
};