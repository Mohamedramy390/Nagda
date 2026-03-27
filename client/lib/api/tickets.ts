import { TicketData } from "../types/ticket";


export async function getTicket(id: string){
  
} 

export async function getTickets(status: string, query: string) {
  const response = await fetch(`/api/tickets?status=${status}&query=${query}`);
  return response.json();
}

export async function getTicketCounts() {
  const response = await fetch('/api/tickets/counts');
  return response.json();
}