import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const overviewStats = [
  {
    title: "Monthly Earnings",
    value: "৳ 42,500",
    note: "+12.4% from last month",
  },
  {
    title: "Completed Sessions",
    value: "86",
    note: "15 sessions this week",
  },
  {
    title: "Average Rating",
    value: "4.9 / 5",
    note: "Based on 124 reviews",
  },
  {
    title: "Active Students",
    value: "31",
    note: "8 new this month",
  },
];

const todaySessions = [
  {
    student: "Sadia Akter",
    subject: "Physics",
    time: "06:00 PM - 07:00 PM",
    status: "Confirmed",
  },
  {
    student: "Rakib Hasan",
    subject: "Higher Math",
    time: "08:00 PM - 09:00 PM",
    status: "Upcoming",
  },
  {
    student: "Faria Noor",
    subject: "Programming Fundamentals",
    time: "09:30 PM - 10:30 PM",
    status: "Pending",
  },
];

const topStudents = [
  { name: "Sadia Akter", progress: "92%", streak: "7 weeks" },
  { name: "Rakib Hasan", progress: "84%", streak: "5 weeks" },
  { name: "Faria Noor", progress: "78%", streak: "4 weeks" },
];

const weeklyEarnings = [
  { day: "Sun", amount: "৳ 4,000" },
  { day: "Mon", amount: "৳ 6,200" },
  { day: "Tue", amount: "৳ 5,000" },
  { day: "Wed", amount: "৳ 7,100" },
  { day: "Thu", amount: "৳ 6,800" },
  { day: "Fri", amount: "৳ 4,700" },
  { day: "Sat", amount: "৳ 8,700" },
];

export default function TutorDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl">Tutor Dashboard</CardTitle>
            <CardDescription>
              Track sessions, earnings, and student performance.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="bg-[#ec5b13] hover:bg-[#d44f10] text-white">
              Start Next Class
            </Button>
            <Button variant="outline">View Calendar</Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((item) => (
          <Card key={item.title}>
            <CardHeader className="pb-2">
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="text-2xl">{item.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Today&apos;s Sessions</CardTitle>
            <CardDescription>
              Overview of your class schedule for today.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySessions.map((session) => (
              <Card key={`${session.student}-${session.time}`} className="border">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{session.student}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.subject}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{session.status}</Badge>
                      <Badge>{session.time}</Badge>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" className="bg-[#ec5b13] hover:bg-[#d44f10] text-white">
                      Join
                    </Button>
                    <Button size="sm" variant="outline">
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      Materials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used shortcuts for your workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              Add Availability
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Update Profile
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Upload Materials
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Review Student Feedback
            </Button>
            <Separator className="my-3" />
            <Button className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white">
              Create Announcement
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Earnings</CardTitle>
            <CardDescription>Last 7 days earnings summary.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklyEarnings.map((item) => (
              <div key={item.day} className="flex items-center justify-between rounded-md border p-3">
                <p className="text-sm font-medium">{item.day}</p>
                <p className="text-sm font-semibold">{item.amount}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Students</CardTitle>
            <CardDescription>
              Students with strong progress and consistency.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topStudents.map((student) => (
              <Card key={student.name} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{student.name}</p>
                    <Badge variant="secondary">{student.progress}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Learning streak: {student.streak}
                  </p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
