import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, AlertCircle, Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Payment Received",
      message: "Payment of $25,000 received from John Anderson for CON-001",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Payment Due Soon",
      message: "Monthly payment of $5,000 due in 3 days for CON-001",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "New Contract Signed",
      message: "Contract CON-005 has been signed by Emma Davis",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "info",
      title: "Meeting Scheduled",
      message: "Site visit scheduled for Sunset Heights Block A on Jan 18",
      time: "2 days ago",
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      default:
        return <Info className="w-5 h-5 text-info" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-success/10";
      case "warning":
        return "bg-warning/10";
      default:
        return "bg-info/10";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your business activities</p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-muted/50 transition-colors ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getBgColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <Badge variant="default" className="shrink-0">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
