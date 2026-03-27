interface Props {
  requester: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    avatar?: string;
  };
}

export default function RequesterInfo({ requester }: Props) {
  return (
    <div className="p-6 space-y-5 pb-0"> {/* pb-0 because History is below it */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Requester Info</h3>
        <button className="text-primary text-xs font-medium hover:underline">View Profile</button>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 shrink-0 border border-slate-200"
          style={{ backgroundImage: `url("${requester.avatar}")` }}
        ></div>
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">{requester.name}</div>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-3 text-sm group cursor-pointer">
          <span className="material-symbols-outlined text-slate-400 text-[18px]">mail</span>
          <span className="text-slate-700 dark:text-slate-300 truncate">{requester.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm group cursor-pointer">
          <span className="material-symbols-outlined text-slate-400 text-[18px]">phone</span>
          <span className="text-slate-700 dark:text-slate-300 truncate">{requester.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm group cursor-pointer">
          <span className="material-symbols-outlined text-slate-400 text-[18px]">home</span>
          <span className="text-slate-700 dark:text-slate-300 truncate">{requester.location}</span>
        </div>
      </div>
    </div>
  );
}