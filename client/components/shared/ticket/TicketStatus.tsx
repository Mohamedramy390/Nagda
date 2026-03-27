import React from 'react'
import { TicketData } from '@/lib/types/ticket'

interface TicketStatusProps {
  status: TicketData['status'];
}

const TicketStatus = ({ status }: TicketStatusProps) => {
  const styles = {
    'IN_PROGRESS': 'bg-blue-50 text-blue-700 ring-blue-700/10',
    'OPEN': 'bg-slate-100 text-slate-600 ring-slate-500/10',
    'CLOSED': 'bg-green-50 text-green-700 ring-green-600/20',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}>
      {status}
    </span>
  )
}

export default TicketStatus
