'use client'
import { useState } from 'react';
import MessageList from './MessageList';
import ReplyEditor from './ReplyEditor';
import { MessageData } from '@/lib/types/message';

export default function ConversationContainer({ticketId, initialMessages} : {ticketId: string, initialMessages: MessageData[]}) {

  const [messages, setMessages] = useState<MessageData[]>(initialMessages);

  if(!messages.length) return null;

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      
      {/* 1. Scrollable Message Area 
          flex-1: Takes up all remaining space
          overflow-y-auto: Allows scrolling inside this area only
      */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <MessageList messages={messages}  />
      </div>

      {/* 2. Fixed Bottom Editor 
          z-10: Ensures it stays on top of any scrolling content
      */}
      <div className="z-10 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <ReplyEditor ticketId={ticketId} setMessages={setMessages} />
      </div>

    </div>
  );
}