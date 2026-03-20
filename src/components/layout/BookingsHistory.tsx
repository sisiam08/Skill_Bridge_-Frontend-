import { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Star,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import { Bookings } from "@/types";
import { BookingStatus } from "@/constants/status";
import { getAllBookings } from "@/actions/booking.action";
import { convertInto12h } from "@/helpers/convertInto12h";
import { format } from "date-fns";
import RenderStars from "@/components/ui/renderStars";
import { User } from "better-auth";
import { UserRole } from "@/constants/roles";

type BookingsHistoryProps = {
  role: UserRole;
  bookings: Bookings[];
  status: BookingStatus | undefined;
  setStatus: (status: BookingStatus | undefined) => void;
  expandedReview: string | null;
  setExpandedReview: (bookingId: string | null) => void;
};

const getStatusBadge = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.CONFIRMED:
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          <CheckCircle className="mr-1 h-3 w-3" />
          Confirmed
        </Badge>
      );
    case BookingStatus.COMPLETED:
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      );
    case BookingStatus.CANCELLED:
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <XCircle className="mr-1 h-3 w-3" />
          Cancelled
        </Badge>
      );
    case BookingStatus.RUNNING:
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          <Activity className="mr-1 h-3 w-3" />
          Running
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
          <AlertCircle className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      );
  }
};

export default function BookingsHistory({
  role,
  bookings,
  status,
  setStatus,
  expandedReview,
  setExpandedReview,
}: BookingsHistoryProps) {
  const toggleReview = (bookingId: string) => {
    setExpandedReview(expandedReview === bookingId ? null : bookingId);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">
              {role === UserRole.STUDENT
                ? "Your Bookings"
                : role === UserRole.TUTOR
                  ? "All Sessions"
                  : "All Bookings"}{" "}
              Overview
            </CardTitle>
            <CardDescription>
              {role === UserRole.STUDENT
                ? "Monitor your bookings"
                : role === UserRole.TUTOR
                  ? "Monitor tutoring sessions"
                  : "Monitor and manage all tutoring sessions"}{" "}
              on the platform.
            </CardDescription>
          </div>
          <Badge className="bg-[#ec5b13] text-white hover:bg-[#ec5b13]">
            {bookings.length}{" "}
            {status === BookingStatus.CONFIRMED
              ? "Confirmed"
              : status === BookingStatus.COMPLETED
                ? "Completed"
                : status === BookingStatus.CANCELLED
                  ? "Cancelled"
                  : status === BookingStatus.RUNNING
                    ? "Running"
                    : "Bookings"}
          </Badge>
        </CardHeader>
      </Card>

      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 [animation-delay:240ms]">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter bookings by status or search</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={status === undefined ? "default" : "outline"}
              onClick={() => setStatus(undefined)}
              className={
                status === undefined
                  ? "bg-[#ec5b13] hover:bg-[#d44f10] dark:text-white"
                  : ""
              }
            >
              All
            </Button>
            <Button
              variant={
                status === BookingStatus.CONFIRMED ? "default" : "outline"
              }
              onClick={() => setStatus(BookingStatus.CONFIRMED)}
              className={
                status === BookingStatus.CONFIRMED
                  ? "bg-[#ec5b13] hover:bg-[#d44f10] dark:text-white"
                  : ""
              }
            >
              Confirmed
            </Button>
            <Button
              variant={
                status === BookingStatus.COMPLETED ? "default" : "outline"
              }
              onClick={() => setStatus(BookingStatus.COMPLETED)}
              className={
                status === BookingStatus.COMPLETED
                  ? "bg-[#ec5b13] hover:bg-[#d44f10] dark:text-white"
                  : ""
              }
            >
              Completed
            </Button>
            <Button
              variant={
                status === BookingStatus.CANCELLED ? "default" : "outline"
              }
              onClick={() => setStatus(BookingStatus.CANCELLED)}
              className={
                status === BookingStatus.CANCELLED
                  ? "bg-[#ec5b13] hover:bg-[#d44f10] dark:text-white"
                  : ""
              }
            >
              Cancelled
            </Button>
            <Button
              variant={status === BookingStatus.RUNNING ? "default" : "outline"}
              onClick={() => setStatus(BookingStatus.RUNNING)}
              className={
                status === BookingStatus.RUNNING
                  ? "bg-[#ec5b13] hover:bg-[#d44f10] dark:text-white"
                  : ""
              }
            >
              Running
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 [animation-delay:280ms]">
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            Complete list of tutoring sessions with details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="rounded-md border bg-muted/30 px-3 py-8 text-center text-sm text-muted-foreground">
              No bookings found matching your filters.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {role !== UserRole.STUDENT ? (
                    <TableHead className="text-center">Student</TableHead>
                  ) : null}
                  {role !== UserRole.TUTOR ? (
                    <TableHead className="text-center">Tutor</TableHead>
                  ) : null}
                  <TableHead className="text-center">Category</TableHead>
                  <TableHead className="text-center">Session Date</TableHead>
                  <TableHead className="text-center">Session Time</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Reviews</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <Fragment key={booking.id}>
                    <TableRow>
                      {role !== UserRole.STUDENT ? (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={booking.student?.image} />
                              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                {booking.student?.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {booking.student?.name}
                            </span>
                          </div>
                        </TableCell>
                      ) : null}

                      {role !== UserRole.TUTOR ? (
                        <TableCell className="text-center">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={booking.tutor?.user?.image} />
                              <AvatarFallback className="bg-[#ec5b13]/10 text-[#ec5b13] text-xs">
                                {booking.tutor?.user?.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {booking.tutor?.user?.name}
                            </span>
                          </div>
                        </TableCell>
                      ) : null}

                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {booking.tutor?.category?.name ?? "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {format(new Date(booking.sessionDate), "PP")}
                      </TableCell>
                      <TableCell className="text-center">
                        {convertInto12h(booking.startTime)} -{" "}
                        {convertInto12h(booking.endTime)}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        ৳{booking.price}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(booking.status as BookingStatus)}
                      </TableCell>
                      <TableCell className="text-center">
                        {booking.reviews ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleReview(booking.id)}
                            className="gap-1"
                          >
                            <span className="flex items-center gap-1">
                              {booking.reviews.rating}
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            </span>
                            {expandedReview === booking.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No review
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                    {expandedReview === booking.id && booking.reviews && (
                      <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableCell colSpan={8} className="p-4">
                          <div className="flex items-start gap-4 rounded-lg border bg-background p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ec5b13]/10">
                              <MessageSquare className="h-5 w-5 text-[#ec5b13]" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="font-semibold">
                                    Review from {booking.student?.name}
                                  </span>
                                  <RenderStars
                                    rating={booking.reviews.rating}
                                  />
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {booking.reviews.rating}/5
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {booking.reviews.comment ||
                                  "No comment provided."}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
