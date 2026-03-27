export default function SLATimer() {
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
            02:15:00
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
            Resolution Due Today
          </div>
        </div>
      </div>
    </div>
  );
}