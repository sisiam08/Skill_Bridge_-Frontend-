import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  BookOpen,
  CalendarCheck,
  CircleCheckBig,
  Clock3,
  GraduationCap,
  Sparkles,
  Star,
  Target,
} from "lucide-react";

const studentProfile = {
  name: "Nusrat Jahan",
  email: "nusrat.jahan@studentmail.com",
  phone: "+880 1722-334455",
  status: "UNBAN",
  role: "STUDENT",
  joinedOn: "Jan 08, 2026",
  preferredLearningTime: "Evening (6:00 PM - 9:00 PM)",
  preferredSessionDuration: "60 minutes",
  timezone: "Asia/Dhaka",
  activeCategories: ["Spoken English", "Academic Writing", "IELTS Prep"],
};

const profileStats = [
  {
    title: "Completed Sessions",
    value: "18",
    note: "Across 3 tutors",
    icon: CircleCheckBig,
  },
  {
    title: "Upcoming Sessions",
    value: "4",
    note: "Next one tomorrow",
    icon: CalendarCheck,
  },
  {
    title: "Learning Streak",
    value: "6 days",
    note: "Consistency this week",
    icon: Clock3,
  },
  {
    title: "Average Rating Given",
    value: "4.8 / 5",
    note: "Based on 14 reviews",
    icon: Star,
  },
];

const goals = [
  {
    title: "Improve speaking fluency",
    progress: 72,
    deadline: "Target: Apr 2026",
  },
  {
    title: "Complete IELTS writing module",
    progress: 45,
    deadline: "Target: May 2026",
  },
  {
    title: "Finish 30 guided sessions",
    progress: 60,
    deadline: "18 / 30 completed",
  },
];

const weeklyFocus = [
  "Revise tutor notes before each class",
  "Submit one writing sample every two days",
  "Attend all confirmed sessions on time",
  "Record vocabulary from every lesson",
];

export default function StudentProfilePage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card className="overflow-hidden border-border/60 bg-linear-to-r from-amber-50 via-white to-orange-50 dark:from-card dark:via-card dark:to-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="size-16 border-2 border-[#ec5b13]/25">
                <AvatarFallback className="bg-[#ec5b13]/10 text-lg font-semibold text-[#ec5b13]">
                  NJ
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">Student Profile</CardTitle>
                <CardDescription className="mt-1">
                  Keep your learning preferences and goals updated.
                </CardDescription>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge className="bg-[#ec5b13] text-white hover:bg-[#ec5b13]">
                    {studentProfile.role}
                  </Badge>
                  <Badge variant="secondary">{studentProfile.status}</Badge>
                  <Badge variant="outline">Joined {studentProfile.joinedOn}</Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-[#ec5b13] text-white hover:bg-[#d44f10]">
                Update Profile
              </Button>
              <Button variant="outline">Learning Preferences</Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {profileStats.map((item, idx) => (
          <Card
            key={item.title}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <CardContent className="p-5">
              <div className="mb-3 flex items-start justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.title}
                </p>
                <item.icon className="size-4 text-[#ec5b13]" />
              </div>
              <p className="text-2xl font-bold tracking-tight">{item.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-4 text-[#ec5b13]" />
              Account And Learning Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-muted/20 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Full Name
                </p>
                <p className="mt-1 text-sm font-medium">{studentProfile.name}</p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Email
                </p>
                <p className="mt-1 text-sm font-medium">{studentProfile.email}</p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Phone
                </p>
                <p className="mt-1 text-sm font-medium">{studentProfile.phone}</p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Timezone
                </p>
                <p className="mt-1 text-sm font-medium">{studentProfile.timezone}</p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Preferred Learning Window
                </p>
                <p className="mt-1 text-sm font-medium">
                  {studentProfile.preferredLearningTime}
                </p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Preferred Session Duration
                </p>
                <p className="mt-1 text-sm font-medium">
                  {studentProfile.preferredSessionDuration}
                </p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="mb-3 text-sm font-medium">Active Learning Categories</p>
              <div className="flex flex-wrap gap-2">
                {studentProfile.activeCategories.map((category) => (
                  <Badge key={category} variant="outline" className="bg-background">
                    <GraduationCap className="mr-1 size-3.5 text-[#ec5b13]" />
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="size-4 text-[#ec5b13]" />
              Learning Goals
            </CardTitle>
            <CardDescription>Track weekly and monthly progress.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.title} className="space-y-2 rounded-lg border p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium leading-snug">{goal.title}</p>
                  <Badge variant="secondary">{goal.progress}%</Badge>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[#ec5b13]"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{goal.deadline}</p>
              </div>
            ))}

            <div className="rounded-lg border border-dashed bg-muted/20 p-3">
              <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Sparkles className="size-4 text-[#ec5b13]" />
                Weekly Focus
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {weeklyFocus.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-[#ec5b13]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
