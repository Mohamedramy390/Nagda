import React from 'react';
import MessageBubble from './MessageBubble';
import SystemMessage from './SystemMessage';
import { MessageData } from '@/lib/types/message';


export default function MessageList({messages} : {messages: MessageData[]}) {
    

  return (
    <div className="flex-1 overflow-y-auto p-6 h-[500px] space-y-6 custom-scrollbar bg-slate-50 dark:bg-slate-950" id="chat-stream">
      
      {/* Date Divider */}
      <div className="flex justify-center mb-4">
        <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-3 py-1 rounded-full font-medium">
          Today, {new Date().toLocaleDateString()}
        </span>
      </div>

      <SystemMessage text="Ticket created via Email Connector" />

      {/* Render messages */}
      {messages.map((msg) => (
        // @ts-ignore - simplified for example
        <MessageBubble key={msg.id} message={msg} />
      ))}
      
    </div>
  );
}