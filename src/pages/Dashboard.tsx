import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Users, FileText, Building2, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    {
      title: "Всего клиентов",
      value: "1,247",
      icon: Users,
      trend: { value: "12% за последний месяц", isPositive: true },
      variant: "info" as const,
    },
    {
      title: "Активные договоры",
      value: "89",
      icon: FileText,
      trend: { value: "5% за последний месяц", isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Комплексов",
      value: "15",
      icon: Building2,
      variant: "default" as const,
    },
    {
      title: "Общая выручка",
      value: "$2.4M",
      icon: DollarSign,
      trend: { value: "18% за последний месяц", isPositive: true },
      variant: "warning" as const,
    },
  ];

  const recentContracts = [
    { id: 1, client: "Иван Андерсон", complex: "Закатные Высоты", amount: "18 750 000 ₽", date: "15.01.2024" },
    { id: 2, client: "Сара Уильямс", complex: "Зелёная Долина", amount: "13 500 000 ₽", date: "14.01.2024" },
    { id: 3, client: "Михаил Чен", complex: "Вид на Парк", amount: "24 000 000 ₽", date: "13.01.2024" },
    { id: 4, client: "Эмма Дэвис", complex: "Речная Площадь", amount: "21 750 000 ₽", date: "12.01.2024" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Панель управления</h1>
        <p className="text-muted-foreground">Добро пожаловать! Вот ваш обзор.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Последние договоры</CardTitle>
            <Button variant="ghost" size="sm">Все</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContracts.map((contract) => (
                <div key={contract.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{contract.client}</p>
                    <p className="text-sm text-muted-foreground">{contract.complex}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{contract.amount}</p>
                    <p className="text-xs text-muted-foreground">{contract.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Показатели продаж
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Этот месяц</span>
                  <span className="text-sm font-medium">63 750 000 ₽</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Прошлый месяц</span>
                  <span className="text-sm font-medium">54 000 000 ₽</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-muted-foreground h-2 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+18% рост</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning" />
            Предстоящие задачи
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { task: "Связаться с Иваном Андерсоном", time: "Сегодня, 14:00" },
              { task: "Подписание договора - Зелёная Долина", time: "Завтра, 10:00" },
              { task: "Осмотр объекта - Закатные Высоты Блок А", time: "18 янв, 15:00" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{item.task}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
