"use server";

import { ReviewService } from "@/services/review.service";
import { ReviewType } from "@/types";

export const createReview = async (reviewData: ReviewType) => {
  const { data, error } = await ReviewService.createReview(reviewData);

  return { data, error };
};

export const getAllReviews = async () => {
  const { data, error } = await ReviewService.getAllReviews();
  return { data, error };
};

export const getAllReviewsForTutor = async (tutorId: string) => {
  const { data, error } = await ReviewService.getAllReviewsForTutor(tutorId);
  return { data, error };
};
