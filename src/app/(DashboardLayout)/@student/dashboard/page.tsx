"use client";

import {
  getStudentRecentActivity,
  getStudentStats,
} from "@/actions/student.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StudentRecentActivity, StudentStats } from "@/types";
import {
  BookOpenCheck,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,

} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentDashboardPage() {
  const [studentStats, setStudentStats] = useState<StudentStats | null>(null);
  const [studentRecentActivity, setStudentRecentActivity] =
    useState<StudentRecentActivity | null>(null);

  // console.log(studentStats);
  // console.log(studentRecentActivity);

  useEffect(() => {
    (async () => {
      const StatsResponse = await getStudentStats();
      if (!StatsResponse.data?.success) {
        return;
      }
      setStudentStats(StatsResponse.data.data);

      const RecentActivityResponse = await getStudentRecentActivity();
      if (!RecentActivityResponse.data?.success) {
        return;
      }
      setStudentRecentActivity(RecentActivityResponse.data.data);
    })();
  }, []);

  const overviewStats = [
    {
      title: "Total Bookings",
      value: `${studentStats?.totalBookings ?? 0}`,
      note: `${studentStats?.monthlyBookings ?? 0} this month`,
      icon: CalendarCheck2,
    },
    {
      title: "Completed Sessions",
      value: `${studentStats?.completedSessions ?? 0}`,
      note: `${studentStats?.completionRate.toFixed(1) ?? 0}% completion rate`,
      icon: CheckCircle2,
    },
    {
      title: "Learning Spend",
      value: `৳ ${studentStats?.totalSpent ?? 0}`,
      note: "Across all bookings",
      icon: CircleDollarSign,
    },
    {
      title: "Refundable Amount",
      value: `৳ ${studentStats?.refundableAmount ?? 0}`,
      note: "Across cancelled bookings",
      icon: CircleDollarSign,
    },
  ];

  const recentActivity = [
    Object.keys(studentRecentActivity?.recentSession || {}).length > 0
      ? {
          title: "Session Completed",
          description: `${studentRecentActivity?.recentSession.categoryName} with ${studentRecentActivity?.recentSession.tutorName}`,
          time: studentRecentActivity?.recentSession.timeAgo ?? "-",
        }
      : null,
    Object.keys(studentRecentActivity?.recentReview || {}).length > 0
      ? {
          title: "Review Submitted",
          description: `You rated ${studentRecentActivity?.recentReview.tutorName} ${studentRecentActivity?.recentReview.rating} stars`,
          time: studentRecentActivity?.recentReview.timeAgo ?? "-",
        }
      : null,
    Object.keys(studentRecentActivity?.recentBooking || {}).length > 0
      ? {
          title: "Booking Confirmed",
          description: `${studentRecentActivity?.recentBooking.categoryName} on ${studentRecentActivity?.recentBooking.sessionDate}`,
          time: studentRecentActivity?.recentBooking.timeAgo ?? "-",
        }
      : null,
  ];

  // console.log(recentActivity);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card className="overflow-hidden border-border/70 bg-linear-to-r from-amber-50 via-white to-orange-50 dark:from-card dark:via-card dark:to-card">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="text-2xl">Student Dashboard</CardTitle>
              <CardDescription className="mt-2">
                Snapshot of your learning activity.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={"/find_tutors"}>
                <Button className="bg-[#ec5b13] text-white hover:bg-[#d44f10]">
                  Book New Session
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((item, idx) => (
          <Card
            key={item.title}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: `${idx * 90}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.title}
                </p>
                <item.icon className="size-4 text-[#ec5b13]" suppressHydrationWarning />
              </div>
              <p className="mt-2 text-2xl font-bold tracking-tight">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpenCheck className="size-4 text-[#ec5b13]" suppressHydrationWarning/>
              Recent Activity
            </CardTitle>
            <CardDescription>
              What happened in your learning timeline.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.every((value) => value === null) ? (
              <p className="text-sm text-muted-foreground">
                No recent activity to display.
              </p>
            ) : (
              recentActivity.map((activity) =>
                activity ? (
                  <div
                    key={`${activity.title}-${activity.time}`}
                    className="flex items-start justify-between gap-3 rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <Badge variant="outline">{activity.time}</Badge>
                  </div>
                ) : null,
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
