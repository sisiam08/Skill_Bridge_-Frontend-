"use client";

import { useEffect, useRef, useState } from "react";
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
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  getBookingSessions,
  sendClassLink,
  updateBookingStatus,
} from "@/actions/booking.action";
import { BookingStatus } from "@/constants/bookingStatus";
import { BookingSession } from "@/types";
import { convertInto12h } from "@/helpers/convertInto12h";
import { toast } from "sonner";
import {
  getDefaultClassLink,
  setDefaultClassLink,
} from "@/actions/tutor.action";

export default function TutorSessionPage() {
  const [todaySessions, setTodaySessions] = useState<BookingSession[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<BookingSession[]>(
    [],
  );
  const [activeSession, setActiveSession] = useState<BookingSession | null>(
    null,
  );

  const [defaultClassLink, set_DefaultClassLink] = useState("");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetSession, setSheetSession] = useState<BookingSession | null>(null);
  const [linkOption, setLinkOption] = useState<"default" | "new">("default");
  const [newClassLink, setNewClassLink] = useState("");

  const [completeSessionSheetOpen, setCompleteSessionSheetOpen] =
    useState(false);
  const [completedSession, setCompletedSession] =
    useState<BookingSession | null>(null);

  const hasSessionEnded = (session: BookingSession): boolean => {
    const now = new Date();
    const sessionDay = new Date(session.sessionDate).toDateString();
    if (sessionDay < now.toDateString()) return true;
    if (sessionDay > now.toDateString()) return false;
    // const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const currentTime = new Date().toTimeString().slice(0, 5);
    return session.endTime <= currentTime;
  };

  const loadSessions = async () => {
    const response = await getBookingSessions();

    if (!response?.data.success) return;

    const allSessions: BookingSession[] = response.data.data;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log("Today's date:", today);

    const sessionDate = new Date(allSessions[0].sessionDate);
    sessionDate.setHours(0, 0, 0, 0);
    console.log("Session date:", sessionDate);

    const todayList = allSessions.filter((s) => {
      const sessionDate = new Date(s.sessionDate);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === today.getTime();
    });

    const upcomingList = allSessions.filter((s) => {
      const sessionDate = new Date(s.sessionDate);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() > today.getTime();
    });

    setTodaySessions(todayList);
    setUpcomingSessions(upcomingList);

    const runningSession = todayList.find(
      (s) => s.status === BookingStatus.RUNNING,
    );
    if (runningSession) {
      setActiveSession(runningSession);
      if (hasSessionEnded(runningSession)) {
        openCompleteSessionSheet(runningSession);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await loadSessions();

      const classLinkResponse = await getDefaultClassLink();

      if (!classLinkResponse?.data.success) return;

      set_DefaultClassLink(classLinkResponse.data.data.defaultClassLink || "");
    })();
  }, []);

  const confirmCompletedSession = async () => {
    if (!completedSession) return;

    const toastId = toast.loading("Marking session as completed...");
    try {
      const response = await updateBookingStatus(
        completedSession.id,
        BookingStatus.COMPLETED,
      );
      if (!response.data.success) {
        toast.error("Failed to mark session as completed", { id: toastId });
        return;
      }
      toast.success("Session marked as completed!", { id: toastId });

      await loadSessions();

      setActiveSession(null);
    } catch {
      toast.error("Failed to mark session as completed", { id: toastId });
    }

    setCompleteSessionSheetOpen(false);
    setCompletedSession(null);
  };

  const openCompleteSessionSheet = (session: BookingSession) => {
    setCompletedSession(session);
    setCompleteSessionSheetOpen(true);
  };

  const dismissCompleteSessionSheet = () => {
    setCompleteSessionSheetOpen(false);
    setCompletedSession(null);
  };

  const startClass = (session: BookingSession) => {
    if (activeSession) {
      if (hasSessionEnded(activeSession)) {
        openCompleteSessionSheet(activeSession);
        return;
      }
      if (activeSession.id === session.id) {
        setLinkOption("default");
        setNewClassLink("");
        setSheetOpen(true);
        setSheetSession(session);
        return;
      }
      toast.error(
        "You have an active session. Please complete it before starting another.",
      );
      return;
    }

    setLinkOption("default");
    setNewClassLink("");
    setSheetOpen(true);
    setSheetSession(session);
  };

  const saveDefaultClassLink = async (link: string) => {
    const toastId = toast.loading("Saving...");

    try {
      const response = await setDefaultClassLink(link.trim());

      if (!response.data.success) {
        toast.error("Failed to save default class link", { id: toastId });
        return;
      }
      toast.success("Default class link saved successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to save default class link", { id: toastId });
    }
  };

  const sendLink = async (classLink: string) => {
    if (!sheetSession) return;

    const toastId = toast.loading("Sending class link...");
    try {
      const response = await sendClassLink(sheetSession.id, classLink.trim());
      if (!response.data.success) {
        toast.error(response.data.message || "Failed to send class link", {
          id: toastId,
        });
        return;
      }
      toast.success("Class link sent successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to send class link", { id: toastId });
    }

    await loadSessions();

    setActiveSession(sheetSession);
    setSheetSession(null);
    setSheetOpen(false);
  };

  const renderSessions = (session: BookingSession) => (
    <Card key={session.id} className="border border-border">
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">{session.student.name}</p>
            <p className="text-sm text-muted-foreground">
              {convertInto12h(session.startTime)} -{" "}
              {convertInto12h(session.endTime)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(session.sessionDate).toLocaleDateString(undefined, {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
          <Badge
            className={
              session.status === BookingStatus.CONFIRMED
                ? "bg-blue-500 text-white hover:bg-blue-500"
                : session.status === BookingStatus.RUNNING
                  ? "bg-[#ec5b13] text-white hover:bg-[#ec5b13]"
                  : session.status === BookingStatus.COMPLETED
                    ? "bg-emerald-600 text-white hover:bg-emerald-600"
                    : "bg-red-500 text-white hover:bg-red-500"
            }
          >
            {session.status}
          </Badge>
        </div>

        {session.status === BookingStatus.RUNNING ? (
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => startClass(session)}
            >
              Send Link Again
            </Button>
            <Button
              className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => openCompleteSessionSheet(session)}
            >
              Mark as Completed
            </Button>
          </div>
        ) : (
          <Button
            className={
              session.status === BookingStatus.COMPLETED ||
              session.status === BookingStatus.CANCELLED
                ? "cursor-not-allowed opacity-60"
                : "bg-[#ec5b13] text-white hover:bg-[#d44f10]"
            }
            disabled={
              session.status === BookingStatus.COMPLETED ||
              session.status === BookingStatus.CANCELLED
            }
            onClick={() => startClass(session)}
          >
            {session.status === BookingStatus.COMPLETED
              ? "Class Completed"
              : session.status === BookingStatus.CANCELLED
                ? "Class Cancelled"
                : "Start Class"}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">Tutor Sessions</CardTitle>
              <CardDescription>Enjoy your sessions.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                {todaySessions.length} Today
              </Badge>
              <Badge variant="secondary">
                {upcomingSessions.length} Upcoming
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Sessions</CardTitle>
                <CardDescription>Sessions scheduled for today.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaySessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No session scheduled for today.
                  </p>
                ) : (
                  todaySessions.map(renderSessions)
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Future confirmed sessions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No upcoming sessions available.
                  </p>
                ) : (
                  upcomingSessions.map(renderSessions)
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Link</CardTitle>
                <CardDescription>
                  Add or update your default live class link.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="https://meet.google.com/..."
                    value={defaultClassLink}
                    onChange={(e) => set_DefaultClassLink(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-[#ec5b13] text-white hover:bg-[#d44f10]"
                  onClick={() => saveDefaultClassLink(defaultClassLink)}
                >
                  Save Class Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Class start sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="inset-auto left-1/2 top-1/2 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl border"
        >
          <SheetHeader>
            <SheetTitle>Send Class Link</SheetTitle>
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
                  Send a new link
                </Label>
              </div>
            </RadioGroup>

            {linkOption === "default" ? (
              <div className="rounded-md border bg-muted/30 p-3 text-sm">
                {defaultClassLink
                  ? defaultClassLink
                  : "No default class link saved. Please save first or enter a new link."}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="new-class-link">New Class Link</Label>
                <Input
                  id="new-class-link"
                  placeholder="https://meet.google.com/..."
                  value={newClassLink}
                  onChange={(e) => setNewClassLink(e.target.value)}
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSheetOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-[#ec5b13] text-white hover:bg-[#d44f10]"
                disabled={
                  linkOption === "new" ? !newClassLink : !defaultClassLink
                }
                onClick={() =>
                  sendLink(
                    linkOption === "new" ? newClassLink : defaultClassLink,
                  )
                }
              >
                Send Link
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Class complete sheet */}
      <Sheet
        open={completeSessionSheetOpen}
        onOpenChange={setCompleteSessionSheetOpen}
      >
        <SheetContent
          side="bottom"
          className="inset-auto left-1/2 top-1/2 w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border"
        >
          <SheetHeader>
            <SheetTitle>Session Ended — Mark as Completed</SheetTitle>
          </SheetHeader>

          {completedSession && (
            <div className="space-y-4 px-4 pb-6">
              <p className="text-sm text-muted-foreground">
                The following session has ended. Please mark it as completed.
              </p>

              <div className="rounded-md border bg-muted/30 p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold">
                      {completedSession.student.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {completedSession.student.email}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground space-y-1 pt-1">
                  <p>
                    <span className="font-medium text-foreground">Time: </span>
                    {convertInto12h(completedSession.startTime)} —{" "}
                    {convertInto12h(completedSession.endTime)}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Date: </span>
                    {new Date(completedSession.sessionDate).toLocaleDateString(
                      undefined,
                      { month: "short", day: "2-digit", year: "numeric" },
                    )}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={dismissCompleteSessionSheet}>
                  Dismiss
                </Button>
                <Button
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  onClick={confirmCompletedSession}
                >
                  Mark as Completed
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
