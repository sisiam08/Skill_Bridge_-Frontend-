"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookingStatus } from "@/constants/bookingStatus";
import { convertInto12h } from "@/helpers/convertInto12h";
import { SessionCardBooking } from "@/types";
import { format } from "date-fns";
import {
  AlarmClockCheck,
  CircleCheckBig,
  ExternalLink,
  GraduationCap,
  MessageSquare,
  UserRound,
  Video,
  XCircle,
} from "lucide-react";
import Link from "next/link";

type SessionCardProps = {
  session: SessionCardBooking;
  animationIndex?: number;

  openReviewSheet?: () => void;
  startClass?: () => void;
  openCompleteSessionSheet?: () => void;
};

export default function SessionCard({
  session,
  animationIndex = 0,
  openReviewSheet,
  startClass,
  openCompleteSessionSheet,
}: SessionCardProps) {
  const isStudentSession = "tutor" in session;

  const personName = isStudentSession
    ? session.tutor.user.name
    : session.student.name;
  const personSubtitle = isStudentSession
    ? session.tutor.category.name
    : session.student.email;
  const hasReview = isStudentSession ? Boolean(session.reviews) : false;

  return (
    <Card
      className="animate-in fade-in slide-in-from-bottom-2 duration-500 border border-border/80"
      style={{ animationDelay: `${animationIndex * 80}ms` }}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-semibold">
              <UserRound className="size-4 text-[#ec5b13]" />
              {personName}
            </p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
              <GraduationCap className="size-3.5 text-[#ec5b13]" />
              {personSubtitle}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-3">
              {format(new Date(session.sessionDate), "MMM dd, yyyy")}
            </p>
            <Badge variant="outline" className="text-sm font-normal">
              {convertInto12h(session.startTime)} -{" "}
              {convertInto12h(session.endTime)}
            </Badge>
          </div>

          <div className="flex flex-col items-center">
            <Badge
              className={
                session.status === BookingStatus.CONFIRMED
                  ? "bg-blue-500 text-white hover:bg-blue-500 font-normal"
                  : session.status === BookingStatus.RUNNING
                    ? "bg-[#ec5b13] text-white hover:bg-[#ec5b13] font-normal"
                    : session.status === BookingStatus.COMPLETED
                      ? "bg-emerald-600 text-white hover:bg-emerald-600 font-normal"
                      : "bg-red-500 text-white hover:bg-red-500 font-normal"
              }
            >
              {session.status}
            </Badge>
            <Badge
              variant="outline"
              className="text-sm mt-3 h-auto font-normal"
            >
              {session.status === BookingStatus.CANCELLED ? (
                <span className="border-muted text-muted-foreground line-through">
                  Fees: {session.price} ৳
                </span>
              ) : (
                `Fees: ${session.price} ৳`
              )}
            </Badge>
          </div>
        </div>

        {isStudentSession ? (
          session.classLink ? (
            session.status === BookingStatus.RUNNING ? (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href={session.classLink} target="_blank">
                  <Button className="bg-[#ec5b13] text-white hover:bg-[#d44f10] font-normal">
                    <Video className="mr-2 size-4" />
                    Join Live Class
                    <ExternalLink className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  className="bg-emerald-600 text-white hover:bg-emerald-700 font-normal"
                  disabled
                >
                  <CircleCheckBig className="mr-2 size-4" />
                  Class Completed
                </Button>
                {!hasReview ? (
                  <Button
                    variant="outline"
                    className="border-[#ec5b13]/30 text-[#ec5b13] hover:bg-[#ec5b13]/5 hover:text-[#d44f10] font-normal"
                    onClick={openReviewSheet}
                  >
                    <MessageSquare className="mr-2 size-4" />
                    Review Session
                  </Button>
                ): null}
              </div>
            )
          ) : session.status === BookingStatus.CANCELLED ? (
            <Button
              variant="outline"
              className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:text-red-400 font-normal"
              disabled
            >
              <XCircle className="mr-2 size-4" />
              Class Cancelled
            </Button>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="font-normal" disabled>
                <AlarmClockCheck className="mr-2 size-4" />
                Wait For Class Link
              </Button>
            </div>
          )
        ) : session.status === BookingStatus.RUNNING ? (
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 font-normal"
              onClick={startClass}
            >
              <Video className="mr-2 size-4" />
              Send Link Again
            </Button>
            <Button
              className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-normal"
              onClick={openCompleteSessionSheet}
            >
              <CircleCheckBig className="mr-2 size-4" />
              Mark as Completed
            </Button>
          </div>
        ) : session.status === BookingStatus.COMPLETED ? (
          <Button
            className="bg-emerald-600 text-white hover:bg-emerald-700 font-normal"
            disabled
          >
            <CircleCheckBig className="mr-2 size-4" />
            Class Completed
          </Button>
        ) : session.status === BookingStatus.CANCELLED ? (
          <Button
            variant="outline"
            className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:text-red-400 font-normal"
            disabled
          >
            <XCircle className="mr-2 size-4" />
            Class Cancelled
          </Button>
        ) : (
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="bg-[#ec5b13] text-white hover:bg-[#d44f10] font-normal"
              onClick={startClass}
            >
              <Video className="mr-2 size-4" />
              Start Class
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
