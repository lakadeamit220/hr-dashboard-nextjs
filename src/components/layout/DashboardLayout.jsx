"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Toast from "../ui/Toast";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 text-gray-900">
      <Sidebar />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toast />
    </div>
  );
}
