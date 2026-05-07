export interface MessageData {
  id: string;
  content: string;
  timestamp: string;
  userId: string;
  attachment?: {
    name: string;
    size: string;
  };
}

