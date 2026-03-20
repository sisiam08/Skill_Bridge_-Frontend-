"use client";

import { useEffect, useState } from "react";
import { Bookings } from "@/types";
import { BookingStatus } from "@/constants/status";
import { getAllBookings } from "@/actions/booking.action";
import BookingsHistory from "@/components/layout/BookingsHistory";
import { UserRole } from "@/constants/roles";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [status, setStatus] = useState<BookingStatus | undefined>();
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getAllBookings(status);

      if (response.error || !response.data) return;

      setBookings(response.data.data);
    })();
  }, [status]);

  return (
    <BookingsHistory
      role={UserRole.ADMIN}
      bookings={bookings}
      status={status}
      setStatus={setStatus}
      expandedReview={expandedReview}
      setExpandedReview={setExpandedReview}
    />
  );
}
