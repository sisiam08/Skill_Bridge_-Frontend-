"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type SessionLifecycle = "idle" | "running" | "completed";

type SessionItem = {
  id: string;
  student: string;
  subject: string;
  dateIso: string;
  dateLabel: string;
  time: string;
  status: "Scheduled" | "Confirmed";
};

const sessionsData: SessionItem[] = [
  {
    id: "S-1021",
    student: "Ahsan Rahman",
    subject: "Higher Math",
    dateIso: "2026-03-03",
    dateLabel: "Mar 03, 2026",
    time: "7:00 PM - 8:00 PM",
    status: "Confirmed",
  },
  {
    id: "S-1022",
    student: "Nusrat Jahan",
    subject: "Physics",
    dateIso: "2026-03-04",
    dateLabel: "Mar 04, 2026",
    time: "9:00 PM - 10:00 PM",
    status: "Confirmed",
  },
  {
    id: "S-1023",
    student: "Samiul Islam",
    subject: "Programming Fundamentals",
    dateIso: "2026-03-05",
    dateLabel: "Mar 05, 2026",
    time: "8:30 PM - 9:30 PM",
    status: "Confirmed",
  },
];

const getTodayIso = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(
    new Date(),
  );

const convertTo24Hour = (time12: string) => {
  const [time, modifier] = time12.split(" ");
  const [rawHours, rawMinutes] = time.split(":").map(Number);

  let hours = rawHours;
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${String(rawMinutes).padStart(2, "0")}`;
};

const getSessionEndTime = (dateIso: string, timeRange: string) => {
  const [, endTime] = timeRange.split("-").map((value) => value.trim());
  return new Date(`${dateIso}T${convertTo24Hour(endTime)}:00`);
};

export default function TutorSessionPage() {
  const [defaultClassLink, setDefaultClassLink] = useState(
    "https://meet.google.com/default-link",
  );
  const [defaultClassLinkInput, setDefaultClassLinkInput] = useState(
    "https://meet.google.com/default-link",
  );
  const [isClassLinkSheetOpen, setIsClassLinkSheetOpen] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [linkOption, setLinkOption] = useState<"default" | "new">("default");
  const [newClassLink, setNewClassLink] = useState("");
  const [sessionLifecycle, setSessionLifecycle] = useState<
    Record<string, SessionLifecycle>
  >({});

  const todayIso = useMemo(() => getTodayIso(), []);

  const todaySessions = useMemo(
    () => sessionsData.filter((session) => session.dateIso === todayIso),
    [todayIso],
  );

  const upcomingSessions = useMemo(
    () => sessionsData.filter((session) => session.dateIso > todayIso),
    [todayIso],
  );

  const activeSession = useMemo(
    () => sessionsData.find((session) => session.id === activeSessionId),
    [activeSessionId],
  );

  const sessionEndTimeById = useMemo(
    () =>
      Object.fromEntries(
        sessionsData.map((session) => [
          session.id,
          getSessionEndTime(session.dateIso, session.time),
        ]),
      ) as Record<string, Date>,
    [],
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSessionLifecycle((previous) => {
        let hasChange = false;
        const now = new Date();
        const next = { ...previous };

        Object.entries(previous).forEach(([sessionId, lifecycle]) => {
          if (lifecycle !== "running") return;
          if (now >= sessionEndTimeById[sessionId]) {
            next[sessionId] = "completed";
            hasChange = true;
          }
        });

        return hasChange ? next : previous;
      });
    }, 30000);

    return () => window.clearInterval(intervalId);
  }, [sessionEndTimeById]);

  const handleStartClass = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setLinkOption("default");
    setNewClassLink("");
    setIsClassLinkSheetOpen(true);
  };

  const handleSaveDefaultLink = () => {
    const normalizedLink = defaultClassLinkInput.trim();
    if (!normalizedLink) return;
    setDefaultClassLink(normalizedLink);
  };

  const handleSendClassLink = () => {
    if (!activeSessionId) return;

    const linkToSend =
      linkOption === "default" ? defaultClassLink : newClassLink.trim();

    if (!linkToSend) return;

    setSessionLifecycle((previous) => ({
      ...previous,
      [activeSessionId]: "running",
    }));

    setIsClassLinkSheetOpen(false);
    setActiveSessionId(null);
    setLinkOption("default");
    setNewClassLink("");
  };

  const renderSessionCard = (session: SessionItem) => {
    const currentLifecycle = sessionLifecycle[session.id] ?? "idle";
    const sessionStatus =
      currentLifecycle === "running"
        ? "Running"
        : currentLifecycle === "completed"
          ? "Completed"
          : session.status;

    return (
      <Card key={session.id} className="border border-border">
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-semibold">{session.student}</p>
              <p className="text-sm text-muted-foreground">{session.subject}</p>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-3">
              <p>{session.dateLabel}</p>
              <p>{session.time}</p>
            </div>
            <Badge
              variant={sessionStatus === "Confirmed" ? "default" : "secondary"}
              className={
                sessionStatus === "Running"
                  ? "bg-emerald-600 text-white hover:bg-emerald-600"
                  : ""
              }
            >
              {sessionStatus}
            </Badge>
          </div>

          {currentLifecycle === "completed" ? null : (
            <div>
              {currentLifecycle === "running" ? (
                <Button
                  className="bg-emerald-600 text-white hover:bg-emerald-600"
                  disabled
                >
                  Running
                </Button>
              ) : (
                <Button
                  className="bg-[#ec5b13] text-white hover:bg-[#d44f10]"
                  onClick={() => handleStartClass(session.id)}
                >
                  Start Class
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const hasAnySession = todaySessions.length > 0 || upcomingSessions.length > 0;

  return (
    <>
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">Tutor Sessions</CardTitle>
              <CardDescription>
                Today&apos;s sessions first, then upcoming sessions.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                {todaySessions.length} Today
              </Badge>
              <Badge variant="secondary">{upcomingSessions.length} Upcoming</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Sessions</CardTitle>
                <CardDescription>
                  Sessions scheduled for today ({todayIso}).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaySessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No session scheduled for today.
                  </p>
                ) : (
                  todaySessions.map(renderSessionCard)
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Future scheduled sessions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No upcoming sessions available.
                  </p>
                ) : (
                  upcomingSessions.map(renderSessionCard)
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Link</CardTitle>
                <CardDescription>
                  Add or update default live class link for sessions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Meeting Link</Label>
                  <Input
                    placeholder="https://meet.google.com/..."
                    value={defaultClassLinkInput}
                    onChange={(event) => setDefaultClassLinkInput(event.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-[#ec5b13] text-white hover:bg-[#d44f10]"
                  onClick={handleSaveDefaultLink}
                >
                  Save Class Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Sheet open={isClassLinkSheetOpen} onOpenChange={setIsClassLinkSheetOpen}>
        <SheetContent
          side="bottom"
          className="inset-auto left-1/2 top-1/2 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl border"
        >
          <SheetHeader>
            <SheetTitle>Send Class Link</SheetTitle>
            <SheetDescription>
              {activeSession
                ? `Session ${activeSession.id} - ${activeSession.student}`
                : "Select link option and send class link."}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 px-4 pb-6">
            <RadioGroup
              value={linkOption}
              onValueChange={(value) =>
                setLinkOption(value === "new" ? "new" : "default")
              }
              className="gap-3"
            >
              <div className="flex items-center gap-3 rounded-md border p-3">
                <RadioGroupItem id="default-link" value="default" />
                <Label htmlFor="default-link" className="cursor-pointer">
                  Send default saved link
                </Label>
              </div>
              <div className="flex items-center gap-3 rounded-md border p-3">
                <RadioGroupItem id="new-link" value="new" />
                <Label htmlFor="new-link" className="cursor-pointer">
                  Send new link
                </Label>
              </div>
            </RadioGroup>

            {linkOption === "default" ? (
              <div className="rounded-md border bg-muted/30 p-3 text-sm">
                {defaultClassLink}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="new-class-link">New Class Link</Label>
                <Input
                  id="new-class-link"
                  placeholder="https://meet.google.com/..."
                  value={newClassLink}
                  onChange={(event) => setNewClassLink(event.target.value)}
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsClassLinkSheetOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#ec5b13] text-white hover:bg-[#d44f10]"
                disabled={
                  linkOption === "new" ? !newClassLink.trim() : !defaultClassLink
                }
                onClick={handleSendClassLink}
              >
                Send Class Link
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
