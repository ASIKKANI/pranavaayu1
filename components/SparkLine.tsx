import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartPoint } from '../types';

interface SparkLineProps {
  data: ChartPoint[];
  color: string;
  gradientId: string;
}

export const SparkLine: React.FC<SparkLineProps> = ({ data, color, gradientId }) => {
  return (
    <div className="h-16 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};