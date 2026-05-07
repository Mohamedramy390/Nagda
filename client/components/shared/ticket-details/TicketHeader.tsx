
import { PriorityEnum } from '@/utils/priorityEnum';
import PrimaryBtn from '../ui/PrimaryBtn';


// Helper to get badge colors based on priority
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case PriorityEnum.HIGH:
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case PriorityEnum.MEDIUM:
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case PriorityEnum.LOW:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  }
};

export default async function TicketHeader({  ticketDetails : ticket } : any)     {
   
  return (
    <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark flex-none z-10">
      <div className="px-6 py-4 flex flex-col gap-4">
        
        {/* Title Row */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          
          {/* Left Side: Title & Meta */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <span>#TIC-{ticket.ticketNum}: {ticket.subject}</span>
              
              {/* Dynamic Priority Badge */}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority} Priority
              </span>
            </h1>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span>
                Reported by <strong>{ticket.requester.name}</strong> • {ticket.createdAt}
              </span>
            </div>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex items-center gap-3">     
            <PrimaryBtn path={`/portal/ticket/${ticket.id}/edit-ticket`} icon='edit' label='Edit Ticket' />
          </div>

        </div>
      </div>
    </header>
  );
}