import Link from "next/link";
import { Button } from "@/components/ui/button";
import TutorCard from "@/components/layout/TutorCard";
import { TutorProfile } from "@/types";

export default function FeaturedSection({
  featuredTutors,
}: {
  featuredTutors: TutorProfile[];
}) {
  return (
    <section id="featured-tutors" className="scroll-mt-20 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
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

        {featuredTutors.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
            <p className="text-base font-semibold text-[#221610] dark:text-white">
              No featured tutors yet
            </p>
            <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
              Check back soon — we're busy finding the best tutors for you.
              In the meantime, explore all available tutors.
            </p>
            <Button
              asChild
              className="mt-2 bg-[#ec5b13] text-white hover:bg-[#d44e0e]"
            >
              <Link href="/find_tutors">Browse all tutors</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
