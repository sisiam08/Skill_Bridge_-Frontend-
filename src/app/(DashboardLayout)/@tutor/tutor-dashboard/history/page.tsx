"use client";

import { useEffect, useState } from "react";
import { Bookings, BookingsFilters, PaginationType } from "@/types";
import { BookingStatus } from "@/constants/status";
import { getBookingSessions } from "@/actions/booking.action";
import BookingsHistory from "@/components/layout/BookingsHistory";
import { UserRole } from "@/constants/roles";

export default function TutorSessionsHistoryPage() {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    totalData: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<BookingsFilters>({
    status: undefined,
    page: "1",
    limit: "10",
  });
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getBookingSessions(filters);

      if (response.error || !response.data) return;

      setBookings(response.data.data.data);
      setPagination(response.data.data.pagination);
    })();
  }, [filters]);

  return (
    <BookingsHistory
      role={UserRole.TUTOR}
      bookings={bookings}
      pagination={pagination}
      filters={filters}
      setFilters={setFilters}
      expandedReview={expandedReview}
      setExpandedReview={setExpandedReview}
    />
  );
}

