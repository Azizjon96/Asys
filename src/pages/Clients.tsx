import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Mail, Phone, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const clients = [
    { id: 1, name: "Иванов Иван Иванович", phone: "+992 123 456 789", email: "ivanov@email.com", contracts: 2, status: "Активный" },
    { id: 2, name: "Петрова Мария Сергеевна", phone: "+992 123 456 790", email: "petrova@email.com", contracts: 1, status: "Активный" },
    { id: 3, name: "Сидоров Петр Алексеевич", phone: "+992 123 456 791", email: "sidorov@email.com", contracts: 3, status: "Активный" },
    { id: 4, name: "Смирнова Елена Дмитриевна", phone: "+992 123 456 792", email: "smirnova@email.com", contracts: 1, status: "В ожидании" },
    { id: 5, name: "Козлов Андрей Николаевич", phone: "+992 123 456 793", email: "kozlov@email.com", contracts: 2, status: "Активный" },
    { id: 6, name: "Новикова Ольга Владимировна", phone: "+992 123 456 794", email: "novikova@email.com", contracts: 1, status: "Активный" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Клиенты</h1>
          <p className="text-muted-foreground">Управление взаимоотношениями с клиентами</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Добавить клиента
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск клиентов..."
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
                <TableHead>ФИО</TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>Договоры</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span>{client.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.contracts}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === "Активный" ? "default" : "secondary"}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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

export default Clients;
