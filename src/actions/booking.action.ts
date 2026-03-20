"use server";

import { BookingStatus } from "@/constants/status";
import { BookingService } from "@/services/booking.service";
import { BookingSlot } from "@/types";

export const getBookingSessions = async (status?: BookingStatus) => {
  const { data, error } = await BookingService.getBookingSessions(status);

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

export const getMyBookings = async (status?: BookingStatus) => {
  const { data, error } = await BookingService.getMyBookings(status);
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

export const getAllBookings = async (status?: BookingStatus) => {
  const { data, error } = await BookingService.getAllBookings(status);
  return { data, error };
};
