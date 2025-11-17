import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Users, FileText, Building2, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Clients",
      value: "1,247",
      icon: Users,
      trend: { value: "12% from last month", isPositive: true },
      variant: "info" as const,
    },
    {
      title: "Active Contracts",
      value: "89",
      icon: FileText,
      trend: { value: "5% from last month", isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Complexes",
      value: "15",
      icon: Building2,
      variant: "default" as const,
    },
    {
      title: "Total Revenue",
      value: "$2.4M",
      icon: DollarSign,
      trend: { value: "18% from last month", isPositive: true },
      variant: "warning" as const,
    },
  ];

  const recentContracts = [
    { id: 1, client: "John Anderson", complex: "Sunset Heights", amount: "$250,000", date: "2024-01-15" },
    { id: 2, client: "Sarah Williams", complex: "Green Valley", amount: "$180,000", date: "2024-01-14" },
    { id: 3, client: "Michael Chen", complex: "Park View", amount: "$320,000", date: "2024-01-13" },
    { id: 4, client: "Emma Davis", complex: "Riverside Plaza", amount: "$290,000", date: "2024-01-12" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Contracts</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
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
              Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="text-sm font-medium">$850K</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Last Month</span>
                  <span className="text-sm font-medium">$720K</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-muted-foreground h-2 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+18% increase</span>
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
            Upcoming Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { task: "Follow up with John Anderson", time: "Today, 2:00 PM" },
              { task: "Contract signing - Green Valley", time: "Tomorrow, 10:00 AM" },
              { task: "Site visit - Sunset Heights Block A", time: "Jan 18, 3:00 PM" },
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
