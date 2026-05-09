'use client'

import { useAuth } from "@/context/AuthContext";
import { MessageData } from "@/lib/types/message";


export default function MessageBubble({ message }: {message: MessageData}) {
  const {user, isLoading} = useAuth()
  const userId = user?.id;
  const isMe = message.userId != userId;

  // Alignment Logic
  const containerClass = isMe ? "flex items-end gap-3 group" : "flex items-end gap-3 justify-end group";
  const contentWrapperClass = isMe ? "flex flex-col gap-1 items-start max-w-[80%] lg:max-w-[65%]" : "flex flex-col gap-1 items-end max-w-[80%] lg:max-w-[65%]";

  // Bubble Styling Logic
  let bubbleClass = "p-4 shadow-sm text-base leading-relaxed rounded-2xl border ";
  
   if (isMe) {
    bubbleClass += "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none";
  } else {
    // Agent (Blue)
    bubbleClass += "bg-blue-600 text-white border-transparent rounded-br-none";
  }

  if(!user) return null;


  return (
    <div className={containerClass}>
      {/* Avatar (Left side only for Customer) */}
      {isMe && (
         <div className="relative shrink-0">
           <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border-2 border-white dark:border-slate-700 shadow-sm" style={{ backgroundImage: `url("${user?.avatar}")` }}></div>
           {/* Online Status Dot */}
           <div className="absolute -bottom-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900"></div>
         </div>
      )}

      <div className={contentWrapperClass}>
        {/* Header (Name & Time) */}
        <div className={`flex items-center gap-2 ${isMe ? 'ml-1' : 'mr-1'}`}>
          <span className={`text-sm font-semibold ${isMe ? 'text-slate-700 dark:text-slate-300' : 'text-slate-700 dark:text-slate-300'}`}>
            {message.user.name}
          </span>
          <span className="text-slate-400 text-xs">{message.timestamp}</span>
        </div>

        {/* The Bubble */}
        <div className={bubbleClass}>
          
          <div dangerouslySetInnerHTML={{ __html: message.content }} />

          {/* Attachment (Optional) */}
          {message.attachment && (
            <div className={`mt-3 flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors group/file ${isMe ? 'bg-slate-50 dark:bg-slate-800 border-slate-200' : 'bg-white/10 border-white/20'}`}>
              <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center text-red-600 dark:text-red-400">
                <span className="material-symbols-outlined">image</span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className={`text-sm font-medium truncate ${isMe ? 'text-slate-700' : 'text-white'}`}>
                  {message.attachment.name}
                </span>
                <span className={`text-xs ${isMe ? 'text-slate-500' : 'text-white/70'}`}>
                  {message.attachment.size}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Avatar (Right side for Agent/Internal) */}
      {!isMe && (
        <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 shrink-0 border-2 border-white dark:border-slate-700 shadow-sm" style={{ backgroundImage: `url("${user?.avatar}")` }}></div>
      )}
    </div>
  );
}