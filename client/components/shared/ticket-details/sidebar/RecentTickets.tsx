export default function RecentTickets() {
  return (
    <div className="p-6 pt-4 mt-2">
      <div className="border-t border-dashed border-slate-200 dark:border-slate-700 pt-4">
        <h4 className="text-xs font-medium text-slate-500 mb-3">Recent Tickets</h4>
        <ul className="space-y-2">
          {/* Loop over history items here */}
          <li>
            <a href="#" className="block p-2.5 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-100 transition-all">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">#TKT-8102</span>
                <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">Closed</span>
              </div>
              <div className="text-xs text-slate-500 truncate">Login failure on staging</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}