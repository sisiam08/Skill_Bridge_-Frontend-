import { env } from "@/env";
import { ReviewType } from "@/types";
import { get } from "http";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const ReviewService = {
  createReview: async (reviewData: ReviewType) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },

  getAllReviews: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },

  getAllReviewsForTutor: async (tutorId: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews/tutor/${tutorId}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },
};
