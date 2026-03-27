import TicketsTable from './TicketsTable';
import { TicketData } from '@/lib/types/ticket';

const TicketsContainer = ({tickets}: {tickets: TicketData[]}) => {
  return (
    <div className="w-full">
      <TicketsTable tickets={tickets || []} />
    </div>
  )
}

export default TicketsContainer
