"use server"

import { AdminService } from "@/services/admin.service";

export const getAdminDashboardStats = async () => {
  const { data, error } = await AdminService.getAdminDashboardStats();
  return { data, error };
};
