
import React from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "On Leave" | "Inactive";
  joinDate: Date;
}

const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Store Manager",
    status: "Active",
    joinDate: new Date("2022-01-15"),
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Cashier",
    status: "Active",
    joinDate: new Date("2022-03-10"),
  },
  {
    id: "EMP003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Sales Associate",
    status: "On Leave",
    joinDate: new Date("2022-05-22"),
  },
  {
    id: "EMP004",
    name: "Lisa Brown",
    email: "lisa.brown@example.com",
    role: "Inventory Manager",
    status: "Active",
    joinDate: new Date("2022-02-08"),
  },
  {
    id: "EMP005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Cashier",
    status: "Inactive",
    joinDate: new Date("2022-04-17"),
  },
  {
    id: "EMP006",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Sales Associate",
    status: "Active",
    joinDate: new Date("2022-06-30"),
  },
];

const EmployeesPage = () => {
  return (
    <AdminLayout>
      <PageHeader 
        title="Employees" 
        description="Manage your store staff"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employees..."
              className="pl-8 w-[200px] lg:w-[280px]"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in">
        {mockEmployees.map((employee) => (
          <Card key={employee.id} className="card-hover">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-12 w-12">
                <div className="h-full w-full rounded-full bg-primary flex items-center justify-center">
                  <span className="text-base font-medium text-primary-foreground">
                    {employee.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </span>
                </div>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">{employee.name}</CardTitle>
                <CardDescription>{employee.email}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Deactivate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p>{employee.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      employee.status === "Active"
                        ? "default"
                        : employee.status === "On Leave"
                        ? "outline"
                        : "secondary"
                    }
                    className="mt-1"
                  >
                    {employee.status}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                  <p>{employee.joinDate.toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default EmployeesPage;
