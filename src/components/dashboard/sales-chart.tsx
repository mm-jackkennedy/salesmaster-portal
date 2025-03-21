
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", sales: 1200 },
  { day: "Tue", sales: 1800 },
  { day: "Wed", sales: 1400 },
  { day: "Thu", sales: 2100 },
  { day: "Fri", sales: 2400 },
  { day: "Sat", sales: 3000 },
  { day: "Sun", sales: 2300 },
];

export function SalesChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Weekly Sales</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`$${value}`, "Sales"]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
