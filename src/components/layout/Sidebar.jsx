"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Menu, X, User } from "lucide-react";
import { useStore } from "@/lib/store";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Employees", href: "/employees", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useStore();

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/5 backdrop-blur-[2px] border border-blue-300 shadow-sm border-r border-blue-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-blue-300">
          <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center">
              <Users size={18} />
            </div>
            HR Connect
          </div>
          <button 
            onClick={toggleSidebar}
            className="ml-auto lg:hidden text-blue-600 hover:text-blue-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-blue-700 hover:bg-gray-50 hover:text-blue-950"
                }`}
              >
                <Icon size={18} className={isActive ? "text-primary-600" : "text-blue-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-blue-300">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-blue-700">
              <User size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-blue-950">Admin User</span>
              <span className="text-xs text-blue-600">HR Manager</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
