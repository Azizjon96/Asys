import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Building, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Blocks = () => {
  const blocks = [
    { id: 1, name: "Block A", complex: "Sunset Heights", floors: 12, units: 30, available: 5, status: "Active" },
    { id: 2, name: "Block B", complex: "Sunset Heights", floors: 10, units: 28, available: 3, status: "Active" },
    { id: 3, name: "Block A", complex: "Green Valley", floors: 8, units: 24, available: 2, status: "Active" },
    { id: 4, name: "Block B", complex: "Green Valley", floors: 8, units: 26, available: 4, status: "Active" },
    { id: 5, name: "Block A", complex: "Park View", floors: 15, units: 35, available: 8, status: "Active" },
    { id: 6, name: "Block C", complex: "Park View", floors: 15, units: 35, available: 6, status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Blocks</h1>
          <p className="text-muted-foreground">Manage blocks within complexes</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Block
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) => (
          <Card key={block.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{block.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{block.complex}</p>
                  </div>
                </div>
                <Badge variant="outline">{block.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Floors
                  </span>
                  <span className="font-medium">{block.floors}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Units</span>
                  <span className="font-medium">{block.units}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-semibold text-success">{block.available}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blocks;
