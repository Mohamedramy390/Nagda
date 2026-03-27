'use client';

import { useSearchParams, useRouter } from 'next/navigation';

interface TicketTabsProps {
  counts: {
    all: number;
    open: number;
    inProgress: number;
    closed: number;
  };
}

export function TicketTabs({ counts }: TicketTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Default to 'all' if no param exists
  const activeStatus = searchParams.get('status') || 'all';

  const handleTabClick = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === 'all') params.delete('status');
    else params.set('status', status);
    
    router.push(`?${params.toString()}`);
  };

  const tabs = [
    { id: 'all', label: 'All Tickets', count: counts.all },
    { id: 'open', label: 'Open', count: counts.open },
    { id: 'in_progress', label: 'In Progress', count: counts.inProgress },
    { id: 'closed', label: 'Closed', count: counts.closed },
  ];

  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
            ${activeStatus === tab.id 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'}
          `}
        >
          {tab.label}
          <span className={`px-2 py-0.5 rounded-full text-xs ${activeStatus === tab.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
