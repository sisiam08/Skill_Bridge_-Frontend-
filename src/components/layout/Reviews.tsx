"use client";

import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewType } from "@/types";
import RenderStars from "../ui/renderStars";

export default function Reviews({ reviews }: { reviews: ReviewType[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reviews.length <= 3) return;
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      element.scrollLeft += e.deltaY;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [reviews.length]);

  return (
    <section>
      <div className="max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-7xl mx-auto px-2">
        {reviews.length > 0 ? (
          <div ref={scrollRef} className="pb-4 overflow-x-auto scrollbar-hide">
            <div className="flex min-w-max gap-6">
              {reviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="animate-in fade-in slide-in-from-bottom-2 w-65 shrink-0 rounded-2xl border border-gray-100 bg-white py-0 shadow-md transition-all duration-500 hover:shadow-xl sm:w-80 lg:w-88 dark:border-gray-800 dark:bg-brand-surface/80 snap-start"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="space-y-4 p-6">
                    <Badge
                      variant="secondary"
                      className="w-fit bg-transparent p-0 text-lg text-brand"
                    >
                      <RenderStars rating={review.rating} />
                    </Badge>

                    <CardDescription className="text-sm leading-relaxed text-[#4b4b4b] italic dark:text-gray-300">
                      "{review.comment}"
                    </CardDescription>

                    <CardHeader className="flex flex-row items-center gap-3 px-0 pb-0">
                      <Avatar className="size-10 border border-border/70">
                        <AvatarImage
                          src={review.studentImage}
                          alt={review.studentName}
                        />
                        <AvatarFallback>SP</AvatarFallback>
                      </Avatar>

                      <div>
                        <CardTitle className="text-sm font-bold text-brand-ink dark:text-white">
                          {review.studentName}
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                          Reviewed {review.tutorName} - {review.tutorCategory}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-sm text-gray-400">
            No reviews yet. Be the first to review your tutor and share your
            experience with others!
          </div>
        )}
      </div>
    </section>
  );
}
