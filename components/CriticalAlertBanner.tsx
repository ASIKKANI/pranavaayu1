import React from 'react';
import { AlertTriangle, Wind, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetricData } from '../types';

interface CriticalAlertBannerProps {
  metrics: MetricData[];
}

export const CriticalAlertBanner: React.FC<CriticalAlertBannerProps> = ({ metrics }) => {
  const badMetrics = metrics.filter(m => m.status === 'BAD');
  const hasBad = badMetrics.length > 0;

  return (
    <AnimatePresence mode="wait">
      {hasBad ? (
        <motion.div
          key="alert"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="col-span-full relative overflow-hidden rounded-3xl bg-rose-50/90 dark:bg-rose-900/20 border border-rose-200/60 dark:border-rose-800/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(225,29,72,0.05)] p-6 md:p-8"
          role="alert"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent pointer-events-none" />
          <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex gap-5">
              <div className="p-3.5 bg-rose-100 dark:bg-rose-900/50 rounded-2xl text-rose-600 dark:text-rose-400 shadow-inner">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-rose-900 dark:text-rose-100">
                  Air Quality Alert: Hazardous Levels Detected
                </h3>
                <p className="text-rose-800/70 dark:text-rose-200/70 text-sm max-w-2xl">
                  Elevated {badMetrics.map((m, i) => (
                    <span key={m.id}>
                      {i > 0 && (i === badMetrics.length - 1 ? ' and ' : ', ')}
                      <span className="font-bold">{m.name} ({m.value} {m.unit})</span>
                    </span>
                  ))} levels detected. Automatic ventilation sequences have been initiated.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] transition-all"
            >
              <Wind className="w-4 h-4 group-hover:animate-pulse" />
              <span>Boost Filtration</span>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="ok"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="col-span-full relative overflow-hidden rounded-3xl bg-emerald-50/90 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(34,197,94,0.05)] p-6 md:p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
          <div className="relative flex gap-5 items-center">
            <div className="p-3.5 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl text-emerald-600 dark:text-emerald-400 shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                All Systems Nominal
              </h3>
              <p className="text-emerald-800/70 dark:text-emerald-200/70 text-sm">
                All air quality parameters are within acceptable limits. Environment is healthy.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};