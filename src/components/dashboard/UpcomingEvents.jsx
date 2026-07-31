"use client";

import { Calendar, Gift, Star } from "lucide-react";
import { getAvatarColorClass } from "@/lib/utils";
import Image from "next/image";

export default function UpcomingEvents({ events }) {
  
  if (!events || events.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl p-5 h-full flex flex-col">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-6">
          <Calendar size={18} className="text-primary-600" />
          Upcoming Events
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
          <Calendar size={48} className="mb-3 opacity-20" />
          <p className="text-sm">No upcoming events this month.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl p-5 h-full flex flex-col">
      <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-6">
        <Calendar size={18} className="text-primary-600" />
        Upcoming Events
      </h3>
      
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
        {events.map((event) => {
          const initials = event.employeeName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
          const avatarColor = getAvatarColorClass(event.employeeName);
          const eventDate = new Date(event.date);
          const dateStr = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          
          return (
            <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors border border-slate-200/50">
              {event.avatar ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-300/70 shadow-sm flex-shrink-0">
                  <Image src={event.avatar} alt={event.employeeName} fill className="object-cover" />
                </div>
              ) : (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border text-sm shadow-sm flex-shrink-0 ${avatarColor}`}>
                  {initials}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{event.employeeName}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  {event.type === 'birthday' ? (
                    <><Gift size={12} className="text-pink-500" /> Birthday ({dateStr})</>
                  ) : (
                    <><Star size={12} className="text-amber-500" /> {event.years} Year Work Anniversary ({dateStr})</>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
