"use server";

import { ReviewService } from "@/services/review.service";
import { Review } from "@/types";

export const createReview = async (reviewData: Review) => {
  const { data, error } = await ReviewService.createReview(reviewData);

  return { data, error };
};
