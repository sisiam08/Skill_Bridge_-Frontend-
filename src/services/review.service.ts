import { env } from "@/env";
import { Review } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const ReviewService = {
  createReview: async (reviewData: Review) => {
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
};
