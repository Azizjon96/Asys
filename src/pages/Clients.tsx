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
    { id: 1, name: "John Anderson", phone: "+1 234 567 8900", email: "john.anderson@email.com", contracts: 2, status: "Active" },
    { id: 2, name: "Sarah Williams", phone: "+1 234 567 8901", email: "sarah.williams@email.com", contracts: 1, status: "Active" },
    { id: 3, name: "Michael Chen", phone: "+1 234 567 8902", email: "michael.chen@email.com", contracts: 3, status: "Active" },
    { id: 4, name: "Emma Davis", phone: "+1 234 567 8903", email: "emma.davis@email.com", contracts: 1, status: "Pending" },
    { id: 5, name: "Robert Johnson", phone: "+1 234 567 8904", email: "robert.j@email.com", contracts: 2, status: "Active" },
    { id: 6, name: "Lisa Martinez", phone: "+1 234 567 8905", email: "lisa.martinez@email.com", contracts: 1, status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
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
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Contracts</TableHead>
                <TableHead>Status</TableHead>
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
                    <Badge variant={client.status === "Active" ? "default" : "secondary"}>
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
