import { BookingStatus } from "@/constants/status";
import { env } from "@/env";
import { BookingSlot } from "@/types";
import { create } from "domain";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const BookingService = {
  getBookingSessions: async (status?: BookingStatus) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/tutors/bookings`);
      if (status) {
        url.searchParams.append("status", status);
      }

      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        return {
          data: null,
          error: {
            message: data?.message || "Failed to get booking sessions!",
          },
        };
      }

      return {
        data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },

  updateBookingStatus: async (bookingId: string, status: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        return {
          data: null,
          error: {
            message: data?.message || "Failed to update booking status!",
          },
        };
      }

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },

  getMyBookings: async (status?: BookingStatus) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/bookings/my-bookings`);
      if (status) {
        url.searchParams.append("status", status);
      }

      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        return {
          data: null,
          error: { message: data?.message || "Failed to get my bookings!" },
        };
      }

      return {
        data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },

  createBooking: async (tutorId: string, bookingData: BookingSlot) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ tutorId, ...bookingData }),
      });
      const data = await res.json();

      if (!res.ok || !data?.success) {
        return {
          data: null,
          error: { message: "Unauthorized" },
        };
        console.log(data);
      }

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },

  getAllBookings: async (status?: BookingStatus) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/bookings`);
      if (status) {
        url.searchParams.append("status", status);
      }

      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        return {
          data: null,
          error: { message: data?.message || "Failed to get all bookings!" },
        };
      }

      return {
        data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },
};
