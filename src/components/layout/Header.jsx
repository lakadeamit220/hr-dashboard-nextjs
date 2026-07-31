"use client";

import { Bell, Search, Menu, User, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const notifRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  
  // Simple mapping for page title
  let pageTitle = "Dashboard";
  if (pathname?.startsWith("/employees")) {
    pageTitle = "Employees";
  }

  // Mock Notifications
  const notifications = [
    { id: 1, text: "Amit Lakade was promoted to Tech Lead", time: "2h ago" },
    { id: 2, text: "Priyanka Patil's leave request approved", time: "5h ago" },
    { id: 3, text: "New performance review cycle started", time: "1d ago" }
  ];

  return (
    <header className="h-16 bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm border-b border-slate-300/70 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      
      {/* Left section: Title & Menu */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 rounded-lg cursor-pointer"
        >
          <Menu size={20} />
        </button>
        
        {!isSearchOpen && (
          <h1 className="text-xl font-semibold text-slate-800 hidden sm:block animate-in fade-in zoom-in-95">{pageTitle}</h1>
        )}

        {/* Search Input (Expands horizontally) */}
        {isSearchOpen && (
          <div className="flex-1 max-w-md relative animate-in slide-in-from-right-4 fade-in">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search employees, reports..." 
              className="w-full pl-10 pr-10 py-2 bg-white/50 border border-slate-300/70 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Right section: Icons */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        {!isSearchOpen && (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50/50 rounded-full transition-colors hidden sm:block cursor-pointer"
          >
            <Search size={20} />
          </button>
        )}
        
        {/* Notification Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50/50 rounded-full transition-colors relative cursor-pointer ${isNotifOpen ? 'bg-slate-100' : ''}`}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger-500 rounded-full border-2 border-white"></span>
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 origin-top-right">
              <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
                <span className="text-xs text-primary-600 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 cursor-pointer transition-colors">
                    <p className="text-sm text-slate-700">{notif.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <a href="#" className="text-sm text-primary-600 font-medium hover:underline">View all</a>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile Profile Icon */}
        <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center sm:hidden cursor-pointer">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}
