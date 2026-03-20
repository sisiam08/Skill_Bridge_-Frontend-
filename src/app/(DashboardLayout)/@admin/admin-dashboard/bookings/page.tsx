"use client";

import { useEffect, useState } from "react";
import { Bookings, BookingsFilters, PaginationType } from "@/types";
import { getAllBookings } from "@/actions/booking.action";
import BookingsHistory from "@/components/layout/BookingsHistory";
import { UserRole } from "@/constants/roles";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    totalData: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  
  console.log(pagination);

  const [filters, setFilters] = useState<BookingsFilters>({
    status: undefined,
    page: "1",
    limit: "10",
  });
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getAllBookings(filters);

      if (response.error || !response.data) return;

      console.log(response.data.data.pagination);

      setBookings(response.data.data.data);
      setPagination(response.data.data.pagination);
    })();
  }, [filters]);

  return (
    <BookingsHistory
      role={UserRole.ADMIN}
      bookings={bookings}
      pagination={pagination}
      filters={filters}
      setFilters={setFilters}
      expandedReview={expandedReview}
      setExpandedReview={setExpandedReview}
    />
  );
}
