import React from 'react';
import { QualityStatus } from '../types';

interface StatusBadgeProps {
  status: QualityStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorClass = '';

  switch (status) {
    case 'BEST':
      colorClass = 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
      break;
    case 'GOOD':
      colorClass = 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
      break;
    case 'BAD':
      colorClass = 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800';
      break;
    default:
      colorClass = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide border ${colorClass} uppercase shadow-sm`}>
      {status}
    </span>
  );
};