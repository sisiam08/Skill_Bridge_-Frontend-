"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Routes } from "@/types";
import { UserRole } from "@/constants/roles";
import { AdminRoutes } from "@/routes/adminRoutes";
import { StudentRoutes } from "@/routes/studentRoutes";
import { TutorRoutes } from "@/routes/tutorRoutes";
import { authClient } from "@/lib/auth-client";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  const router = useRouter();
  let routes: Routes = { items: [] };

  switch (user.role) {
    case UserRole.ADMIN:
      routes = AdminRoutes;
      break;
    case UserRole.TUTOR:
      routes = TutorRoutes;
      break;
    case UserRole.STUDENT:
      routes = StudentRoutes;
      break;

    default:
      routes = { items: [] };
      break;
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 pt-2 pb-6 pl-2">
          {/* <div className="size-9 bg-[#ec5b13] rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">school</span>
          </div> */}

          <span className="text-xl font-bold tracking-tight text-[#221610] dark:text-white">
            SkillBridge
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {routes.items.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarMenu>
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild title={item.title}>
                  <a href={item.url}>{item.title}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              title="Logout"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
