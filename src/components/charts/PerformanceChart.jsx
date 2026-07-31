"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

export default function PerformanceChart({ data }) {
  // Sort data logically by rating value to make the chart meaningful
  const sortOrder = {
    "Needs Improvement": 1,
    "Meets Expectations": 2,
    "Exceeds Expectations": 3,
    "Outstanding": 4
  };
  
  const sortedData = [...data].sort((a, b) => sortOrder[a.rating] - sortOrder[b.rating]);

  // Map different colors to each bar
  const colors = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm p-3 rounded-lg text-sm">
          <p className="font-semibold text-slate-800 mb-1">{label}</p>
          <p className="text-slate-600">
            <span className="font-medium text-slate-900">{payload[0].value}</span>{" "}
            {payload[0].value === 1 ? 'Employee' : 'Employees'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl p-6 flex flex-col h-full animate-fade-in" style={{ animationDelay: '100ms' }}>
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Performance Ratings</h3>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sortedData}
            margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="rating" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13, width: 120 }}
              width={140}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar 
              dataKey="count" 
              radius={[0, 6, 6, 0]}
              barSize={32}
              animationDuration={1000}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
