import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  BookOpenCheck,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Goal,
  ShieldCheck,
  Star,
} from "lucide-react";

const overviewStats = [
  {
    title: "Total Bookings",
    value: "26",
    note: "+4 this month",
    icon: CalendarCheck2,
  },
  {
    title: "Completed Sessions",
    value: "18",
    note: "69% completion rate",
    icon: CheckCircle2,
  },
  {
    title: "Average Tutor Rating",
    value: "4.8 / 5",
    note: "Based on 14 reviews",
    icon: Star,
  },
  {
    title: "Learning Spend",
    value: "৳ 15,450",
    note: "Across all bookings",
    icon: CircleDollarSign,
  },
];

const upcomingItems = [
  {
    tutor: "Arafat Hasan",
    category: "Spoken English",
    day: "Fri, Mar 13",
    time: "07:00 PM - 08:00 PM",
    status: "RUNNING",
  },
  {
    tutor: "Sharmin Akter",
    category: "Academic Writing",
    day: "Fri, Mar 13",
    time: "09:30 PM - 10:30 PM",
    status: "CONFIRMED",
  },
  {
    tutor: "Nafis Ahmed",
    category: "IELTS Prep",
    day: "Sun, Mar 15",
    time: "08:00 PM - 09:00 PM",
    status: "CONFIRMED",
  },
];

const recentActivity = [
  {
    title: "Session Completed",
    description: "Grammar Foundation with Moumita Sultana",
    time: "2 days ago",
  },
  {
    title: "Review Submitted",
    description: "You rated Nafis Ahmed 5 stars",
    time: "3 days ago",
  },
  {
    title: "Booking Confirmed",
    description: "Spoken English class on Mar 16",
    time: "4 days ago",
  },
  {
    title: "Learning Goal Updated",
    description: "IELTS writing goal moved to 45%",
    time: "5 days ago",
  },
];

const monthlyGoals = [
  {
    title: "Attend 8 sessions this month",
    progress: 75,
    note: "6/8 done",
  },
  {
    title: "Submit tutor feedback after every class",
    progress: 64,
    note: "9/14 submitted",
  },
  {
    title: "Complete IELTS writing checklist",
    progress: 45,
    note: "9/20 tasks done",
  },
];

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-blue-500 text-white hover:bg-blue-500",
  RUNNING: "bg-[#ec5b13] text-white hover:bg-[#ec5b13]",
  COMPLETED: "bg-emerald-600 text-white hover:bg-emerald-600",
  CANCELLED: "bg-red-500 text-white hover:bg-red-500",
};

export default function StudentDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card className="overflow-hidden border-border/70 bg-linear-to-r from-amber-50 via-white to-orange-50 dark:from-card dark:via-card dark:to-card">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="text-2xl">Student Dashboard</CardTitle>
              <CardDescription className="mt-2">
                Snapshot of your learning progress, sessions, and activity.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-[#ec5b13] text-white hover:bg-[#d44f10]">
                Book New Session
              </Button>
              <Button variant="outline">Explore Tutors</Button>
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
                <item.icon className="size-4 text-[#ec5b13]" />
              </div>
              <p className="mt-2 text-2xl font-bold tracking-tight">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock3 className="size-4 text-[#ec5b13]" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription>
                Next confirmed and running sessions from your bookings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingItems.map((item) => (
                <div
                  key={`${item.tutor}-${item.day}-${item.time}`}
                  className="rounded-lg border bg-muted/20 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{item.tutor}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <Badge className={statusStyles[item.status]}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>{item.day}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenCheck className="size-4 text-[#ec5b13]" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                What happened in your learning timeline.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity) => (
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
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Goal className="size-4 text-[#ec5b13]" />
                Monthly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlyGoals.map((goal) => (
                <div
                  key={goal.title}
                  className="space-y-2 rounded-lg border p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug">
                      {goal.title}
                    </p>
                    <Badge variant="secondary">{goal.progress}%</Badge>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[#ec5b13]"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{goal.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#ec5b13]" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                Open Session History
                <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Manage Learning Goals
                <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                View Tutor Reviews
                <ArrowUpRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
