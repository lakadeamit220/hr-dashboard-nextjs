"use client";

import { useStore } from "@/lib/store";
import { useEffect, useState, useRef } from "react";
import { getAllEmployees } from "@/lib/data";
import OrgChartNode from "@/components/org-chart/OrgChartNode";
import { Move, ZoomIn, ZoomOut, RefreshCcw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function OrgChartPage() {
  const setEmployees = useStore((state) => state.setEmployees);
  const employees = useStore((state) => state.employees);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Initialize employees from server data into Zustand store on first load
  useEffect(() => {
    if (employees.length === 0) {
      setEmployees(getAllEmployees());
    }
  }, [employees.length, setEmployees]);

  // Find the top level executive (CEO / ManagerId null)
  const topLevelEmployees = employees.filter(emp => !emp.managerId);
  const ceo = topLevelEmployees.length > 0 ? topLevelEmployees[0] : null;

  // Zoom controls
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.4));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Dragging logic for panning around the large chart
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Organization Chart</h1>
          <p className="text-slate-500">Visual hierarchy of all reporting lines in the company.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-[2px] border border-slate-300/70 p-1.5 rounded-lg shadow-sm">
          <Button variant="ghost" size="sm" onClick={handleZoomOut} title="Zoom Out" className="!px-2 text-slate-500 hover:text-slate-900">
            <ZoomOut size={18} />
          </Button>
          <div className="text-xs font-medium text-slate-500 w-12 text-center">
            {Math.round(scale * 100)}%
          </div>
          <Button variant="ghost" size="sm" onClick={handleZoomIn} title="Zoom In" className="!px-2 text-slate-500 hover:text-slate-900">
            <ZoomIn size={18} />
          </Button>
          <div className="w-px h-6 bg-slate-300 mx-1"></div>
          <Button variant="ghost" size="sm" onClick={handleReset} title="Reset View" className="!px-2 text-slate-500 hover:text-primary-600">
            <RefreshCcw size={18} />
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 bg-slate-50/50 backdrop-blur-[2px] border border-slate-300/70 shadow-inner rounded-xl overflow-hidden relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        {/* Pan and Zoom Canvas */}
        <div 
          className="absolute origin-top"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            width: '100%',
            paddingTop: '40px',
            paddingBottom: '100px' // Extra space for large trees
          }}
        >
          {ceo ? (
            <OrgChartNode employee={ceo} employees={employees} />
          ) : (
            <div className="text-center text-slate-500 mt-20">
              No top-level executive found in the directory.
            </div>
          )}
        </div>
        
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/80 px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
          <Move size={14} />
          <span>Click and drag to pan</span>
        </div>
      </div>
    </div>
  );
}
