"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white/5 backdrop-blur-[2px] border border-blue-400/40 shadow-sm rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-blue-400/40">
          <h3 className="text-xl font-semibold text-blue-950">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-blue-400 bg-white/5 backdrop-blur-[2px] border border-blue-400/40 shadow-sm hover:bg-gray-50 hover:text-blue-950 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
        
      </div>
    </div>
  );
}
