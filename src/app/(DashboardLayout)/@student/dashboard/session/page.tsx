"use client";

import { getMyBookings } from "@/actions/booking.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HistorySessionItem from "@/components/modules/Student/HistorySessionItem";
import ReviewSessionSheet from "@/components/modules/Student/ReviewSessionSheet";
import SessionCard from "@/components/layout/SessionCard";
import { BookingStatus } from "@/constants/status";
import { StudentBookings } from "@/types";
import { isAfter, isToday, startOfDay, startOfToday } from "date-fns";
import {
  ArrowRight,
  CalendarClock,
  Clock3,
  MessageSquare,
  NotebookTabs,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createReview } from "@/actions/review.action";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

export default function StudentSessionPage() {
  const [todaySessions, setTodaySessions] = useState<StudentBookings[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<StudentBookings[]>(
    [],
  );
  const [completedCount, setCompletedCount] = useState(0);

  const [reviewSheetOpen, setReviewSheetOpen] = useState(false);
  const [reviewSession, setReviewSession] = useState<StudentBookings | null>(
    null,
  );
  const [reviewText, setReviewText] = useState("");

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [historySessions, setHistorySessions] = useState<StudentBookings[]>([]);
  const [withoutReviewSessions, setWithoutReviewSessions] = useState<
    StudentBookings[]
  >([]);

  const [feedBackSheetOpen, setFeedbackSheetOpen] = useState(false);

  const loadSessions = async () => {
    const response = await getMyBookings();

    if (!response?.data.success) return;

    const allSessions: StudentBookings[] = response.data.data;

    const today = startOfToday();

    const todayList = allSessions.filter((s) =>
      isToday(new Date(s.sessionDate)),
    );

    const upcomingList = allSessions.filter((s) =>
      isAfter(startOfDay(new Date(s.sessionDate)), today),
    );

    const completedSessions = allSessions.filter(
      (s) => s.status === BookingStatus.COMPLETED,
    );

    const withoutReview = completedSessions.filter((s) => !s.reviews);

    setTodaySessions(todayList);
    setUpcomingSessions(upcomingList);
    setCompletedCount(completedSessions.length);

    setHistorySessions(completedSessions);
    setWithoutReviewSessions(withoutReview);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const openReviewSheet = (session: StudentBookings) => {
    setReviewSession(session);
    setRating(session.reviews?.rating ?? 0);
    setHoveredRating(0);
    setReviewText(session.reviews?.comment ?? "");
    setReviewSheetOpen(true);
  };

  const openFeedBackSheet = () => {
    setFeedbackSheetOpen(true);
  };

  const submitReview = async () => {
    if (!reviewSession || rating === 0 || !reviewText.trim()) return;
    const toastId = toast.loading("Review submitting...");
    try {
      const response = await createReview({
        bookingId: reviewSession.id,
        rating,
        comment: reviewText.trim(),
      });

      if (!response?.data?.success) {
        toast.error("Review failed!", { id: toastId });
        return;
      }

      toast.success(`Review submitted.`, {
        id: toastId,
      });
      loadSessions();
      setReviewSheetOpen(false);
    } catch (error) {
      toast.error("Review failed!", { id: toastId });
      return;
    }
  };

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
            <Badge
              variant="outline"
              className="bg-emerald-600 text-white hover:bg-emerald-600 font-normal"
            >
              {completedCount} Completed
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock3
                  className="size-4 text-[#ec5b13]"
                  suppressHydrationWarning
                />
                Today's Sessions
              </CardTitle>
              <CardDescription>
                Keep track of active and scheduled sessions today.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No session scheduled for today.
                </p>
              ) : (
                todaySessions.map((session, idx) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    animationIndex={idx}
                    openReviewSheet={() => openReviewSheet(session)}
                  />
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock
                  className="size-4 text-[#ec5b13]"
                  suppressHydrationWarning
                />
                Upcoming Sessions
              </CardTitle>
              <CardDescription>
                Future confirmed classes from your booking list.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No upcoming sessions.
                </p>
              ) : (
                upcomingSessions.map((session, idx) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    animationIndex={idx}
                    openReviewSheet={() => openReviewSheet(session)}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <NotebookTabs
                  className="size-4 text-[#ec5b13]"
                  suppressHydrationWarning
                />
                Session History
              </CardTitle>
              <CardDescription>Recent completed sessions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {historySessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No completed sessions yet.
                </p>
              ) : (
                historySessions
                  .slice(0, 2)
                  .map((session) => (
                    <HistorySessionItem
                      key={session.id}
                      session={session}
                      openReviewSheet={openReviewSheet}
                    />
                  ))
              )}
            </CardContent>

            <CardFooter>
              <Link href="/dashboard/history">
                <Button variant="outline" className="w-full font-normal">
                  <ArrowRight
                    className="mr-2 size-4"
                    suppressHydrationWarning
                  />
                  View all history
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star
                  className="size-4 text-[#ec5b13]"
                  suppressHydrationWarning
                />
                Feedback Reminder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have {withoutReviewSessions.length} completed sessions
                without tutor feedback. Share a quick review to improve
                recommendations.
              </p>
              <Button
                className="mt-4 w-full bg-[#ec5b13] text-white hover:bg-[#d44f10] font-normal"
                disabled={withoutReviewSessions.length === 0}
                onClick={() => {
                  openFeedBackSheet();
                }}
              >
                Add Reviews
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ReviewSessionSheet
        reviewSheetOpen={reviewSheetOpen}
        setReviewSheetOpen={setReviewSheetOpen}
        reviewSession={reviewSession}
        rating={rating}
        hoveredRating={hoveredRating}
        reviewText={reviewText}
        setRating={setRating}
        setHoveredRating={setHoveredRating}
        setReviewText={setReviewText}
        submitReview={submitReview}
      />

      <Sheet open={feedBackSheetOpen} onOpenChange={setFeedbackSheetOpen}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="inset-auto left-1/2 top-1/2 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl border flex flex-col max-h-[80vh]"
        >
          <SheetHeader className="shrink-0 relative border-b bg-linear-to-r from-orange-50 via-orange-50 to-amber-50 px-6 py-5 text-left">
            <SheetClose className="absolute right-4 top-4 rounded-sm p-1 text-[#221610] opacity-90 transition-opacity hover:opacity-100 focus:outline-none">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
            <SheetTitle className="flex items-center gap-2 text-xl text-[rgb(34,22,16)] dark:text-[#221610]">
              <MessageSquare
                className="size-5 text-[#ec5b13]"
                suppressHydrationWarning
              />
              Add Reviews
            </SheetTitle>
            <SheetDescription className="text-[#6b4f3d] dark:text-[#6b4f3d]">
              Share feedback for your completed sessions to help us improve your
              learning experience.
            </SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-y-auto space-y-4 px-4 pb-6">
            {withoutReviewSessions.map((session) => (
              <HistorySessionItem
                key={session.id}
                session={session}
                openReviewSheet={() => openReviewSheet(session)}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
