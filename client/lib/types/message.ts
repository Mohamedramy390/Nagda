export interface MessageData {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isInternal?: boolean;
  attachment?: {
    name: string;
    size: string;
  };
}

