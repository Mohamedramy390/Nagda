import TicketSidebar from "@/components/shared/ticket-details/sidebar/TicketSidebar";
import ChatContanier from "@/components/shared/ticket-details/chat/ChatContainer";
import TicketHeader from "@/components/shared/ticket-details/TicketHeader";
import { getMessages } from "@/lib/api/messages";



interface PageProps {
  params: Promise<{ id: string }>; // In Next.js 15, params is a Promise
}

const TicketDetailPage = async ({params} : PageProps) => {
  const { id } = await params;
  const initialMessages = getMessages();

  return (
     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      
      {/* 1. Header (Full Width) */}
      {/* We usually place this outside the grid so it spans the whole screen */}
      <TicketHeader id={id} />

      <main className="max-w-7xl mx-auto p-6">
        
        {/* 2. The Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column (Conversation) - Takes 2/3 space */}
          <div className="lg:col-span-2 space-y-6">
            
            <ChatContanier initialMessages={initialMessages} />

          </div>

          <div className="lg:col-span-1 sticky top-6">
            <TicketSidebar id={id} />
          </div>

        </div>
      </main>
      
    </div>
  )
}

export default TicketDetailPage
