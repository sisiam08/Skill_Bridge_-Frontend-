"use client";

import { useEffect, useState } from "react";
import { Bookings } from "@/types";
import { BookingStatus } from "@/constants/status";
import { getAllBookings, getBookingSessions, getMyBookings } from "@/actions/booking.action";
import BookingsHistory from "@/components/layout/BookingsHistory";
import { UserRole } from "@/constants/roles";

export default function TutorSessionsHistoryPage() {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [status, setStatus] = useState<BookingStatus | undefined>();
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getBookingSessions(status);

      if (response.error || !response.data) return;

      setBookings(response.data.data);
    })();
  }, [status]);

  return (
    <BookingsHistory
      role={UserRole.TUTOR}
      bookings={bookings}
      status={status}
      setStatus={setStatus}
      expandedReview={expandedReview}
      setExpandedReview={setExpandedReview}
    />
  );
}
