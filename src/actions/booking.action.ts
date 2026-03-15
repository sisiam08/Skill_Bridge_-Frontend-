"use server";

import { BookingService } from "@/services/booking.service";

export const getBookingSessions = async () => {
  const { data, error } = await BookingService.getBookingSessions();

  return { data, error };
};

export const updateBookingStatus = async (
  bookingId: string,
  status: string,
) => {
  const { data, error } = await BookingService.updateBookingStatus(
    bookingId,
    status,
  );
  return { data, error };
};

export const getMyBookings = async () => {
  const { data, error } = await BookingService.getMyBookings();
  return { data, error };
};
