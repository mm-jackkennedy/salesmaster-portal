
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("card-hover overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="h-5 w-5 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend !== undefined) && (
          <div className="flex items-center mt-1">
            {trend !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center mr-2 text-xs font-medium",
                  trend >= 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {trend >= 0 ? "+" : ""}
                {trend}%
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
