
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { getRecentSales, SaleTransaction } from "@/services/dashboardService";

export function RecentSales() {
  const [transactions, setTransactions] = useState<SaleTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentSales = async () => {
      try {
        setLoading(true);
        const data = await getRecentSales();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch recent sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSales();
  }, []);

  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          You made {transactions.length} sales today
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-6 text-center">Loading recent sales...</div>
        ) : (
          <div className="space-y-6">
            {transactions.map((transaction) => (
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
        )}
      </CardContent>
    </Card>
  );
}
