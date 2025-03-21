
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Receipt, 
  Users, 
  Settings,
  Menu
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: Receipt,
  },
  {
    title: "Employees",
    href: "/employees",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function SidebarNav() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">POS</span>
          </div>
          <span className="font-semibold text-xl">Admin</span>
        </Link>
        <SidebarTrigger asChild>
          <button className="p-2 rounded-md hover:bg-muted">
            <Menu className="h-5 w-5" />
          </button>
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "nav-link",
                location.pathname === item.href && "active"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-medium">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
