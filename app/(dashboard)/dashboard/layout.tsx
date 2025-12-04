import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getServerAuth } from "@/lib/getServerSession";
import React from "react";
import { redirect } from "next/navigation";
import AppSidebar from "@/components/dashboard/AppSidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuth();
  if (!session) {
    redirect("/sign-in");
  }
  const user = session.user;
  

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset className="mx-auto p-2">{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
