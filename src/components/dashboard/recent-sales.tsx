
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface SaleTransaction {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: number;
  date: Date;
  status: "completed" | "pending" | "failed";
}

const mockTransactions: SaleTransaction[] = [
  {
    id: "T1",
    customer: {
      name: "Alex Johnson",
      email: "alex@example.com",
    },
    amount: 149.99,
    date: new Date("2023-08-15T14:24:00"),
    status: "completed",
  },
  {
    id: "T2",
    customer: {
      name: "Sarah Williams",
      email: "sarah@example.com",
    },
    amount: 89.95,
    date: new Date("2023-08-15T12:54:00"),
    status: "completed",
  },
  {
    id: "T3",
    customer: {
      name: "Michael Brown",
      email: "michael@example.com",
    },
    amount: 249.50,
    date: new Date("2023-08-15T10:15:00"),
    status: "pending",
  },
  {
    id: "T4",
    customer: {
      name: "Emma Davis",
      email: "emma@example.com",
    },
    amount: 59.99,
    date: new Date("2023-08-14T16:42:00"),
    status: "completed",
  },
  {
    id: "T5",
    customer: {
      name: "James Wilson",
      email: "james@example.com",
    },
    amount: 129.99,
    date: new Date("2023-08-14T09:30:00"),
    status: "failed",
  },
];

export function RecentSales() {
  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          You made {mockTransactions.length} sales today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  {!transaction.customer.avatar && (
                    <div className="h-full w-full rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {transaction.customer.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction.customer.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.customer.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium">
                  ${transaction.amount.toFixed(2)}
                </p>
                <div className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      transaction.status === "completed"
                        ? "bg-green-500"
                        : transaction.status === "pending"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  />
                  <p className="text-xs capitalize text-muted-foreground">
                    {transaction.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
