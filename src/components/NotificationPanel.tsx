import { useState } from "react";
import { Bell, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Notification {
  id: string;
  type: "warning" | "info" | "success";
  message: string;
  time: string;
  location?: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    message: "AQI in Chennai reached 180 (Unhealthy)",
    time: "2 hours ago",
    location: "Chennai",
    read: false,
  },
  {
    id: "2",
    type: "info",
    message: "Air quality improved in your area",
    time: "5 hours ago",
    location: "Chennai",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    message: "High pollution expected tomorrow",
    time: "1 day ago",
    location: "Chennai",
    read: false,
  },
  {
    id: "4",
    type: "success",
    message: "AQI dropped to healthy levels",
    time: "2 days ago",
    location: "Chennai",
    read: false,
  },
];

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-aqi-unhealthy" />;
    case "success":
      return <CheckCircle className="w-5 h-5 text-aqi-good" />;
    case "info":
      return <Info className="w-5 h-5 text-primary" />;
  }
};

export const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center font-semibold">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 bg-card border-border">
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-sm text-muted-foreground">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>
        <ScrollArea className="h-[400px] bg-card">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-snug">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {notification.location && (
                          <>
                            <span>{notification.location}</span>
                            <span>•</span>
                          </>
                        )}
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <Separator />
        <div className="p-2 bg-card">
          <Button 
            variant="ghost" 
            className="w-full text-sm" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
