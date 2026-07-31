"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";

export default function HeadcountChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl p-5 h-80 flex flex-col items-center justify-center text-slate-400">
        <TrendingUp size={48} className="mb-3 opacity-20" />
        <p>No growth data available</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
          <p className="font-semibold text-slate-900 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
            <p className="text-slate-600 text-sm">
              <span className="font-medium">Headcount:</span> {payload[0].value}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl p-5 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary-600" />
          Headcount Growth
        </h3>
        <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
          All Time
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHeadcount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
              minTickGap={30}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="headcount" 
              stroke="#4f46e5" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorHeadcount)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
