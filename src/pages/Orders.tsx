
import React from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  customer: string;
  date: Date;
  items: number;
  total: number;
  status: "Completed" | "Processing" | "Cancelled";
  paymentMethod: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Alex Johnson",
    date: new Date("2023-08-15T14:24:00"),
    items: 3,
    total: 149.99,
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Sarah Williams",
    date: new Date("2023-08-15T12:54:00"),
    items: 2,
    total: 89.95,
    status: "Completed",
    paymentMethod: "Cash",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    date: new Date("2023-08-15T10:15:00"),
    items: 5,
    total: 249.50,
    status: "Processing",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: "Emma Davis",
    date: new Date("2023-08-14T16:42:00"),
    items: 1,
    total: 59.99,
    status: "Completed",
    paymentMethod: "Mobile Payment",
  },
  {
    id: "ORD-005",
    customer: "James Wilson",
    date: new Date("2023-08-14T09:30:00"),
    items: 4,
    total: 129.99,
    status: "Cancelled",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-006",
    customer: "Olivia Garcia",
    date: new Date("2023-08-13T15:20:00"),
    items: 2,
    total: 79.98,
    status: "Completed",
    paymentMethod: "Cash",
  },
  {
    id: "ORD-007",
    customer: "William Martinez",
    date: new Date("2023-08-13T11:45:00"),
    items: 3,
    total: 119.97,
    status: "Processing",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-008",
    customer: "Sophia Rodriguez",
    date: new Date("2023-08-12T14:10:00"),
    items: 1,
    total: 49.99,
    status: "Completed",
    paymentMethod: "Mobile Payment",
  },
];

const OrdersPage = () => {
  return (
    <AdminLayout>
      <PageHeader 
        title="Orders" 
        description="View and manage all transactions"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 w-[200px] lg:w-[280px]"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </PageHeader>

      <Card className="animate-in">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            A list of all recent orders and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    {order.date.toLocaleDateString()} {order.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Completed"
                          ? "default"
                          : order.status === "Processing"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default OrdersPage;
