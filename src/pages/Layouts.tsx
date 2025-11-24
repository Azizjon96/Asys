import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Building, CheckCircle, Hammer, Wrench, Home } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApartmentLayout {
  id: string;
  apartment_id: string;
  status: string;
  brick_work_approved: boolean;
  plumbing_approved: boolean;
  brick_work_notes: string | null;
  plumbing_notes: string | null;
  created_at: string;
  apartments: {
    apartment_number: string;
    floor: number;
    rooms: number;
    blocks: {
      name: string;
      complexes: {
        name: string;
      };
    };
  };
}

export default function Layouts() {
  const [layouts, setLayouts] = useState<ApartmentLayout[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLayouts();
  }, []);

  const fetchLayouts = async () => {
    try {
      const { data, error } = await supabase
        .from("apartment_layouts")
        .select(`
          *,
          apartments (
            apartment_number,
            floor,
            rooms,
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
      setLayouts(data || []);
    } catch (error) {
      console.error("Error fetching layouts:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить планировки",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (layoutId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("apartment_layouts")
        .update({ status: newStatus })
        .eq("id", layoutId);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Статус обновлен",
      });
      fetchLayouts();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус",
        variant: "destructive",
      });
    }
  };

  const updateApproval = async (
    layoutId: string,
    field: "brick_work_approved" | "plumbing_approved",
    value: boolean
  ) => {
    try {
      const { error } = await supabase
        .from("apartment_layouts")
        .update({ [field]: value })
        .eq("id", layoutId);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: value ? "Согласовано" : "Отменено согласование",
      });
      fetchLayouts();
    } catch (error) {
      console.error("Error updating approval:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить согласование",
        variant: "destructive",
      });
    }
  };

  const updateNotes = async (
    layoutId: string,
    field: "brick_work_notes" | "plumbing_notes",
    value: string
  ) => {
    try {
      const { error } = await supabase
        .from("apartment_layouts")
        .update({ [field]: value })
        .eq("id", layoutId);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Заметки сохранены",
      });
    } catch (error) {
      console.error("Error updating notes:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить заметки",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      brick_work: { label: "Кладка кирпича", variant: "default" },
      plumbing: { label: "Сантехника", variant: "secondary" },
      completed: { label: "Завершено", variant: "outline" },
    };

    const statusInfo = statusMap[status] || { label: status, variant: "default" };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Планировки квартир</h1>
        <p className="text-muted-foreground mt-2">
          Управление кладкой кирпича и проведением сантехнических труб
        </p>
      </div>

      <div className="grid gap-6">
        {layouts.map((layout) => (
          <Card key={layout.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Квартира {layout.apartments.apartment_number}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {layout.apartments.blocks.complexes.name} - {layout.apartments.blocks.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Этаж {layout.apartments.floor} • {layout.apartments.rooms} комн.
                    </p>
                  </div>
                </div>
                {getStatusBadge(layout.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Brick Work Section */}
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hammer className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Кладка кирпича (межкомнатные стены)</h3>
                  </div>
                  <Button
                    size="sm"
                    variant={layout.brick_work_approved ? "default" : "outline"}
                    onClick={() =>
                      updateApproval(layout.id, "brick_work_approved", !layout.brick_work_approved)
                    }
                  >
                    {layout.brick_work_approved ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Согласовано
                      </>
                    ) : (
                      "Согласовать"
                    )}
                  </Button>
                </div>
                <Textarea
                  placeholder="Заметки по кладке кирпича..."
                  value={layout.brick_work_notes || ""}
                  onChange={(e) =>
                    updateNotes(layout.id, "brick_work_notes", e.target.value)
                  }
                  rows={3}
                />
              </div>

              {/* Plumbing Section */}
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Сантехнические трубы (отопление, вода)</h3>
                  </div>
                  <Button
                    size="sm"
                    variant={layout.plumbing_approved ? "default" : "outline"}
                    onClick={() =>
                      updateApproval(layout.id, "plumbing_approved", !layout.plumbing_approved)
                    }
                  >
                    {layout.plumbing_approved ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Согласовано
                      </>
                    ) : (
                      "Согласовать"
                    )}
                  </Button>
                </div>
                <Textarea
                  placeholder="Заметки по расположению труб и распределению комнат..."
                  value={layout.plumbing_notes || ""}
                  onChange={(e) =>
                    updateNotes(layout.id, "plumbing_notes", e.target.value)
                  }
                  rows={3}
                />
              </div>

              {/* Status Update */}
              <div className="flex items-center gap-3 pt-3 border-t">
                <span className="text-sm font-medium">Изменить статус:</span>
                <Select
                  value={layout.status}
                  onValueChange={(value) => updateStatus(layout.id, value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brick_work">Кладка кирпича</SelectItem>
                    <SelectItem value="plumbing">Сантехника</SelectItem>
                    <SelectItem value="completed">Завершено</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}

        {layouts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Нет планировок для отображения
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Планировки будут появляться автоматически для завершенных квартир
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
