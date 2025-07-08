
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, Mail, Smartphone } from "lucide-react";
import { MoreVertical, CheckCircle, Bell as BellIcon } from "lucide-react";
import { useEffect } from "react";

const mockNotifications = [
  {
    id: 1,
    title: "Expense Added",
    message: "You added $25.00 to Groceries.",
    date: new Date(),
    read: false,
    group: "Today"
  },
  {
    id: 2,
    title: "Budget Limit Approaching",
    message: "You are close to your monthly budget limit.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: false,
    group: "Today"
  },
  {
    id: 3,
    title: "Weekly Report Ready",
    message: "Your weekly spending report is available.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
    group: "This Week"
  },
  {
    id: 4,
    title: "Receipt Reminder",
    message: "Don’t forget to scan your receipts!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    read: true,
    group: "Earlier"
  }
];

const groupOrder = ["Today", "This Week", "Earlier"];

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [markingAll, setMarkingAll] = useState(false);

  // Animate page load
  useEffect(() => {
    document.body.classList.add("animate-fade-slide-in");
    return () => document.body.classList.remove("animate-fade-slide-in");
  }, []);

  const markAllAsRead = () => {
    setMarkingAll(true);
    setTimeout(() => {
      setNotifications(n => n.map(notif => ({ ...notif, read: true })));
      setMarkingAll(false);
    }, 600);
  };

  const markAsRead = (id: number) => {
    setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  };

  const grouped = groupOrder.map(group => ({
    group,
    items: notifications.filter(n => n.group === group)
  })).filter(g => g.items.length > 0);

  const isEmpty = notifications.length === 0;
  const allRead = notifications.every(n => n.read);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 flex flex-col items-center justify-start animate-fade-slide-up">
      <div className="w-full max-w-xl px-4 sm:px-0 py-8 overflow-y-auto" style={{minHeight:'100vh'}}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-8 sticky top-0 z-10 bg-blue-100/60 backdrop-blur-md py-4 animate-stagger-in" style={{animationDelay:'100ms'}}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="rounded-full bg-white/70 hover:bg-blue-100 shadow-md border border-blue-200 transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-800 ml-2 tracking-tight flex-1">Notifications</h1>
          {!isEmpty && !allRead && (
            <Button
              onClick={markAllAsRead}
              disabled={markingAll}
              className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all duration-150 animate-glow-on-press"
            >
              {markingAll ? <CheckCircle className="animate-spin mr-2 inline-block" /> : null}
              Mark all as read
            </Button>
          )}
        </div>
        {/* Empty State */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-96 animate-fade-slide-up">
            <BellIcon className="w-24 h-24 text-blue-300 mb-6 animate-bounce" />
            <h2 className="text-2xl font-bold text-blue-700 mb-2">You're all caught up!</h2>
            <p className="text-blue-500 text-lg">No new notifications.</p>
          </div>
        )}
        {/* Notification Groups */}
        {grouped.map((group, gi) => (
          <div key={group.group} className="mb-8">
            <div className="sticky top-20 z-5 bg-blue-100/80 backdrop-blur-md px-2 py-2 rounded-xl font-bold text-blue-700 text-lg shadow animate-stagger-in" style={{animationDelay:`${150+gi*50}ms`}}>
              {group.group}
            </div>
            <div className="space-y-6 mt-4">
              {group.items.map((notif, ni) => (
                <Card
                  key={notif.id}
                  onClick={() => !notif.read && markAsRead(notif.id)}
                  className={`relative p-7 rounded-2xl glass-card shadow-xl cursor-pointer transition-all duration-200 animate-stagger-in ${notif.read ? 'bg-white/60' : 'bg-white/90 border-2 border-blue-200 ring-2 ring-blue-300/40'} ${notif.read ? 'opacity-80' : 'hover:scale-[1.025] hover:shadow-2xl hover:ring-4 hover:ring-blue-400/30'} ${notif.read ? '' : 'font-bold'}`}
                  style={{animationDelay:`${200+ni*80}ms`}}
                  tabIndex={0}
                  aria-label={notif.title + ': ' + notif.message}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${notif.read ? 'bg-blue-200' : 'bg-blue-500 animate-pulse'} mr-2`} />
                    <div className="flex-1">
                      <div className={`text-lg ${notif.read ? 'font-medium text-blue-700' : 'font-bold text-blue-900'}`}>{notif.title}</div>
                      <div className={`text-base ${notif.read ? 'text-blue-500' : 'text-blue-700'}`}>{notif.message}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notif.read && <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-blue-100"
                        aria-label="Notification actions"
                        tabIndex={-1}
                      >
                        <MoreVertical className="w-5 h-5 text-blue-400" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
        {/*
        // Old settings UI (commented for reference)
        <div className="px-4 py-6 space-y-6">
          ...
        </div>
        */}
      </div>
    </div>
  );
};

export default Notifications;
