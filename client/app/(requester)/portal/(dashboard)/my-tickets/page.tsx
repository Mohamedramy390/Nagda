import React, { Suspense } from 'react';
import Header from '@/components/shared/header/Header';
import SearchBar from '@/components/shared/ui/SearchBar';
import { TicketTabs } from '@/components/shared/ticket/TicketTabs';
import TicketsTable from '@/components/shared/ticket/TicketsTable';
import PrimaryBtn from '@/components/shared/ui/PrimaryBtn';
import { getTickets, getTicketCounts } from '@/lib/api/tickets'; 
// 1. Define Props for Server Page
interface PageProps {
  // In Next.js 15,   this is a Promise!
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyTicketsPage({ searchParams }: PageProps) {
  // ⏳ 1. AWAIT the params first
  const resolvedParams = await searchParams;
  
  // 2. NOW read the values
  const status = (resolvedParams.status as string) || 'all';
  const query = (resolvedParams.search as string) || '';

  console.log('Server received:', { status, query }); // 👈 Debug check

  // 3. Fetch Data (Parallel Fetching)
  // This runs on the server. The browser NEVER sees the full list of tickets.
  const ticketsData = getTickets(status, query);
  const countsData = getTicketCounts();

  // Wait for both to finish
  const [tickets, counts] = await Promise.all([ticketsData, countsData]);

  return (
    <main className="flex flex-1 flex-col h-full relative overflow-hidden bg-slate-50 dark:bg-[#0d141b]">
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-7xl flex flex-col gap-6">
          
          {/* Controls Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center bg-white dark:bg-[#1e2936] rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* 4. Pass Server Data to Client Component */}
                <TicketTabs counts={counts} />
              </div>
              <PrimaryBtn icon="add" label="Create New Ticket" path='/portal/create-ticket'/>
            </div>

            <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-[#1e2936] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="relative flex-1 min-w-[280px]">
                {/* SearchBar is a Client Component that updates the URL */}
                <SearchBar 
                  placeholder="Search by ticket ID..." 
                  className="w-full max-w-none"
                />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="flex flex-col rounded-xl bg-white shadow-sm border border-slate-200 dark:bg-[#1e2936] dark:border-slate-700 overflow-hidden">
            {/* 5. Render filtered data directly */}
            <TicketsTable tickets={tickets} />
            
            {/* Pagination (Static for now as requested) */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Showing {tickets.length > 0 ? 1 : 0} to {tickets.length} of {counts.all} results
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button disabled className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-primary bg-primary text-white text-sm font-semibold">1</button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">2</button>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">3</button>
                <span className="px-2 text-slate-400">...</span>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}