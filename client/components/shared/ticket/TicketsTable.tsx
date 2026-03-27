import React from 'react'
import TicketRow from './TicketRow'
import { TicketsTableProps } from '@/lib/types/ticket'

// Define the type for ticket data

const TicketsTable = ({ tickets }: TicketsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <tr>
            <th className="px-5 py-3 font-semibold">ID</th>
            <th className="px-5 py-3 font-semibold">Subject</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3 font-semibold">Created</th>
            <th className="px-5 py-3 font-semibold">Priority</th>
            <th className="px-5 py-3 font-semibold"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {tickets.map((ticket) => (
  // Pass the whole object as a single prop named 'ticket'
            <TicketRow key={ticket.id} ticket={ticket} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TicketsTable
