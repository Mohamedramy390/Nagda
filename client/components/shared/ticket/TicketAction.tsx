'use client'

import React from 'react'
import Link from 'next/link'

interface TicketActionProps {
  id: string
}

const TicketAction: React.FC<TicketActionProps> = ({ id }) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <Link 
        href={`/portal/ticket/${id}`}
        className="group flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
        title="View details"
      >
        <span className="material-symbols-outlined text-[20px]">visibility</span>
      </Link>
    </div>
  )
}

export default TicketAction