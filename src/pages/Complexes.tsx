import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Building2, MapPin, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Complexes = () => {
  const complexes = [
    {
      id: 1,
      name: "Закатные Высоты",
      address: "ул. Закатная 123, Центральный район",
      blocks: 4,
      totalUnits: 120,
      available: 15,
      status: "Активный",
    },
    {
      id: 2,
      name: "Зелёная Долина",
      address: "ул. Долинная 456, Северный район",
      blocks: 3,
      totalUnits: 90,
      available: 8,
      status: "Активный",
    },
    {
      id: 3,
      name: "Вид на Парк",
      address: "пр. Парковый 789, Восточная сторона",
      blocks: 5,
      totalUnits: 150,
      available: 22,
      status: "Активный",
    },
    {
      id: 4,
      name: "Речная Площадь",
      address: "ул. Речная 321, Набережная",
      blocks: 6,
      totalUnits: 180,
      available: 35,
      status: "Строится",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Жилые комплексы</h1>
          <p className="text-muted-foreground">Управление жилищными проектами</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Добавить комплекс
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {complexes.map((complex) => (
          <Card key={complex.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{complex.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{complex.address}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={complex.status === "Активный" ? "default" : "secondary"}>
                  {complex.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{complex.blocks}</div>
                  <div className="text-xs text-muted-foreground mt-1">Блоков</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{complex.totalUnits}</div>
                  <div className="text-xs text-muted-foreground mt-1">Всего квартир</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{complex.available}</div>
                  <div className="text-xs text-muted-foreground mt-1">Доступно</div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full gap-2">
                  <Home className="w-4 h-4" />
                  Подробнее
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Complexes;
