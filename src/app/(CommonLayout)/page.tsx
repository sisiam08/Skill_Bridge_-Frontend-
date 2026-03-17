"use client";

import { getAllReviews } from "@/actions/review.action";
import { getAllTutors } from "@/actions/tutor.action";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/modules/Home/FeaturedSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import Reviews from "@/components/modules/Home/Reviews";
import WorkFlow from "@/components/modules/Home/WorkFlow";
import { Separator } from "@/components/ui/separator";
import { ReviewType, TutorProfile } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [featuredTutors, setFeaturedTutors] = useState<TutorProfile[]>([]);

  const [reviews, setReviews] = useState<ReviewType[]>([]);
  // console.log(reviews);

  useEffect(() => {
    (async () => {
      // all reviews
      const allReviewsResponse = await getAllReviews();
      if (!allReviewsResponse.data.success) return;

      setReviews(allReviewsResponse.data.data);

      // featured tutors
      const featuredTutorsResponse = await getAllTutors();

      if (!featuredTutorsResponse.data.success) return;

      const tutors = featuredTutorsResponse.data.data.data;

      setFeaturedTutors(
        tutors
          .filter(
            (tutor: TutorProfile) =>
              tutor.totalCompletedBookings >= 5 &&
              tutor.totalRating / tutor.totalReviews >= 4,
          )
          .slice(0, 6),
      );
    })();
  }, []);
  return (
    <main className="min-h-screen  bg-[#f8f6f6] dark:bg-[#1a120d] text-foreground">
      <HeroSection />
      <WorkFlow />
      <FeaturedSection featuredTutors={featuredTutors} />

      <div className="text-center py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#221610] dark:text-white">
          What Students Are Saying
        </h2>
        <Separator className="h-1.5 w-20 bg-[#ec5b13] mx-auto mt-4 rounded-full" />
      </div>
      <Reviews reviews={reviews} />

      <Footer />
    </main>
  );
}
