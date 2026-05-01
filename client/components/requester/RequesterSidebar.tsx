'use client';
import Navlink from '../shared/sidebar/Navlink';
import { useAuth } from '@/context/AuthContext';

const RequesterSidebar = () => {
  const { user } = useAuth();
  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white dark:bg-[#111a22] dark:border-slate-800 transition-all duration-300">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="bg-primary/10 flex items-center justify-center rounded-lg size-8 text-primary">
          <span className="material-symbols-outlined icon-filled text-[20px]">local_police</span>
        </div>
        <h1 className="text-lg font-bold tracking-tight text-[#0d141b] dark:text-white">SupportDesk</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
        <Navlink href="/portal/dashboard" icon="dashboard" label="Dashboard" />
        <Navlink href="/portal/my-tickets" icon="confirmation_number" label="My Tickets" />
        <Navlink href="/portal/knowledge-base" icon="menu_book" label="Knowledge Base" />
        <Navlink href="/portal/reports" icon="bar_chart" label="Reports" />

        <div className="my-2 border-t border-slate-100 dark:border-slate-800"></div>

        <Navlink href="/portal/settings" icon="settings" label="Settings" />
      </nav>

      {/* User Brief */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-slate-200 dark:border-slate-700"
            data-alt="User profile picture showing a smiling professional man"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA9KtnRzycg478cDVwI2-MD25NwNP77-X1Cw2yAl0kqrS5Imk6pl1g_jy_sz44TVukAnLh4EPVfaUVZdmOwlgZojwbQ63pspGwdgGjHVtwsSIr-DsYXn4KxOZ5-fp8oLKfEkY-Z6AeIdK0izw_WmiB1TXeF7H7ZcuNcqzOgZbVlwfQ6NVhSFpnUmV8rWjxaE3evMd81QmM-OTaTaHo52HPCxAwT-ehGIS_1boSeI31cnwHHMB2lnLLUFegyC6uhy4aQCeWXvxiOxefX")',
            }}
          ></div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-[#0d141b] dark:text-white">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RequesterSidebar;