"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import TutorCard from "@/components/layout/TutorCard";
import { useEffect, useState } from "react";
import { getAllTutors } from "@/actions/tutor.action";
import { TutorCardProps } from "@/types";

export function FeaturedSection() {
  const [tutors, setTutors] = useState<TutorCardProps[]>([]);

  useEffect(() => {
    const fetchFeaturedTutors = async () => {
      const response = await getAllTutors();
      const featuredTutors = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response)
            ? response
            : [];

      setTutors(featuredTutors);
    };

    fetchFeaturedTutors();
  }, []);

  return (
    <section
      id="featured-tutors"
      className="scroll-mt-20 py-16 md:py-24 bg-[#f8f6f6] dark:bg-[#1a120d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 text-center md:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#221610] dark:text-white">
              Featured Expert Tutors
            </h2>

            <p className="text-[#4b4b4b] dark:text-slate-300 mt-2 text-sm md:text-base">
              Highly rated professionals ready to help you succeed.
            </p>
          </div>

          <Button
            asChild
            variant="link"
            className="text-[#ec5b13] font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm p-0 h-auto no-underline hover:no-underline"
          >
            <Link href="/find_tutors">
              View all tutors
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} {...tutor} />
          ))}
        </div>
      </div>
    </section>
  );
}
