import React from 'react';
import { motion } from 'framer-motion';
import { IndexData } from '../types';

interface IndexCardProps {
    data: IndexData;
}

export const IndexCard: React.FC<IndexCardProps> = ({ data }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (data.value / 100) * circumference;

    // Color based on value
    const getColor = (val: number) => {
        if (val >= 70) return { ring: '#22c55e', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-300', label: 'EXCELLENT' };
        if (val >= 40) return { ring: '#f59e0b', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-300', label: 'MODERATE' };
        return { ring: '#ef4444', bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-700 dark:text-rose-300', label: 'POOR' };
    };

    const colors = getColor(data.value);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            className={`${colors.bg} backdrop-blur-xl border border-white/40 dark:border-slate-700 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] flex flex-col items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
        >
            {/* Circular Progress Ring */}
            <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle
                        cx="40" cy="40" r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-slate-200 dark:text-slate-700"
                    />
                    <motion.circle
                        cx="40" cy="40" r={radius}
                        fill="none"
                        stroke={colors.ring}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 2, ease: "circOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xl font-black ${colors.text}`}>{data.value}%</span>
                </div>
            </div>

            <div className="text-center">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{data.name}</p>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${colors.text}`}>{colors.label}</p>
            </div>
        </motion.div>
    );
};
