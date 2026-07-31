import React from 'react';

export default function EmployeeSkeleton({ viewMode = 'grid', count = 8 }) {
  const skeletons = Array(count).fill(0);

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
        {skeletons.map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl overflow-hidden p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-200/50"></div>
              <div className="w-16 h-6 rounded-md bg-slate-200/50"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200/50 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200/50 rounded w-1/2"></div>
              <div className="h-3 bg-slate-200/50 rounded w-5/6"></div>
            </div>
            <div className="mt-6 flex gap-2">
              <div className="h-8 bg-slate-200/50 rounded w-full"></div>
              <div className="h-8 bg-slate-200/50 rounded w-8"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List view skeleton
  return (
    <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-300/70">
              <th className="px-6 py-4"><div className="h-4 bg-slate-200/50 rounded w-24"></div></th>
              <th className="px-6 py-4"><div className="h-4 bg-slate-200/50 rounded w-24"></div></th>
              <th className="px-6 py-4"><div className="h-4 bg-slate-200/50 rounded w-24"></div></th>
              <th className="px-6 py-4"><div className="h-4 bg-slate-200/50 rounded w-16"></div></th>
              <th className="px-6 py-4 text-right"><div className="h-4 bg-slate-200/50 rounded w-12 ml-auto"></div></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {skeletons.map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200/50"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200/50 rounded w-24"></div>
                      <div className="h-3 bg-slate-200/50 rounded w-32"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200/50 rounded w-24"></div>
                    <div className="h-3 bg-slate-200/50 rounded w-20"></div>
                  </div>
                </td>
                <td className="px-6 py-4"><div className="h-3 bg-slate-200/50 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-6 bg-slate-200/50 rounded w-16"></div></td>
                <td className="px-6 py-4"><div className="h-8 bg-slate-200/50 rounded w-16 ml-auto"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
