import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const BookingService = {
  getBookingSessions: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/tutors/bookings`,
        {
          headers: {
            cookie: cookieStore.toString(),
          },
        },
      );

      const data = await res.json();

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

  getMyBookings: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/bookings/my-bookings`,
        {
          headers: {
            cookie: cookieStore.toString(),
          },
        },
      );

      const data = await res.json();

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
