import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Search, MoreVertical, Calendar, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contractSchema = z.object({
  contract_number: z.string().min(1, "Номер договора обязателен").max(50, "Максимум 50 символов"),
  client_id: z.string().min(1, "Выберите клиента"),
  apartment_id: z.string().min(1, "Выберите квартиру"),
  total_amount: z.string().min(1, "Укажите общую сумму").transform((val) => parseFloat(val)),
  initial_payment: z.string().transform((val) => val ? parseFloat(val) : 0),
  monthly_payment: z.string().transform((val) => val ? parseFloat(val) : 0),
  start_date: z.string().min(1, "Укажите дату начала"),
  end_date: z.string(),
  status: z.enum(["active", "pending", "completed", "cancelled"]),
});

type ContractFormData = z.infer<typeof contractSchema>;

interface ContractWithDetails {
  id: string;
  contract_number: string;
  client_id: string;
  apartment_id: string;
  total_amount: number;
  paid_amount: number;
  initial_payment: number;
  monthly_payment: number;
  start_date: string;
  end_date: string | null;
  status: string;
  clients: {
    id: string;
    full_name: string;
  } | null;
  apartments: {
    id: string;
    apartment_number: string;
    area: number;
    floor: number;
    blocks: {
      name: string;
      complexes: {
        name: string;
      } | null;
    } | null;
  } | null;
}

const Contracts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<ContractWithDetails | null>(null);
  const [deleteContractId, setDeleteContractId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      contract_number: "",
      client_id: "",
      apartment_id: "",
      total_amount: "" as any,
      initial_payment: "" as any,
      monthly_payment: "" as any,
      start_date: "",
      end_date: "",
      status: "active",
    },
  });

  // Fetch contracts with related data
  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          clients (
            id,
            full_name
          ),
          apartments (
            id,
            apartment_number,
            area,
            floor,
            blocks (
              name,
              complexes (
                name
              )
            )
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as ContractWithDetails[];
    },
  });

  // Fetch clients for select
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("id, full_name")
        .order("full_name");
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch available apartments for select
  const { data: apartments } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apartments")
        .select(`
          id,
          apartment_number,
          area,
          floor,
          price,
          status,
          blocks (
            name,
            complexes (
              name
            )
          )
        `)
        .eq("status", "available")
        .order("apartment_number");
      
      if (error) throw error;
      return data;
    },
  });

  // Create/Update contract mutation
  const saveMutation = useMutation({
    mutationFn: async (data: ContractFormData) => {
      const contractData = {
        contract_number: data.contract_number,
        client_id: data.client_id,
        apartment_id: data.apartment_id,
        total_amount: data.total_amount,
        initial_payment: data.initial_payment || 0,
        monthly_payment: data.monthly_payment || 0,
        start_date: data.start_date,
        end_date: data.end_date || null,
        status: data.status,
        paid_amount: data.initial_payment || 0,
      };

      if (editingContract) {
        const { error } = await supabase
          .from("contracts")
          .update(contractData)
          .eq("id", editingContract.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("contracts")
          .insert([contractData]);
        if (error) throw error;

        // Update apartment status to sold
        await supabase
          .from("apartments")
          .update({ status: "sold" })
          .eq("id", data.apartment_id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      setIsDialogOpen(false);
      setEditingContract(null);
      form.reset();
      toast({
        title: editingContract ? "Договор обновлен" : "Договор создан",
        description: editingContract 
          ? "Договор успешно обновлен" 
          : "Новый договор успешно создан",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось сохранить договор",
        variant: "destructive",
      });
    },
  });

  // Delete contract mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const contract = contracts?.find(c => c.id === id);
      
      const { error } = await supabase
        .from("contracts")
        .delete()
        .eq("id", id);
      
      if (error) throw error;

      // Return apartment to available status
      if (contract?.apartment_id) {
        await supabase
          .from("apartments")
          .update({ status: "available" })
          .eq("id", contract.apartment_id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      setDeleteContractId(null);
      toast({
        title: "Договор удален",
        description: "Договор успешно удален из системы",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось удалить договор",
        variant: "destructive",
      });
    },
  });

  const handleNewContract = () => {
    setEditingContract(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEdit = (contract: ContractWithDetails) => {
    setEditingContract(contract);
    form.reset({
      contract_number: contract.contract_number,
      client_id: contract.clients?.id || "",
      apartment_id: contract.apartments?.id || "",
      total_amount: contract.total_amount.toString() as any,
      initial_payment: contract.initial_payment.toString() as any,
      monthly_payment: contract.monthly_payment.toString() as any,
      start_date: contract.start_date,
      end_date: contract.end_date || "",
      status: contract.status as any,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteContractId(id);
  };

  const onSubmit = (data: ContractFormData) => {
    saveMutation.mutate(data);
  };

  const filteredContracts = contracts?.filter(contract => {
    const query = searchQuery.toLowerCase();
    return (
      contract.contract_number.toLowerCase().includes(query) ||
      contract.clients?.full_name.toLowerCase().includes(query) ||
      contract.apartments?.apartment_number.toLowerCase().includes(query)
    );
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "completed":
        return "secondary";
      case "pending":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Активный";
      case "completed":
        return "Завершен";
      case "pending":
        return "В ожидании";
      case "cancelled":
        return "Отменен";
      default:
        return status;
    }
  };

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
                <TableHead>Оплачено</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Загрузка...
                  </TableCell>
                </TableRow>
              ) : filteredContracts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Договоры не найдены
                  </TableCell>
                </TableRow>
              ) : (
                filteredContracts?.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-mono font-medium">{contract.contract_number}</TableCell>
                    <TableCell>{contract.clients?.full_name || "—"}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">
                          {contract.apartments?.blocks?.complexes?.name || "—"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {contract.apartments?.blocks?.name} • {contract.apartments?.apartment_number}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{contract.apartments?.area} м²</TableCell>
                    <TableCell className="font-semibold">
                      {contract.total_amount.toLocaleString()} ₽
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{contract.paid_amount.toLocaleString()} ₽</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((contract.paid_amount / contract.total_amount) * 100)}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(contract.start_date).toLocaleDateString('ru-RU')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(contract.status)}>
                        {getStatusLabel(contract.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(contract)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(contract.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingContract ? "Редактировать договор" : "Новый договор"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contract_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номер договора</FormLabel>
                      <FormControl>
                        <Input placeholder="ДОГ-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Статус</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите статус" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Активный</SelectItem>
                          <SelectItem value="pending">В ожидании</SelectItem>
                          <SelectItem value="completed">Завершен</SelectItem>
                          <SelectItem value="cancelled">Отменен</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Клиент</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите клиента" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients?.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apartment_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Квартира</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={editingContract !== null}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите квартиру" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {apartments?.map((apt: any) => (
                          <SelectItem key={apt.id} value={apt.id}>
                            {apt.blocks?.complexes?.name} - {apt.blocks?.name} - {apt.apartment_number} ({apt.area} м², {apt.price?.toLocaleString()} ₽)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="total_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Общая сумма (₽)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="initial_payment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Первый взнос (₽)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="monthly_payment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ежемесячный платеж (₽)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Дата начала</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Дата окончания (опционально)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Отмена
                </Button>
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Сохранение..." : "Сохранить"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteContractId !== null} onOpenChange={() => setDeleteContractId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить договор?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Договор будет удален, а квартира станет доступной для продажи.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteContractId && deleteMutation.mutate(deleteContractId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Contracts;
