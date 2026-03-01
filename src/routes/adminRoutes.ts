import { Routes } from "@/types";

export const AdminRoutes: Routes = {
  items: [
    {
      title: "Dashboard",
      url: "/admin-dashboard",
    },
    {
      title: "Category",
      url: "/admin-dashboard/category",
    },
    {
      title: "Tutors",
      url: "/admin-dashboard/tutors",
    },
    {
      title: "Students",
      url: "/admin-dashboard/students",
    },
  ],
};
