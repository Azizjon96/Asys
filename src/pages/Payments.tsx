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
    { id: "PAY-001", contract: "CON-001", client: "John Anderson", amount: "$25,000", date: "2024-01-15", status: "Completed", type: "Initial" },
    { id: "PAY-002", contract: "CON-002", client: "Sarah Williams", amount: "$18,000", date: "2024-01-14", status: "Completed", type: "Initial" },
    { id: "PAY-003", contract: "CON-001", client: "John Anderson", amount: "$5,000", date: "2024-02-01", status: "Pending", type: "Monthly" },
    { id: "PAY-004", contract: "CON-003", client: "Michael Chen", amount: "$32,000", date: "2024-01-13", status: "Completed", type: "Initial" },
    { id: "PAY-005", contract: "CON-004", client: "Emma Davis", amount: "$29,000", date: "2024-01-12", status: "Completed", type: "Initial" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Payments</h1>
          <p className="text-muted-foreground">Track and manage payment transactions</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Record Payment
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Total Collected</div>
            <div className="text-2xl font-bold text-foreground">$109,000</div>
            <div className="text-xs text-success mt-2">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Pending</div>
            <div className="text-2xl font-bold text-warning">$5,000</div>
            <div className="text-xs text-muted-foreground mt-2">Due soon</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
            <div className="text-2xl font-bold text-foreground">$2.4M</div>
            <div className="text-xs text-muted-foreground mt-2">All time</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
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
                <TableHead>Payment ID</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
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
                    <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>
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
