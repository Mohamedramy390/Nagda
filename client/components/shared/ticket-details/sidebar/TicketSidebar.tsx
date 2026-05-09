
import SLATimer from './SLATimer';
import TicketProperties from './TicketProperties';
import RequesterInfo from './RequesterInfo';

export default async function TicketSidebar({ ticketDetails : ticket }: any) {

    const { requester , agent } = ticket;
    
    if(!ticket) return 'Loading...';

  return (
    <aside className="w-96 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col h-full ">
      <SLATimer ticket={ticket} />
      <TicketProperties ticket={ticket} />
      <RequesterInfo requester={requester} agent={agent} />
    </aside>
  );
}