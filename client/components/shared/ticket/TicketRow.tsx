import React from 'react'
import TicketStatus from './TicketStatus'
import TicketPriority from './TicketPirority'
import TicketCreated from './TicketCreated'
import { TicketData } from '@/lib/types/ticket'



import TicketAction from './TicketAction'

const TicketRow = ({ ticket }: { ticket: TicketData }) => {
  console.log(ticket) 
  const { id, ticketNum ,subject, status, createdAt, priority } = ticket;
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-5 py-4 font-medium text-[#0d141b] dark:text-white">{ticketNum}</td>
      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{subject}</td>
      <td className="px-5 py-4">
        <TicketStatus status={status} />
      </td>
      <td className="px-5 py-4">
        <TicketCreated dateCreated={createdAt} />
      </td>
      <td className="px-5 py-4">
        <TicketPriority priority={priority} />
      </td>
      <td className="px-5 py-4">
        <TicketAction id={id} />
      </td>
    </tr>
  )
}

export default TicketRow
