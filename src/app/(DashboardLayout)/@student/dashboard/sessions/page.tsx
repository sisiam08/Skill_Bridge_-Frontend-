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
  AlarmClockCheck,
  CalendarClock,
  Clock3,
  ExternalLink,
  MessageSquare,
  NotebookTabs,
  Star,
  Video,
} from "lucide-react";

type SessionStatus = "CONFIRMED" | "RUNNING" | "COMPLETED" | "CANCELLED";

type StudentSession = {
  id: string;
  tutorName: string;
  category: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
  classLink?: string;
  price: number;
};

const todaySessions: StudentSession[] = [
  {
    id: "BK-7801",
    tutorName: "Arafat Hasan",
    category: "Spoken English",
    sessionDate: "13 Mar 2026",
    startTime: "07:00 PM",
    endTime: "08:00 PM",
    status: "RUNNING",
    classLink: "https://meet.google.com/gvw-rjfr-byt",
    price: 650,
  },
  {
    id: "BK-7802",
    tutorName: "Sharmin Akter",
    category: "Academic Writing",
    sessionDate: "13 Mar 2026",
    startTime: "09:30 PM",
    endTime: "10:30 PM",
    status: "CONFIRMED",
    price: 700,
  },
];

const upcomingSessions: StudentSession[] = [
  {
    id: "BK-7808",
    tutorName: "Nafis Ahmed",
    category: "IELTS Prep",
    sessionDate: "15 Mar 2026",
    startTime: "08:00 PM",
    endTime: "09:00 PM",
    status: "CONFIRMED",
    price: 800,
  },
  {
    id: "BK-7810",
    tutorName: "Arafat Hasan",
    category: "Spoken English",
    sessionDate: "16 Mar 2026",
    startTime: "07:30 PM",
    endTime: "08:30 PM",
    status: "CONFIRMED",
    price: 650,
  },
];

const previousSessions: StudentSession[] = [
  {
    id: "BK-7772",
    tutorName: "Moumita Sultana",
    category: "Grammar Foundation",
    sessionDate: "11 Mar 2026",
    startTime: "08:00 PM",
    endTime: "09:00 PM",
    status: "COMPLETED",
    price: 600,
  },
  {
    id: "BK-7764",
    tutorName: "Nafis Ahmed",
    category: "IELTS Prep",
    sessionDate: "09 Mar 2026",
    startTime: "06:30 PM",
    endTime: "07:30 PM",
    status: "CANCELLED",
    price: 800,
  },
];

const statusStyles: Record<SessionStatus, string> = {
  CONFIRMED: "bg-blue-500 text-white hover:bg-blue-500",
  RUNNING: "bg-[#ec5b13] text-white hover:bg-[#ec5b13]",
  COMPLETED: "bg-emerald-600 text-white hover:bg-emerald-600",
  CANCELLED: "bg-red-500 text-white hover:bg-red-500",
};

function SessionCard({
  session,
  showActions,
}: {
  session: StudentSession;
  showActions?: boolean;
}) {
  return (
    <Card className="border-border/80">
      <CardContent className="space-y-4 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold">{session.tutorName}</p>
            <p className="text-sm text-muted-foreground">{session.category}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusStyles[session.status]}>
              {session.status}
            </Badge>
            <Badge variant="outline">{session.id}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-md border bg-muted/20 px-3 py-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Session Date
            </p>
            <p className="mt-1 font-medium">{session.sessionDate}</p>
          </div>
          <div className="rounded-md border bg-muted/20 px-3 py-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Session Time
            </p>
            <p className="mt-1 font-medium">
              {session.startTime} - {session.endTime}
            </p>
          </div>
          <div className="rounded-md border bg-muted/20 px-3 py-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Fee
            </p>
            <p className="mt-1 font-medium">৳ {session.price}</p>
          </div>
        </div>

        {showActions ? (
          <div className="flex flex-wrap gap-2">
            {session.classLink ? (
              <Button className="bg-[#ec5b13] text-white hover:bg-[#d44f10]">
                <Video className="mr-2 size-4" />
                Join Live Class
                <ExternalLink className="ml-2 size-4" />
              </Button>
            ) : (
              <Button variant="outline">
                <AlarmClockCheck className="mr-2 size-4" />
                Wait For Class Link
              </Button>
            )}
            <Button variant="outline">
              <MessageSquare className="mr-2 size-4" />
              Message Tutor
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function StudentSessionsPage() {
  const completedCount = previousSessions.filter(
    (item) => item.status === "COMPLETED",
  ).length;
  const totalSpent = [
    ...todaySessions,
    ...upcomingSessions,
    ...previousSessions,
  ]
    .filter((item) => item.status !== "CANCELLED")
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card className="overflow-hidden border-border/60 bg-linear-to-r from-orange-50 via-white to-amber-50 dark:from-card dark:via-card dark:to-card">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="text-2xl">Student Sessions</CardTitle>
              <CardDescription className="mt-2">
                Review ongoing, upcoming, and previous booking sessions.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#ec5b13] text-white hover:bg-[#ec5b13]">
                {todaySessions.length} Today
              </Badge>
              <Badge variant="secondary">
                {upcomingSessions.length} Upcoming
              </Badge>
              <Badge variant="outline">{completedCount} Completed</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Active Session
            </p>
            <p className="mt-2 text-2xl font-bold">
              {todaySessions.some((item) => item.status === "RUNNING")
                ? "Running"
                : "None"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              This Week Booked
            </p>
            <p className="mt-2 text-2xl font-bold">6 Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Learning Hours
            </p>
            <p className="mt-2 text-2xl font-bold">22.5 Hrs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Total Spend
            </p>
            <p className="mt-2 text-2xl font-bold">৳ {totalSpent}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock3 className="size-4 text-[#ec5b13]" />
                Today&apos;s Sessions
              </CardTitle>
              <CardDescription>
                Keep track of active and scheduled sessions today.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySessions.map((session) => (
                <SessionCard key={session.id} session={session} showActions />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="size-4 text-[#ec5b13]" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription>
                Future confirmed classes from your booking list.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <NotebookTabs className="size-4 text-[#ec5b13]" />
                Session History
              </CardTitle>
              <CardDescription>
                Recent completed or cancelled sessions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {previousSessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-lg border bg-muted/20 p-3 text-sm"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-medium">{session.tutorName}</p>
                    <Badge className={statusStyles[session.status]}>
                      {session.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{session.category}</p>
                  <p className="mt-1 text-muted-foreground">
                    {session.sessionDate} • {session.startTime}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="size-4 text-[#ec5b13]" />
                Feedback Reminder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have 2 completed sessions without tutor feedback. Share a
                quick review to improve recommendations.
              </p>
              <Button className="mt-4 w-full bg-[#ec5b13] text-white hover:bg-[#d44f10]">
                Add Reviews
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
