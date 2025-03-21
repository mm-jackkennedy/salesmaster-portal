
import React from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { PopularProducts } from "@/components/dashboard/popular-products";
import { DollarSign, ShoppingBag, Users, CreditCard } from "lucide-react";

const Dashboard = () => {
  return (
    <AdminLayout>
      <PageHeader 
        title="Dashboard" 
        description="Overview of your point of sale system"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 animate-in">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          description="Last 30 days"
          icon={<DollarSign />}
          trend={12}
        />
        <StatCard
          title="Products"
          value="684"
          description="24 new this month"
          icon={<ShoppingBag />}
        />
        <StatCard
          title="Customers"
          value="573"
          description="128 new this month"
          icon={<Users />}
          trend={8}
        />
        <StatCard
          title="Average Order"
          value="$58.39"
          description="Up from $52.14"
          icon={<CreditCard />}
          trend={11}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-in">
        <SalesChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in">
        <RecentSales />
        <PopularProducts />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
