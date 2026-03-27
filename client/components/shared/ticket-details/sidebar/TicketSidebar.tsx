
import SLATimer from './SLATimer';
import TicketProperties from './TicketProperties';
import RequesterInfo from './RequesterInfo';
import RecentTickets from './RecentTickets';
import { getTicket } from '@/lib/api/tickets';

export default async function TicketSidebar({ id }: any) {

    const ticket = await getTicket(id);
    
    if(!ticket) return 'Loading...';

  return (
    <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col h-full overflow-y-auto">
      <SLATimer />
      <TicketProperties ticket={ticket} />
      <RequesterInfo requester={ticket.requester} />
      <RecentTickets />
    </aside>
  );
}