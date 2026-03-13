"use client";

import { getTutorStats, getWeeklyEarnings } from "@/actions/tutor.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TutorStats } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function TutorDashboardPage() {
  const [stats, setStats] = useState<TutorStats | null>(null);
  const [weeklyEarnings, setWeeklyEarnings] = useState<
    { weekDay: string; earnings: number }[]
  >([]);

  const maxWeekly = Math.max(...weeklyEarnings.map((d) => d.earnings));

  useEffect(() => {
    (async () => {
      const response = await getTutorStats();

      if (!response.data?.success) {
        return;
      }

      setStats(response.data.data as TutorStats);

      const earningsResponse = await getWeeklyEarnings();

      if (!earningsResponse.data?.success) {
        return;
      }

      setWeeklyEarnings(earningsResponse.data.data);
    })();
  }, []);

  const earningsStats = [
    {
      title: "Total Earnings",
      value: `৳ ${stats?.earnings.totalEarnings ?? 0}`,
      note: "All time earnings",
    },
    {
      title: "Monthly Earnings",
      value: `৳ ${stats?.earnings.earningsThisMonth ?? 0}`,
      note: `${format(new Date(), "MMMM, yyyy")} earnings`,
    },
    {
      title: "Today's Earnings",
      value: `৳ ${stats?.earnings.earningsToday ?? 0}`,
      note: `${stats?.sessions.completedToday ?? 0} sessions today`,
    },
    {
      title: "Hourly Rate",
      value: `৳ ${stats?.earnings.hourlyRate ?? 0}`,
      note: "Per session hour",
    },
  ];

  const profileStats = [
    {
      title: "Total Unique Students",
      value: `${stats?.profile.uniqueStudents ?? 0}`,
      note: "Students taught all time",
    },
    {
      title: "Experience",
      value: `${stats?.profile.experienceYears ?? 0} yrs`,
      note: "Years of teaching",
    },
    {
      title: "Active Availability",
      value: `${stats?.profile.activeDays ?? 0} days`,
      note: "Days open per week",
    },
    {
      title: "Average Rating",
      value: `${stats?.profile.averageRating ?? 0} / 5`,
      note: `Based on ${stats?.profile.reviewCount ?? 0} reviews`,
    },
  ];

  const sessionStats = [
    {
      title: "Completed Sessions",
      value: `${stats?.sessions.completed ?? 0}`,
      note: `${stats?.sessions.completedThisWeek ?? 0} this week`,
    },
    {
      title: "Cancelled Sessions",
      value: `${stats?.sessions.cancelled ?? 0}`,
      note: `${stats?.sessions.cancelledThisMonth ?? 0} this month`,
    },
    {
      title: "Upcoming Sessions",
      value: `${stats?.sessions.upcoming ?? 0}`,
      note: "Confirmed sessions in today and future",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Tutor Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Track your sessions, earnings, and students.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {earningsStats.map((item) => (
          <Card key={item.title} className="overflow-hidden">
            <CardContent className="p-0">
              <div
                className={`flex items-center justify-between px-5 pt-5 pb-3`}
              >
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className={`mt-1 text-2xl font-bold`}>{item.value}</p>
                </div>
              </div>
              <div className="px-5 py-3">
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {profileStats.map((item) => (
          <Card key={item.title} className="overflow-hidden">
            <CardContent className="p-0">
              <div
                className={`flex items-center justify-between px-5 pt-5 pb-3`}
              >
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className={`mt-1 text-2xl font-bold`}>{item.value}</p>
                </div>
              </div>
              <div className="px-5 py-3">
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Weekly Earnings</CardTitle>
            <CardDescription>This week earnings summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {weeklyEarnings.map((day) => {
              const percentageofEarnings = Math.round(
                (day.earnings / maxWeekly) * 100,
              );
              return (
                <div key={day.weekDay} className="flex items-center gap-3">
                  <span className="w-8 shrink-0 text-right text-xs font-medium text-muted-foreground">
                    {day.weekDay}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[#ec5b13] transition-all"
                      style={{ width: `${percentageofEarnings}%` }}
                    />
                  </div>
                  <span className="w-24 shrink-0 text-right text-xs font-semibold">
                    {day.earnings}৳
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 xl:col-span-2">
          {sessionStats.map((item) => (
            <Card key={item.title} className="overflow-hidden">
              <CardContent className="p-0">
                <div
                  className={`flex items-center justify-between px-5 pt-4 pb-2`}
                >
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {item.title}
                    </p>
                    <p className={`mt-1 text-2xl font-bold`}>{item.value}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-2">
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
