"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast() {
  const { toast, hideToast } = useStore();

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, hideToast]);

  if (!toast.isVisible) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${
        isSuccess 
          ? "bg-green-50 border-green-200 text-green-800" 
          : "bg-red-50 border-red-200 text-red-800"
      }`}>
        {isSuccess ? <CheckCircle2 size={20} className="text-green-600" /> : <AlertCircle size={20} className="text-red-600" />}
        <p className="text-sm font-medium pr-4">{toast.message}</p>
        <button 
          onClick={hideToast}
          className={`p-1 rounded-md transition-colors ${
            isSuccess ? "hover:bg-green-100 text-green-700" : "hover:bg-red-100 text-red-700"
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
