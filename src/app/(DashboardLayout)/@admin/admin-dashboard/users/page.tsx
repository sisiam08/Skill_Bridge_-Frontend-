"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ShieldBan, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { getAllUsers, updateUserStatus } from "@/actions/admin.action";
import { UserType, UsersFilter } from "@/types";
import { UserRole } from "@/constants/roles";
import { UserStatus } from "@/constants/status";
import { format } from "date-fns";

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filters, setFilters] = useState<UsersFilter>({
    search: undefined,
    role: undefined,
    status: undefined,
  });

  const loadUsers = async () => {
    const response = await getAllUsers(filters);
    if (response.error || !response.data) return;

    setUsers(response.data.data);
  };

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    const toastId = toast.loading(`Updating user status...`);
    try {
      const response = await updateUserStatus(userId, newStatus);

      if (response.error || !response.data) {
        toast.error(
          response.error?.message || "Failed to update user status!",
          { id: toastId },
        );
        return;
      }

      toast.success("User status updated successfully.", { id: toastId });

      await loadUsers();
    } catch (error) {
      toast.error("Failed to update user status!", { id: toastId });
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case UserRole.TUTOR:
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case UserRole.STUDENT:
        return "bg-green-100 text-green-700 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">User Management</CardTitle>
            <CardDescription>
              View and manage all users on the platform.
            </CardDescription>
          </div>
          <Badge className="bg-[#ec5b13] text-white hover:bg-[#ec5b13]">
            {users.length} Users
          </Badge>
        </CardHeader>
      </Card>

      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 [animation-delay:80ms]">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Filter users by role, status, or search
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={filters.search || ""}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filters.role === undefined ? "default" : "outline"}
                onClick={() => setFilters({ ...filters, role: undefined })}
                className={
                  filters.role === undefined
                    ? "bg-[#ec5b13] hover:bg-[#d44f10]"
                    : ""
                }
              >
                All
              </Button>
              <Button
                variant={
                  filters.role === UserRole.STUDENT ? "default" : "outline"
                }
                onClick={() =>
                  setFilters({ ...filters, role: UserRole.STUDENT })
                }
                className={
                  filters.role === UserRole.STUDENT
                    ? "bg-[#ec5b13] hover:bg-[#d44f10]"
                    : ""
                }
              >
                Students
              </Button>
              <Button
                variant={
                  filters.role === UserRole.TUTOR ? "default" : "outline"
                }
                onClick={() => setFilters({ ...filters, role: UserRole.TUTOR })}
                className={
                  filters.role === UserRole.TUTOR
                    ? "bg-[#ec5b13] hover:bg-[#d44f10]"
                    : ""
                }
              >
                Tutors
              </Button>
              <Button
                variant={
                  filters.role === UserRole.ADMIN ? "default" : "outline"
                }
                onClick={() => setFilters({ ...filters, role: UserRole.ADMIN })}
                className={
                  filters.role === UserRole.ADMIN
                    ? "bg-[#ec5b13] hover:bg-[#d44f10]"
                    : ""
                }
              >
                Admins
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filters.status === undefined ? "default" : "outline"}
              onClick={() => setFilters({ ...filters, status: undefined })}
              className={
                filters.status === undefined
                  ? "bg-[#ec5b13] hover:bg-[#d44f10]"
                  : ""
              }
            >
              All Status
            </Button>
            <Button
              variant={
                filters.status === UserStatus.UNBAN ? "default" : "outline"
              }
              onClick={() =>
                setFilters({ ...filters, status: UserStatus.UNBAN })
              }
              className={
                filters.status === UserStatus.UNBAN
                  ? "bg-[#ec5b13] hover:bg-[#d44f10]"
                  : ""
              }
            >
              Active
            </Button>
            <Button
              variant={
                filters.status === UserStatus.BAN ? "default" : "outline"
              }
              onClick={() => setFilters({ ...filters, status: UserStatus.BAN })}
              className={
                filters.status === UserStatus.BAN
                  ? "bg-[#ec5b13] hover:bg-[#d44f10]"
                  : ""
              }
            >
              Banned
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 [animation-delay:140ms]">
        <CardHeader>
          <CardTitle>
            {filters.role === UserRole.STUDENT
              ? "Students"
              : filters.role === UserRole.TUTOR
                ? "Tutors"
                : filters.role === UserRole.ADMIN
                  ? "Admins"
                  : "All Users"}
          </CardTitle>
          <CardDescription>
            Manage user accounts and permissions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.length === 0 ? (
            <p className="rounded-md border bg-muted/30 px-3 py-8 text-center text-sm text-muted-foreground">
              No users found matching your filters.
            </p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="space-y-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="bg-[#ec5b13]/10 text-[#ec5b13]">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{user.name}</p>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Joined: {format(new Date(user.createdAt), "PPP")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {user.status === UserStatus.UNBAN ? (
                      <>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          <ShieldCheck className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                        {user.role !== UserRole.ADMIN && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(user.id, UserStatus.BAN)
                            }
                          >
                            <ShieldBan className="mr-1 h-4 w-4" />
                            Ban User
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                          <ShieldBan className="mr-1 h-3 w-3" />
                          Banned
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-50"
                          onClick={() =>
                            handleStatusChange(user.id, UserStatus.UNBAN)
                          }
                        >
                          <ShieldCheck className="mr-1 h-4 w-4" />
                          Unban User
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <Separator />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
