import React from 'react'

const TicketActivity = () => {
  return (
    <div className="flex flex-col rounded-xl bg-white p-5 shadow-sm border border-slate-200 dark:bg-[#1e2936] dark:border-slate-700">
      <div className="mb-6">
        <h3 className="text-base font-bold text-[#0d141b] dark:text-white">Ticket Activity</h3>
        <p className="text-xs text-slate-500">Last 30 Days</p>
      </div>
      {/* Custom CSS Bar Chart based on user component style */}
      <div className="flex flex-1 flex-col justify-end gap-2">
        <div className="grid h-48 grid-cols-7 items-end gap-3 px-2">
          {/* Bar 1 */}
          <div className="group flex flex-col items-center gap-2">
            <div className="relative w-full rounded-t-sm bg-primary/20 hover:bg-primary/30 transition-all h-[40%]">
              <div className="absolute bottom-0 w-full rounded-t-sm bg-primary" style={{ height: '60%' }}></div>
            </div>
            <span className="text-xs font-medium text-slate-500">Mon</span>
          </div>
          {/* Bar 2 */}
          <div className="group flex flex-col items-center gap-2">
            <div className="relative w-full rounded-t-sm bg-primary/20 hover:bg-primary/30 transition-all h-[65%]">
              <div className="absolute bottom-0 w-full rounded-t-sm bg-primary" style={{ height: '100%' }}></div>
            </div>
            <span className="text-xs font-medium text-slate-500">Tue</span>
          </div>
          {/* Bar 3 */}
          <div className="group flex flex-col items-center gap-2">
            <div className="relative w-full rounded-t-sm bg-primary/20 hover:bg-primary/30 transition-all h-[35%]">
              <div className="absolute bottom-0 w-full rounded-t-sm bg-primary" style={{ height: '80%' }}></div>
            </div>
            <span className="text-xs font-medium text-slate-500">Wed</span>
          </div>
          {/* Bar 4 */}
          <div className="group flex flex-col items-center gap-2">
            <div className="relative w-full rounded-t-sm bg-primary/20 hover:bg-primary/30 transition-all h-[50%]">
              <div className="absolute bottom-0 w-full rounded-t-sm bg-primary" style={{ height: '40%' }}></div>
            </div>
            <span className="text-xs font-medium text-slate-500">Thu</span>
          </div>
          {/* Bar 5 */}
          <div className="group flex flex-col items-center gap-2">
            <div className="relative w-full rounded-t-sm bg-primary/20 hover:bg-primary/30 transition-all h-[80%]">
              <div className="absolute bottom-0 w-full rounded-t-sm bg-primary" style={{ height: '90%' }}></div>
            </div>
            <span className="text-xs font-medium text-slate-500">Fri</span>
          </div>
          {/* Bar 6 */}
          <div className="group flex flex-col items-center gap-2">
            <div className="relative w-full rounded-t-sm bg-primary/20 hover:bg-primary/30 transition-all h-[20%]">
              <div className="absolute bottom-0 w-full rounded-t-sm bg-primary" style={{ height: '50%' }}></div>
            </div>
            <span className="text-xs font-medium text-slate-500">Sat</span>
          </div>
          {/* Bar 7 */}
          <div className="group flex flex-col items-center gap-2">
            <div className="relative w-full rounded-t-sm bg-primary/20 hover:bg-primary/30 transition-all h-[15%]">
              <div className="absolute bottom-0 w-full rounded-t-sm bg-primary" style={{ height: '30%' }}></div>
            </div>
            <span className="text-xs font-medium text-slate-500">Sun</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
        <span>Total: 34 Tickets</span>
        <span className="text-green-600 font-medium flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[14px]">trending_up</span>
          +12% vs last week
        </span>
      </div>
    </div>
  )
}

export default TicketActivity
