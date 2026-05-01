'use client'
import TicketsContainer from '@/components/shared/ticket/TicketsContainer'
import TicketActivity from '@/components/shared/ticket/TicketActivity'
import OverviewCard from '@/components/requester/OverviewCard'
import Title from '@/components/shared/ui/Title'
import PrimaryBtn from '@/components/shared/ui/PrimaryBtn'
import InnerLayout from '@/components/shared/ui/InnerLayout'
import getDashboardOverview from '@/lib/api/dashboard'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Spinner from '@/components/shared/ui/Spinner'


const DashboardPage =   () => {

  const [data, setData] = useState<{ kpis: unknown; recent: unknown[] } | null>(null)
  const { logout } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getDashboardOverview()
        setData(data)
      }catch(error){
        // Any error (including 401 Unauthorized) → force logout
        void logout()
      }
    }
    fetchData()
  }, [logout]);

  if (!data) {
    return <Spinner />
  }
  const {kpis, recent} = data
  return (
    <InnerLayout>
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Title 
            title="Dashboard Overview" 
            description="Welcome back, here's what's happening with your requests." 
          />
        </div>
        <PrimaryBtn icon="add" label="Create New Ticket" path='/portal/create-ticket'/>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <OverviewCard 
          label="Open Tickets" 
          value={kpis?.openCount} 
          icon="warning" 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <OverviewCard 
          label="In Progress" 
          value={kpis?.inProgressCount} 
          icon="pending" 
          iconColor="text-primary" 
          iconBg="bg-blue-50" 
        />
        <OverviewCard 
          label="Closed" 
          value={kpis?.closedCount} 
          icon="check_circle" 
          iconColor="text-green-600" 
          iconBg="bg-green-50" 
        />
        <OverviewCard 
          label="Avg Resolution" 
          value="4h 30m" 
          icon="timer" 
          iconColor="text-purple-500" 
          iconBg="bg-purple-50" 
        />
        <OverviewCard 
          label="Avg Response" 
          value="15m" 
          icon="support_agent" 
          iconColor="text-teal-500" 
          iconBg="bg-teal-50" 
        />
      </div>

      {/* Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Tickets Table */}
        <div className="lg:col-span-2 flex flex-col rounded-xl bg-white shadow-sm border border-slate-200 dark:bg-[#1e2936] dark:border-slate-700 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-700">
            <h3 className="text-base font-bold text-[#0d141b] dark:text-white">Recent Tickets</h3>
            <a className="text-sm font-medium text-primary hover:text-blue-700" href="#">View All</a>
          </div>
          <TicketsContainer tickets={recent} />
        </div>

        {/* Ticket Activity Chart */}
        <TicketActivity />
      </div>
    </InnerLayout>
  )
}

export default DashboardPage
