"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Toast from "../ui/Toast";
import VantaBackground from "./VantaBackground";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden text-slate-900 bg-transparent relative">
      <VantaBackground />
      
      <div className="relative z-10 flex w-full h-full">
        <Sidebar />
        
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toast />
    </div>
  );
}
