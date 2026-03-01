import { AppSidebar } from "@/components/layout/AppSidebar";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserRole } from "@/constants/roles";
import { UserService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  admin,
  tutor,
  student,
}: {
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {
  const session = await UserService.getSession();
  const userInfo = session?.data?.user;

  if (!userInfo) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === UserRole.ADMIN
            ? admin
            : userInfo.role == UserRole.TUTOR
              ? tutor
              : student}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
