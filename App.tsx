import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DASHBOARD_DATA } from './constants';
import { DashboardData } from './types';
import { csvToDashboardData } from './csvParser';
import { LivingBackground } from './components/LivingBackground';
import { DashboardHeader } from './components/DashboardHeader';
import { CriticalAlertBanner } from './components/CriticalAlertBanner';
import { CoreMetricCard } from './components/CoreMetricCard';
import { MatrixMetricCard } from './components/MatrixMetricCard';
import { IndexCard } from './components/IndexCard';
import { ThemeProvider } from './ThemeContext';

const DashboardContent: React.FC = () => {
  const [dashData, setDashData] = useState<DashboardData>(DASHBOARD_DATA);

  const handleImportCSV = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = csvToDashboardData(text);
      if (parsed) {
        setDashData(parsed);
      } else {
        alert('Could not parse CSV file. Please check the format.');
      }
    };
    reader.readAsText(file);
  }, []);

  // Split data: core are temp, humidity, co2
  const coreMetrics = useMemo(() =>
    dashData.metrics.filter(m => ['temp', 'humidity', 'co2'].includes(m.id)),
    [dashData]);

  const matrixMetrics = useMemo(() =>
    dashData.metrics.filter(m => !['temp', 'humidity', 'co2'].includes(m.id)),
    [dashData]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <LivingBackground />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        animate={{ scale: [1, 1.002, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <DashboardHeader
          lastUpdated={dashData.lastUpdated}
          deviceId={dashData.deviceId}
          systemStatus={dashData.systemStatus}
          onImportCSV={handleImportCSV}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={dashData.lastUpdated} // re-animate on data change
        >
          {/* Row 1: Alert Banner */}
          <CriticalAlertBanner metrics={dashData.metrics} />

          {/* Row 2: Core Metrics */}
          <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreMetrics.map(metric => (
              <CoreMetricCard key={metric.id} data={metric} />
            ))}
          </div>

          {/* Row 3: Index Cards (if present) */}
          {dashData.indices.length > 0 && (
            <div className="col-span-full">
              <h3 className="text-sm font-bold text-emerald-800/50 dark:text-emerald-100/30 uppercase tracking-widest mb-4 ml-1">
                Performance Indices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {dashData.indices.map(idx => (
                  <IndexCard key={idx.id} data={idx} />
                ))}
              </div>
            </div>
          )}

          {/* Row 4: The Matrix */}
          <div className="col-span-full">
            <h3 className="text-sm font-bold text-emerald-800/50 dark:text-emerald-100/30 uppercase tracking-widest mb-4 ml-1">
              Detailed Telemetry
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {matrixMetrics.map(metric => (
                <MatrixMetricCard key={metric.id} data={metric} />
              ))}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
};

export default App;