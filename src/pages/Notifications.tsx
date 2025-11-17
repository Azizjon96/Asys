import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, AlertCircle, Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Платёж получен",
      message: "Получен платёж 1 875 000 ₽ от Иванова И.И. по договору ДОГ-001",
      time: "2 часа назад",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Скоро платёж",
      message: "Ежемесячный платёж 375 000 ₽ должен быть произведён через 3 дня по ДОГ-001",
      time: "5 часов назад",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Подписан новый договор",
      message: "Смирновой Е.Д. подписан договор ДОГ-005",
      time: "1 день назад",
      read: true,
    },
    {
      id: 4,
      type: "info",
      title: "Запланирована встреча",
      message: "Осмотр объекта в Закатных Высотах, Блок А, на 18 января",
      time: "2 дня назад",
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Уведомления</h1>
          <p className="text-muted-foreground">Будьте в курсе деятельности вашего бизнеса</p>
        </div>
        <Button variant="outline">Отметить всё прочитанным</Button>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Последние уведомления
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
                        <Badge variant="default" className="shrink-0">Новое</Badge>
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
