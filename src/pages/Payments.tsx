import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Search, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const payments = [
    { id: "ПЛТ-001", contract: "ДОГ-001", client: "Иванов Иван Иванович", amount: "1 875 000 ₽", date: "15.01.2024", status: "Выполнен", type: "Первоначальный" },
    { id: "ПЛТ-002", contract: "ДОГ-002", client: "Петрова Мария Сергеевна", amount: "1 350 000 ₽", date: "14.01.2024", status: "Выполнен", type: "Первоначальный" },
    { id: "ПЛТ-003", contract: "ДОГ-001", client: "Иванов Иван Иванович", amount: "375 000 ₽", date: "01.02.2024", status: "В ожидании", type: "Ежемесячный" },
    { id: "ПЛТ-004", contract: "ДОГ-003", client: "Сидоров Петр Алексеевич", amount: "2 400 000 ₽", date: "13.01.2024", status: "Выполнен", type: "Первоначальный" },
    { id: "ПЛТ-005", contract: "ДОГ-004", client: "Смирнова Елена Дмитриевна", amount: "2 175 000 ₽", date: "12.01.2024", status: "Выполнен", type: "Первоначальный" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Платежи</h1>
          <p className="text-muted-foreground">Учёт и управление платёжными транзакциями</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Записать платёж
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Всего собрано</div>
            <div className="text-2xl font-bold text-foreground">8 175 000 ₽</div>
            <div className="text-xs text-success mt-2">В этом месяце</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">В ожидании</div>
            <div className="text-2xl font-bold text-warning">375 000 ₽</div>
            <div className="text-xs text-muted-foreground mt-2">Скоро к оплате</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Общая выручка</div>
            <div className="text-2xl font-bold text-foreground">180 000 000 ₽</div>
            <div className="text-xs text-muted-foreground mt-2">За всё время</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск платежей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>№ Платежа</TableHead>
                <TableHead>Договор</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono font-medium">{payment.id}</TableCell>
                  <TableCell className="font-mono text-sm">{payment.contract}</TableCell>
                  <TableCell>{payment.client}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.type}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{payment.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {payment.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={payment.status === "Выполнен" ? "default" : "secondary"}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
