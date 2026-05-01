import { User } from "./user";

export interface TicketPriorityProps {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface TicketCreatedProps {
  dateCreated: string;
}


export interface TicketData {
  id: string;
  ticketNum: string;
  subject: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  requester: string;
  assignee?: string; // Optional because a new ticket might not have an agent yet
}

export interface CreateTicketData {
  subject: string;
  category: string;
  priority: string;
  description: string;
  requesterId: string;
  attachments?: File[];
}

export interface TicketsTableProps {
  tickets: TicketData[];
}
