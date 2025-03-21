
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNav />
        <main className="flex-1 overflow-auto">
          <div className="container py-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
