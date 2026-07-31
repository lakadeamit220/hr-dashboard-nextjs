"use client";

import { Bell, Search, Menu, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

export default function Header() {
  const pathname = usePathname();
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  
  // Simple mapping for page title
  let pageTitle = "Dashboard";
  if (pathname?.startsWith("/employees")) {
    pageTitle = "Employees";
  }

  return (
    <header className="h-16 bg-white/5 backdrop-blur-[2px] border border-blue-400/40 shadow-sm border-b border-blue-400/40 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-blue-600 hover:text-blue-800 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-blue-900">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button className="p-2 text-blue-400 hover:text-blue-700 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
          <Search size={20} />
        </button>
        
        <button className="p-2 text-blue-400 hover:text-blue-700 hover:bg-gray-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center sm:hidden">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}
