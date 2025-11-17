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

const Contracts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const contracts = [
    {
      id: "CON-001",
      client: "John Anderson",
      complex: "Sunset Heights",
      block: "Block A",
      apartment: "A-305",
      area: "85 m²",
      totalPrice: "$250,000",
      status: "Active",
      date: "2024-01-15",
    },
    {
      id: "CON-002",
      client: "Sarah Williams",
      complex: "Green Valley",
      block: "Block B",
      apartment: "B-201",
      area: "72 m²",
      totalPrice: "$180,000",
      status: "Active",
      date: "2024-01-14",
    },
    {
      id: "CON-003",
      client: "Michael Chen",
      complex: "Park View",
      block: "Block C",
      apartment: "C-410",
      area: "95 m²",
      totalPrice: "$320,000",
      status: "Pending",
      date: "2024-01-13",
    },
    {
      id: "CON-004",
      client: "Emma Davis",
      complex: "Riverside Plaza",
      block: "Block A",
      apartment: "A-502",
      area: "88 m²",
      totalPrice: "$290,000",
      status: "Active",
      date: "2024-01-12",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Contracts</h1>
          <p className="text-muted-foreground">Manage property contracts and agreements</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Contract
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search contracts..."
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
                <TableHead>Contract ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
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
                    <Badge variant={contract.status === "Active" ? "default" : "secondary"}>
                      {contract.status}
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

export default Contracts;
