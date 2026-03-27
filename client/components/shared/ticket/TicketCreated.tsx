'use client'

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { TicketCreatedProps } from "@/lib/types/ticket";



const TicketCreated = ({ dateCreated }: TicketCreatedProps) => {
  // Use a dummy state to trigger a re-render every minute
  const [, setTick] = useState(0);

  useEffect(() => {
    // Set up a timer to update every 60 seconds
    const intervalId = setInterval(() => {
      setTick(tick => tick + 1);
    }, 60000);

    // Cleanup timer on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Calculate the time string directly during render
  const timeAgo = 2;

  // suppressHydrationWarning is needed because the "time ago" might differ slightly 
  // between the server (SSR) and the client, or simply because time moves forward.
  return (
    <span suppressHydrationWarning className="text-gray-500">
      {timeAgo}
    </span>
  );
}

export default TicketCreated