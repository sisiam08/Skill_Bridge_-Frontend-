import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export function FeaturedSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f8f6f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 text-center md:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#221610]">
              Featured Expert Tutors
            </h2>

            <p className="text-[#4b4b4b] mt-2 text-sm md:text-base">
              Highly rated professionals ready to help you succeed.
            </p>
          </div>

          <Button
            asChild
            variant="link"
            className="text-[#ec5b13] font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm p-0 h-auto no-underline hover:no-underline"
          >
            <Link href="#">
              View all tutors
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card
              key={item}
              className="group overflow-hidden border border-gray-100 rounded-2xl hover:shadow-2xl hover:shadow-[#ec5b13]/10 transition-all bg-white"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/tutor${item}/600/400`}
                  alt="Tutor"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <Badge
                  variant="secondary"
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#ec5b13]"
                >
                  <span className="material-symbols-outlined text-sm">star</span>
                  Rating
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <CardTitle className="text-xl font-bold text-[#221610]">
                      Tutor Name
                    </CardTitle>

                    <CardDescription className="text-sm text-[#ec5b13] font-semibold uppercase tracking-wider">
                      Subject
                    </CardDescription>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-black text-[#221610]">
                      $Price
                    </span>
                    <span className="text-gray-400 text-sm">/hr</span>
                  </div>
                </div>

                <CardDescription className="text-[#4b4b4b] text-sm mb-6 line-clamp-2">
                  Tutor description goes here.
                </CardDescription>

                <Button className="w-full bg-[#ec5b13]/10 text-[#ec5b13] hover:bg-[#ec5b13] hover:text-white rounded-xl transition-all">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
