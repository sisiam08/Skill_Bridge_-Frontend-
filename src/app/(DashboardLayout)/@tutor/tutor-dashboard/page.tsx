"use client";

import { getTutorStats, getWeeklyEarnings } from "@/actions/tutor.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TutorStats } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Banknote,
  CalendarClock,
  Star,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";

export default function TutorDashboardPage() {
  const [stats, setStats] = useState<TutorStats | null>(null);
  const [weeklyEarnings, setWeeklyEarnings] = useState<
    { weekDay: string; earnings: number }[]
  >([]);

  const maxWeekly = Math.max(...weeklyEarnings.map((d) => d.earnings));

  useEffect(() => {
    (async () => {
      const response = await getTutorStats();

      if (response.error || !response.data) {
        return;
      }

      setStats(response.data.data as TutorStats);

      const earningsResponse = await getWeeklyEarnings();

      if (earningsResponse.error || !earningsResponse.data) {
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
      icon: Banknote,
    },
    {
      title: "Monthly Earnings",
      value: `৳ ${stats?.earnings.earningsThisMonth ?? 0}`,
      note: `${format(new Date(), "MMMM, yyyy")} earnings`,
      icon: TrendingUp,
    },
    {
      title: "Today's Earnings",
      value: `৳ ${stats?.earnings.earningsToday ?? 0}`,
      note: `${stats?.sessions.completedToday ?? 0} sessions today`,
      icon: CalendarClock,
    },
    {
      title: "Hourly Rate",
      value: `৳ ${stats?.earnings.hourlyRate ?? 0}`,
      note: "Per session hour",
      icon: Banknote,
    },
  ];

  const profileStats = [
    {
      title: "Total Unique Students",
      value: `${stats?.profile.uniqueStudents ?? 0}`,
      note: "Students taught all time",
      icon: UserRoundCheck,
    },
    {
      title: "Experience",
      value: `${stats?.profile.experienceYears ?? 0} yrs`,
      note: "Years of teaching",
      icon: TrendingUp,
    },
    {
      title: "Active Availability",
      value: `${stats?.profile.activeDays ?? 0} days`,
      note: "Days open per week",
      icon: CalendarClock,
    },
    {
      title: "Average Rating",
      value: `${stats?.profile.averageRating ?? 0} / 5`,
      note: `Based on ${stats?.profile.reviewCount ?? 0} reviews`,
      icon: Star,
    },
  ];

  const sessionStats = [
    {
      title: "Completed Sessions",
      value: `${stats?.sessions.completed ?? 0}`,
      note: `${stats?.sessions.completedThisWeek ?? 0} this week`,
      icon: UserRoundCheck,
    },
    {
      title: "Cancelled Sessions",
      value: `${stats?.sessions.cancelled ?? 0}`,
      note: `${stats?.sessions.cancelledThisMonth ?? 0} this month`,
      icon: CalendarClock,
    },
    {
      title: "Upcoming Sessions",
      value: `${stats?.sessions.upcoming ?? 0}`,
      note: "Confirmed sessions in today and future",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card className="overflow-hidden border-border/70 bg-linear-to-r from-orange-50 via-white to-amber-50 dark:from-card dark:via-card dark:to-card">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">Tutor Dashboard</CardTitle>
            <CardDescription>
              Track your sessions, earnings, and student engagement.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#ec5b13] text-white hover:bg-[#ec5b13]">
              {stats?.sessions.upcoming ?? 0} Upcoming
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {earningsStats.map((item, idx) => (
          <Card
            key={item.title}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-hidden"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{item.value}</p>
                </div>
                <item.icon className="size-4 text-[#ec5b13]" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {profileStats.map((item, idx) => (
          <Card
            key={item.title}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-hidden"
            style={{ animationDelay: `${idx * 90}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{item.value}</p>
                </div>
                <item.icon className="size-4 text-[#ec5b13]" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{item.note}</p>
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
          {sessionStats.map((item, idx) => (
            <Card
              key={item.title}
              className="animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-hidden"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {item.title}
                    </p>
                    <p className="mt-2 text-2xl font-bold">{item.value}</p>
                  </div>
                  <item.icon className="size-4 text-[#ec5b13]" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.note}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
