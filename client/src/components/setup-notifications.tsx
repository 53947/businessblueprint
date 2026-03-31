import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface NotificationEvent {
  id: number;
  clientId: number;
  eventType: string;
  metadata: { title: string; message: string } | null;
  createdAt: string;
}

/**
 * Setup Notifications — polls for recent notification events and shows toasts.
 * Renders nothing visible; just runs the polling loop.
 * Toasts auto-dismiss after 5 seconds.
 */
export function SetupNotifications() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const seenIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    let active = true;

    async function poll() {
      if (!active) return;

      try {
        const res = await fetch("/api/setup-tasks/events/recent", {
          credentials: "include",
        });
        if (!res.ok) return;

        const data = await res.json();
        const events: NotificationEvent[] = data.events || [];

        for (const event of events) {
          if (seenIds.current.has(event.id)) continue;
          seenIds.current.add(event.id);

          const meta = event.metadata;
          if (!meta?.title || !meta?.message) continue;

          toast({
            title: meta.title,
            description: meta.message,
            duration: 5000,
            onClick: () => setLocation("/portal/directions"),
          } as any);
        }
      } catch {
        // Silently fail — polling errors are not user-visible
      }
    }

    // Initial poll
    poll();

    // Poll every 30 seconds
    const interval = setInterval(poll, 30000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [toast, setLocation]);

  return null;
}
