"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChartIcon,
  CreditCardIcon,
  FileIcon,
  LayoutGridIcon,
  NewspaperIcon,
  UserIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { Role } from "@/lib/generated/prisma/enums";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Stats",
        icon: BarChartIcon,
        url: "/dashboard/stats",
      },
      {
        title: "Manage Dashboard",
        icon: LayoutGridIcon,
        url: "/dashboard/manage-dashboard",
        isAdmin: true,
      },
      {
        title: "Profile",
        icon: UserIcon,
        url: "/dashboard/profile",
      },
      {
        title: "Templates",
        icon: FileIcon,
        url: "/dashboard/templates",
      },
      {
        title: "Payments",
        icon: CreditCardIcon,
        url: "/dashboard/payments",
        isAdmin: true,
      },
    ],
  },
];

export default function AppSidebar({ user }: { user?: any }) {
  const pathname = usePathname();
  const role = user?.role;

  const filterItems = (items: any[]) => {
    return items.filter((item) => {
      if (item.isAdmin && ![Role.ADMIN, Role.SUPERADMIN].includes(role))
        return false;

      return true;
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-primary">
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link prefetch href="/">
              <NewspaperIcon className="h-10 w-10 text-primary" />
              <span className="font-semibold text-sm">EverLetter</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {filterItems(group.items).map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      className="gap-x-4 h-10 px-4"
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
