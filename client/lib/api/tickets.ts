'use server'

import { cookies } from "next/headers";
import { CreateTicketData, TicketData } from "../types/ticket";

const localhost = 'http://localhost:3200';

export async function getTicket(id: string){
   const cookieStore = await cookies();
   const token = cookieStore.get('token')?.value;

   const response = await fetch(`${localhost}/tickets/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

   if(!response.ok){
    throw new Error('Failed to get ticket');
   }
   return response.json();

} 

export async function getTickets(status: string, query: string) {
  const response = await fetch(`/api/tickets?status=${status}&query=${query}`);
  return response.json();
}

export async function getTicketCounts() {
  const response = await fetch('/api/tickets/counts');
  return response.json();
}

export async function createTicket(ticketData: FormData | CreateTicketData) {
  const isFormData = ticketData instanceof FormData;
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  const headers : HeadersInit = {
    'Authorization': `Bearer ${token}`,
  }
  
  if(!isFormData){
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${localhost}/tickets`, {
    method: 'POST',
    headers,
    body: isFormData ? ticketData : JSON.stringify(ticketData),
  });
  
  if(!response.ok){
    let errorMessage = 'Failed to create ticket';
  
    try {
      const errorData = await response.json();
      
      if (errorData.message) {
        errorMessage = Array.isArray(errorData.message) 
          ? errorData.message.join(', ')
          : errorData.message;
      }
    } catch (e) {
      console.error("Could not parse error response");
    }

    throw new Error(errorMessage);
  }
  return response.json();
}