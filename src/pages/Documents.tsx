import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText } from "lucide-react";
import { toast } from "sonner";

const statusOptions = [
  { value: "at_notary", label: "У нотариуса" },
  { value: "at_mbti", label: "У МБТИ" },
  { value: "for_signature", label: "На подпись" },
  { value: "at_ju", label: "В ЖУ" },
  { value: "ready", label: "Готово" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "at_notary":
      return "bg-blue-500";
    case "at_mbti":
      return "bg-purple-500";
    case "for_signature":
      return "bg-yellow-500";
    case "at_ju":
      return "bg-orange-500";
    case "ready":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export default function Documents() {
  const [open, setOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState("");
  const [status, setStatus] = useState("at_notary");
  const [notes, setNotes] = useState("");
  const queryClient = useQueryClient();

  // Fetch contracts with full payment
  const { data: contracts } = useQuery({
    queryKey: ["paid-contracts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          client:clients(full_name, phone),
          apartment:apartments(apartment_number, block:blocks(name))
        `)
        .eq("status", "completed");

      if (error) throw error;
      return data;
    },
  });

  // Fetch tech passports
  const { data: techPassports } = useQuery({
    queryKey: ["tech-passports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tech_passports")
        .select(`
          *,
          contract:contracts(
            contract_number,
            client:clients(full_name, phone),
            apartment:apartments(apartment_number, block:blocks(name))
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { contract_id: string; status: string; notes: string }) => {
      const contract = contracts?.find((c) => c.id === data.contract_id);
      const { error } = await supabase.from("tech_passports").insert({
        contract_id: data.contract_id,
        client_id: contract?.client_id,
        status: data.status,
        notes: data.notes,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-passports"] });
      toast.success("Техпаспорт создан");
      setOpen(false);
      setSelectedContract("");
      setStatus("at_notary");
      setNotes("");
    },
    onError: () => {
      toast.error("Ошибка при создании техпаспорта");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("tech_passports")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-passports"] });
      toast.success("Статус обновлен");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Документы</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Создать техпаспорт
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый техпаспорт</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Договор</Label>
                <Select value={selectedContract} onValueChange={setSelectedContract}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите договор" />
                  </SelectTrigger>
                  <SelectContent>
                    {contracts?.map((contract) => (
                      <SelectItem key={contract.id} value={contract.id}>
                        {contract.contract_number} - {contract.client?.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Статус</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Примечания</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Дополнительная информация..."
                />
              </div>

              <Button
                className="w-full"
                onClick={() =>
                  createMutation.mutate({
                    contract_id: selectedContract,
                    status,
                    notes,
                  })
                }
                disabled={!selectedContract}
              >
                Создать
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {techPassports?.map((passport) => {
          const statusLabel = statusOptions.find((s) => s.value === passport.status)?.label;
          return (
            <Card key={passport.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    <div>
                      <CardTitle className="text-lg">
                        {passport.contract?.contract_number}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {passport.contract?.client?.full_name}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(passport.status)}>
                    {statusLabel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Квартира:</span>{" "}
                    {passport.contract?.apartment?.block?.name} -{" "}
                    {passport.contract?.apartment?.apartment_number}
                  </p>
                  {passport.notes && (
                    <p className="text-sm text-muted-foreground">{passport.notes}</p>
                  )}
                  <div className="pt-2">
                    <Label className="text-xs">Изменить статус:</Label>
                    <Select
                      value={passport.status}
                      onValueChange={(value) =>
                        updateStatusMutation.mutate({ id: passport.id, status: value })
                      }
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
