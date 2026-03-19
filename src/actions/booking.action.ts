"use server";

import { BookingService } from "@/services/booking.service";
import { BookingSlot } from "@/types";

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

export const createBooking = async (
  tutorId: string,
  bookingData: BookingSlot,
) => {
  const { data, error } = await BookingService.createBooking(
    tutorId,
    bookingData,
  );

  console.log(data);
  return { data, error };
};
