import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Search, MoreVertical, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Contracts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleNewContract = () => {
    toast({
      title: "Новый договор",
      description: "Функция создания договора будет добавлена после подключения базы данных",
    });
  };

  const handleContractActions = (contractId: string) => {
    toast({
      title: "Действия с договором",
      description: `Выбран договор ${contractId}. Функционал будет добавлен.`,
    });
  };

  const contracts = [
    {
      id: "ДОГ-001",
      client: "Иванов Иван Иванович",
      complex: "Закатные Высоты",
      block: "Блок А",
      apartment: "А-305",
      area: "85 м²",
      totalPrice: "18 750 000 ₽",
      status: "Активный",
      date: "15.01.2024",
    },
    {
      id: "ДОГ-002",
      client: "Петрова Мария Сергеевна",
      complex: "Зелёная Долина",
      block: "Блок Б",
      apartment: "Б-201",
      area: "72 м²",
      totalPrice: "13 500 000 ₽",
      status: "Активный",
      date: "14.01.2024",
    },
    {
      id: "ДОГ-003",
      client: "Сидоров Петр Алексеевич",
      complex: "Вид на Парк",
      block: "Блок В",
      apartment: "В-410",
      area: "95 м²",
      totalPrice: "24 000 000 ₽",
      status: "В ожидании",
      date: "13.01.2024",
    },
    {
      id: "ДОГ-004",
      client: "Смирнова Елена Дмитриевна",
      complex: "Речная Площадь",
      block: "Блок А",
      apartment: "А-502",
      area: "88 м²",
      totalPrice: "21 750 000 ₽",
      status: "Активный",
      date: "12.01.2024",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Договоры</h1>
          <p className="text-muted-foreground">Управление договорами на недвижимость</p>
        </div>
        <Button className="gap-2" onClick={handleNewContract}>
          <Plus className="w-4 h-4" />
          Новый договор
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск договоров..."
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
                <TableHead>№ Договора</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Объект</TableHead>
                <TableHead>Площадь</TableHead>
                <TableHead>Стоимость</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-mono font-medium">{contract.id}</TableCell>
                  <TableCell>{contract.client}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{contract.complex}</div>
                      <div className="text-xs text-muted-foreground">
                        {contract.block} • {contract.apartment}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{contract.area}</TableCell>
                  <TableCell className="font-semibold">{contract.totalPrice}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {contract.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={contract.status === "Активный" ? "default" : "secondary"}>
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleContractActions(contract.id)}
                    >
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

export default Contracts;
