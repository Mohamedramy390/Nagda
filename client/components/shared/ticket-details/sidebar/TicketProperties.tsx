

export default function TicketProperties({ ticket }: any) {
  return (
    <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Ticket Properties
      </h3>

      <div className="grid grid-cols-2 gap-y-4 gap-x-2">
        <div className="space-y-1">
          <label className="text-xs text-slate-500">Status</label>
          <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100 text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            {ticket.status}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500">Priority</label>
          <div className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-slate-100 text-sm">
            <span className="material-symbols-outlined text-red-500 text-[18px]">priority_high</span>
            {ticket.priority}
          </div>
        </div>

        {/* ... Category and Department similar to above ... */}
      </div>

      <div className="pt-2">
        <label className="text-xs text-slate-500 block mb-1">Assignee</label>
        <div className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer hover:border-primary transition-colors group">
          <div className="flex items-center gap-2">
            <div className="bg-center bg-no-repeat bg-cover rounded-full h-6 w-6 shrink-0"
              style={{ backgroundImage: `url("${ticket.assignee?.image || 'https://i.pravatar.cc/150'}")` }}
            ></div>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
              {ticket.assignee?.name || 'Unassigned'}
            </span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
        </div>
      </div>
    </div>
  );
}