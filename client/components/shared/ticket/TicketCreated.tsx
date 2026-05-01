'use client'

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { TicketCreatedProps } from "@/lib/types/ticket";



const TicketCreated = ({ dateCreated }: TicketCreatedProps) => {
  // Use a dummy state to trigger a re-render every minute
  const [, setTick] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick(tick => tick + 1);
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const timeAgo = formatDistanceToNow(new Date(dateCreated), { addSuffix: true });


  return (
    <span suppressHydrationWarning className="text-gray-500">
      {timeAgo}
    </span>
  );
}

export default TicketCreated