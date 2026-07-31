"use client";

import dynamic from "next/dynamic";

// Dynamically import ApexCharts with SSR disabled
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DepartmentChart({ data }) {
  // Extract labels and series from data
  const labels = data.map((d) => d.department);
  const series = data.map((d) => d.count);

  const options = {
    chart: {
      type: "donut",
      fontFamily: "var(--font-inter), sans-serif",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    labels: labels,
    colors: [
      "#3b82f6", // primary-500
      "#10b981", // emerald-500
      "#f59e0b", // amber-500
      "#ef4444", // red-500
      "#8b5cf6", // violet-500
      "#06b6d4", // cyan-500
      "#f97316", // orange-500
      "#ec4899"  // pink-500
    ],
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              fontSize: "14px",
              color: "#64748b",
            },
            value: {
              fontSize: "24px",
              fontWeight: 600,
              color: "#0f172a",
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 500,
              color: "#64748b",
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      colors: ["transparent"],
      width: 2
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      markers: {
        radius: 12,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4
      }
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + (val === 1 ? " Employee" : " Employees");
        }
      }
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-[2px] border border-blue-300 shadow-sm rounded-xl p-6 flex flex-col h-full animate-fade-in">
      <h3 className="text-lg font-semibold text-blue-900 mb-6">Department Distribution</h3>
      
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        {/* We wrap it in a div to prevent hydration mismatch for width/height */}
        <div className="w-full h-full flex justify-center">
          <ReactApexChart 
            options={options} 
            series={series} 
            type="donut" 
            height={320} 
          />
        </div>
      </div>
    </div>
  );
}
