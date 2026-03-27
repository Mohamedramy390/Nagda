'use client';

import { useAuth } from '@/context/AuthContext';
import { addMessage } from '@/lib/api/messages';
import { MessageData } from '@/lib/types/message';
import React, { useState } from 'react';

const INITIAL_MESSAGE: MessageData = {
  id: 'temp-id',          
  sender: '',
  content: '',            
  timestamp: new Date().toISOString(),
};
export default function ReplyEditor() {
  const [activeTab, setActiveTab] = useState<'reply' | 'internal'>('reply');
  const [message, setMessage] = useState<MessageData>(INITIAL_MESSAGE); 
  const {user} = useAuth()
  
  const handleSend = () => {
    const finalMessage = {
    ...message,
    sender: user?.id || 'Unknown', // Safe fallback
    timestamp: new Date().toISOString() // Good time to add a timestamp
  };

  addMessage(finalMessage);

  setMessage(INITIAL_MESSAGE); 
  
  }
  return (
    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 z-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        
        {/* Tabs */}
        <div className="flex gap-4 px-1">
          <button 
            onClick={() => setActiveTab('reply')}
            className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${activeTab === 'reply' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
          >
            Reply to Customer
          </button>
          <button 
             onClick={() => setActiveTab('internal')}
             className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${activeTab === 'internal' ? 'text-amber-600 border-amber-600' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
          >
            Internal Note
          </button>
        </div>

        {/* Editor Box */}
        <div className={`relative bg-white dark:bg-slate-800 border rounded-xl shadow-sm focus-within:ring-2 transition-all ${activeTab === 'internal' ? 'bg-amber-50/50 border-amber-200 focus-within:ring-amber-500' : 'border-slate-300 dark:border-slate-600 focus-within:ring-blue-500'}`}>
          
          {/* Toolbar */}
          <div className="flex items-center gap-1 p-2 border-b border-slate-100 dark:border-slate-700">
            {['format_bold', 'format_italic', 'format_list_bulleted'].map((icon) => (
              <button key={icon} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </button>
            ))}
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-600 mx-1"></div>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100">
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>
          </div>

          {/* Text Area */}
          <textarea 
          value={message?.content}
          
          onChange={(e) => {
            setMessage((prev) => ({
              ...prev,          
              content: e.target.value
            }));
          }}
            className="w-full bg-transparent border-none p-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-0 resize-none outline-none min-h-[100px]" 
            placeholder={activeTab === 'internal' ? "Add an internal note..." : "Type your reply here..."}
          ></textarea>

          {/* Footer Actions */}
          <div className="flex justify-between items-center p-2 pt-0">
            <div className="text-xs text-slate-400 hidden sm:block">Press Cmd+Enter to send</div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm rounded-lg hover:bg-slate-300 transition-colors">
                Canned Response
              </button>
              <button onClick={handleSend} className={`px-6 py-2 text-white font-bold text-sm rounded-lg shadow-sm flex items-center gap-2 transition-colors ${activeTab === 'internal' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                <span>{activeTab === 'internal' ? 'Save Note' : 'Send Reply'}</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}