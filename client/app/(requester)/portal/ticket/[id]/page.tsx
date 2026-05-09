import TicketSidebar from "@/components/shared/ticket-details/sidebar/TicketSidebar";
import ChatContanier from "@/components/shared/ticket-details/chat/ChatContainer";
import TicketHeader from "@/components/shared/ticket-details/TicketHeader";
import { getTicket } from "@/lib/api/tickets";



interface PageProps {
  params: Promise<{ id: string }>; // In Next.js 15, params is a Promise
}

const TicketDetailPage = async ({params} : PageProps) => {
  const { id } = await params;


  const ticketDetails = await getTicket(id);

  console.log(ticketDetails)
  
  if(!ticketDetails) return 'Loading...';

  return (
     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      
      <TicketHeader ticketDetails={ticketDetails} />

      <main className="p-6 w-full mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-6">
            
            <ChatContanier initialMessages={ticketDetails.messages} ticketId={id} />

          </div>

          <div className="lg:col-span-1 mx-auto sticky top-6">
            <TicketSidebar ticketDetails={ticketDetails} />
          </div>

        </div>
      </main>
      
    </div>
  )
}

export default TicketDetailPage
