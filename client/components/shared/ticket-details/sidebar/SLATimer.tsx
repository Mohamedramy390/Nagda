'use client'

import { useEffect, useState } from "react";

export default function SLATimer({ ticket }: any) {

  const { resolutionDueAt } = ticket;
  const resolutionTime = new Date(resolutionDueAt).getTime() - new Date().getTime();
  const hours = Math.floor(resolutionTime / (1000 * 60 * 60));
  const minutes = Math.floor((resolutionTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((resolutionTime % (1000 * 60)) / 1000);


  const [timeLeft, setTimeLeft] = useState({
    hours,
    minutes,
    seconds,
  });
  

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if(timeLeft.seconds > 0 || timeLeft.minutes > 0 || timeLeft.hours > 0){
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime.seconds > 0) {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          } else if (prevTime.minutes > 0) {
            return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
          } else if (prevTime.hours > 0) {
            return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
          } else {
            return prevTime; // already at 0 — nothing to change
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  if(timeLeft.hours < 0 || timeLeft.minutes < 0 || timeLeft.seconds < 0){
    return (
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          SLA Remaining
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex items-center justify-center">
            <svg className="transform -rotate-90 w-12 h-12">
              <circle className="text-slate-200 dark:text-slate-700" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4" />
              <circle className="text-red-500" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="40" strokeWidth="4" />
            </svg>
            <span className="material-symbols-outlined text-red-500 absolute text-lg">timer</span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono leading-none">
              00:00:00
            </div>
            <div className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">
              Resolution SLA Breached
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
        SLA Remaining
      </h3>
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 flex items-center justify-center">
          <svg className="transform -rotate-90 w-12 h-12">
            <circle className="text-slate-200 dark:text-slate-700" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4" />
            <circle className="text-amber-500" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="40" strokeWidth="4" />
          </svg>
          <span className="material-symbols-outlined text-amber-500 absolute text-lg">timer</span>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono leading-none">
            {hours}:{minutes}:{seconds}
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
            Resolution Due Today
          </div>
        </div>
      </div>
    </div>
  );
}