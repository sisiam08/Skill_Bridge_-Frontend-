"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BadgeCheck,
  Clock3,
  GraduationCap,
  Mail,
  MessageSquareText,
  Sparkles,
  Star,
} from "lucide-react";
import { getTutorById } from "@/actions/tutor.action";
import {
  AvailabilityType,
  AvailableSlotType,
  ReviewType,
  SlotType,
  TutorProfile,
} from "@/types";
import default_img from "../../../../../public/default-avatar-profile.jpg";
import {
  getAvailability,
  getAvailableSlots,
} from "@/actions/availability.action";
import Availabilities from "@/components/layout/Availabilities";
import { format } from "date-fns";
import { toast } from "sonner";
import { convertInto12h } from "@/helpers/TimeHelpers";
import { createBooking } from "@/actions/booking.action";
import Reviews from "@/components/layout/Reviews";
import { getAllReviewsForTutorProfile } from "@/actions/review.action";

export default function TutorProfileDetailPage(params: {
  params: Promise<{ id: string }>;
}) {
  const tutorId = useParams().id as string;
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const [tutorDetails, setTutorDetails] = useState<TutorProfile | null>(null);
  const [availabilities, setAvailabilities] = useState<AvailabilityType[]>([]);
  const [availableSlots, setAvailableSlots] =
    useState<AvailableSlotType | null>(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);

  const today = format(new Date(), "yyyy-MM-dd");
  const durationOptions = [60, 120, 180];

  const formatDuration = (minutes: number): string => {
    const hours = minutes / 60;
    if (hours === Math.floor(hours)) {
      return `${Math.floor(hours)} ${hours === 1 ? "hour" : "hours"}`;
    }
    return `${minutes} minutes`;
  };

  useEffect(() => {
    if (!tutorId) return;

    (async () => {
      const tutorResponse = await getTutorById(tutorId);
      if (!tutorResponse.data.success) return;
      const tutorDetails: TutorProfile = tutorResponse.data?.data;
      setTutorDetails(tutorDetails);

      const availabilityResponse = await getAvailability(tutorId);
      if (!availabilityResponse.data.success) return;
      setAvailabilities(availabilityResponse.data.data);

      const reviewsResponse = await getAllReviewsForTutorProfile(tutorId);
      if (!reviewsResponse.data.success) return;
      setReviews(reviewsResponse.data.data);
    })();
  }, [tutorId]);

  const performanceCards = [
    {
      label: "Rating",
      value:
        tutorDetails?.totalRating && tutorDetails?.totalReviews
          ? (tutorDetails.totalRating / tutorDetails.totalReviews).toFixed(1)
          : 0,
      note: "Average student satisfaction",
      icon: Star,
    },
    {
      label: "Completed",
      value: tutorDetails?.totalCompletedBookings ?? 0,
      note: "1:1 classes completed",
      icon: BadgeCheck,
    },
    {
      label: "Reviews",
      value: tutorDetails?.totalReviews ?? 0,
      note: "Detailed written feedback",
      icon: MessageSquareText,
    },
    {
      label: "Experience",
      value: tutorDetails?.experienceYears
        ? `${tutorDetails.experienceYears} yrs`
        : "N/A",
      note: "Years of tutoring experience",
      icon: Sparkles,
    },
  ];

  const showAvailableSlots = async (date: Date, duration: string) => {
    if (!date || !duration) {
      setAvailableSlots(null);
      return;
    }

    const toastId = toast.loading("Checking available slots...");
    try {
      const response = await getAvailableSlots(tutorId, date, duration);

      // console.log(response);

      if (response.error || !response.data) {
        toast.error(
          response.error?.message || "Failed to fetch available slots",
          { id: toastId },
        );
        setAvailableSlots(null);
        return;
      }

      // console.log(response.data.data.availableSlots.length);

      if (response.data.data.availableSlots.length === 0) {
        toast.error("No available slots match the selected date and duration", {
          id: toastId,
        });
        setAvailableSlots(null);
        return;
      }

      toast.success("Available slots updated", { id: toastId });
      setAvailableSlots(response.data.data);
    } catch (error) {
      toast.error("An error occurred while fetching available slots", {
        id: toastId,
      });
      setAvailableSlots(null);
      return;
    }
  };

  useEffect(() => {
    if (!selectedDate || !selectedDuration) {
      setAvailableSlots(null);
      return;
    }

    showAvailableSlots(new Date(selectedDate), selectedDuration);
  }, [selectedDate, selectedDuration]);

  const bookingSession = async () => {
    if (!selectedSlot) return;
    const now = new Date();
    const currentTime = format(now, "HH:mm");
    const todayDate = format(now, "yyyy-MM-dd");
    const bookingData = {
      sessionDate: selectedDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      currentTime,
      todayDate,
    };

    const toastId = toast.loading("Booking your session...");
    try {
      const response = await createBooking(tutorId, bookingData);

      if (response.error || !response.data) {
        toast.error(
          response?.error?.message ===
            "You don't have permission to access this resource"
            ? "Must be logged in as a student to book a session"
            : response?.error?.message || "Failed to book the session",
          {
            id: toastId,
          },
        );
        return;
      }

      if (response.data) {
        toast.success("Session booked successfully", { id: toastId });
        setSelectedDate("");
        setSelectedDuration("");
        setSelectedSlot(null);
      }
    } catch (error) {
      toast.error("An error occurred while booking the session", {
        id: toastId,
      });
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-orange-50 via-amber-50/60 to-white pb-14 pt-8 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-300/35 blur-3xl dark:bg-orange-500/25" />
        <div className="absolute bottom-8 -left-10 h-64 w-64 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-500/20" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-500/15" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-6 px-4 lg:grid-cols-1">
        <section className="space-y-6">
          <Card className="animate-in fade-in slide-in-from-bottom-2 overflow-hidden border-border/70 bg-linear-to-r from-orange-50 via-white to-amber-50 shadow-md duration-500 dark:from-card dark:via-card dark:to-card">
            <CardContent className="p-0">
              <div className="grid gap-0 md:grid-cols-[280px_1fr]">
                <div className="relative h-56 md:h-full">
                  <Image
                    src={tutorDetails?.user?.image ?? default_img}
                    alt={tutorDetails?.user?.name ?? "Tutor profile picture"}
                    fill
                    unoptimized
                    className="object-cover"
                    suppressHydrationWarning
                  />
                </div>

                <div className="space-y-6 p-6">
                  <div>
                    <h1 className="ui-title-profile">
                      {tutorDetails?.user?.name}
                    </h1>
                    <div className="mt-3 flex flex-col text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="inline-flex items-center gap-1">
                        <Mail
                          className="size-4 text-brand"
                          suppressHydrationWarning
                        />
                        {tutorDetails?.user?.email}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GraduationCap
                          className="size-4 text-brand"
                          suppressHydrationWarning
                        />
                        {tutorDetails?.category?.name ?? "N/A"}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {tutorDetails?.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {performanceCards.map((item, idx) => (
                      <div
                        key={item.label}
                        className="animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-orange-100 bg-white/80 p-3 duration-500 dark:border-zinc-800 dark:bg-zinc-900"
                        style={{ animationDelay: `${idx * 80}ms` }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                            {item.label}
                          </p>
                          <item.icon
                            className="size-4 text-brand"
                            suppressHydrationWarning
                          />
                        </div>
                        <p className="mt-2 ui-stat-compact">{item.value}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {item.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Availabilities
              availabilities={availabilities}
              isTutorView={false}
            />

            <Card>
              <div className="bg-linear-to-r from-brand to-brand-strong px-6 py-4 text-white">
                <p className="text-xs uppercase tracking-wider text-orange-100">
                  Book Session
                </p>
                <h3 className="mt-1 text-lg font-semibold">Book This Tutor</h3>
              </div>
              <CardHeader>
                <CardDescription>
                  Select date and duration to see matching slots
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-orange-200 bg-orange-50/70 p-4 dark:border-zinc-700 dark:bg-zinc-900">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Hourly Rate
                      </p>
                      <p className="mt-1 text-md font-semibold text-zinc-700 dark:text-zinc-300">
                        {tutorDetails?.hourlyRate} tk/hour
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Estimated Cost
                      </p>
                      <p className="mt-1 ui-stat-value text-brand">
                        ৳{availableSlots?.price ?? 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="booking-date" className="text-sm font-medium">
                    Select date
                  </label>
                  <Input
                    id="booking-date"
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(event.target.value);
                      setSelectedSlot(null);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Slot duration</label>
                  <Select
                    value={selectedDuration}
                    onValueChange={(value) => {
                      setSelectedDuration(value);
                      setSelectedSlot(null);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((duration) => (
                        <SelectItem key={duration} value={String(duration)}>
                          {formatDuration(duration)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg border border-zinc-200/80 p-3 dark:border-zinc-800">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Matching Availability
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    <Clock3
                      className="size-4 text-brand"
                      suppressHydrationWarning
                    />
                    {selectedDate
                      ? format(new Date(selectedDate), "EEEE, MMMM d")
                      : "Select a date first"}
                  </p>

                  {!selectedDate ? (
                    <p className="mt-3 text-sm text-zinc-500">
                      Pick a date and duration to view tutor slots.
                    </p>
                  ) : availableSlots?.availableSlots.length === 0 ? (
                    <p className="mt-3 text-sm text-red-500">
                      No slots match your selected duration on this day.
                    </p>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {availableSlots?.availableSlots.map((slot, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant={
                            selectedSlot === slot ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedSlot(slot)}
                          className={
                            selectedSlot === slot
                              ? "rounded-full bg-brand text-white hover:bg-brand-strong"
                              : "rounded-full border px-3 py-1 text-xs font-medium transition-colors border-emerald-400 bg-emerald-50 text-emerald-700  hover:border-orange-200 hover:text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:border-orange-200 dark:hover:bg-orange-50/10"
                          }
                        >
                          {convertInto12h(slot.startTime)} –{" "}
                          {convertInto12h(slot.endTime)}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-2">
                <Button
                  disabled={!selectedSlot}
                  className="w-full bg-brand text-white hover:bg-brand-strong"
                  onClick={() => bookingSession()}
                >
                  Book Session
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="animate-in fade-in slide-in-from-bottom-2 border-border/70 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareText
                  className="size-4 text-brand"
                  suppressHydrationWarning
                />
                Student Reviews
              </CardTitle>
              <CardDescription>
                Real feedback from students who have booked sessions with this
                tutor. Read about their experiences and the impact of the
                tutoring sessions on their learning journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Reviews reviews={reviews} />
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"></div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
