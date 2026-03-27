import { TicketPriorityProps } from '@/lib/types/ticket';
import React from 'react'



const TicketPriority = ({ priority }: TicketPriorityProps) => {
  const config = {
    'HIGH': { color: 'text-red-600', icon: 'priority_high', iconClass: 'icon-filled' },
    'MEDIUM': { color: 'text-orange-500', icon: 'remove', iconClass: '' },
    'LOW': { color: 'text-green-600', icon: 'arrow_downward', iconClass: '' },
  };

  const { color, icon, iconClass } = config[priority];

  return (
    <div className={`flex items-center gap-1.5 ${color} font-medium`}>
      <span className={`material-symbols-outlined text-[16px] ${iconClass}`}>{icon}</span>
      <span>{priority}</span>
    </div>
  )
}

export default TicketPriority
