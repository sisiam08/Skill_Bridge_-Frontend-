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
import { Star } from "lucide-react";

export default function Reviews({ reviews }: { reviews: ReviewType[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    drag.current = {
      active: true,
      startX: e.pageX,
      scrollLeft: el.scrollLeft,
    };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el || !drag.current.active) return;

    const walk = (e.pageX - drag.current.startX) * 1.2;
    el.scrollLeft = drag.current.scrollLeft - walk;
  };

  const stopDragging = () => (drag.current.active = false);

  useEffect(() => {
    if(reviews.length === 0) return;
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [reviews.length]);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4">
        {reviews.length > 0 ? (
          <div
            ref={scrollRef}
            className="-mx-4 cursor-grab overflow-x-auto overscroll-x-contain px-4 pb-4 select-none scrollbar-hide active:cursor-grabbing"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
          >
            <div className="flex min-w-max gap-6 snap-x snap-mandatory">
              {reviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="animate-in fade-in slide-in-from-bottom-2 w-75 shrink-0 snap-start gap-0 rounded-2xl border border-gray-100 bg-white py-0 shadow-md transition-all duration-500 hover:shadow-xl sm:w-85 lg:w-90 dark:border-gray-800 dark:bg-[#221610]/80"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="space-y-4 p-6">
                    <Badge
                      variant="secondary"
                      className="w-fit bg-transparent p-0 text-lg text-[#ec5b13]"
                    >
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`size-4 ${idx < review.rating ? "fill-current" : "fill-none"}`}
                        />
                      ))}
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
                        <CardTitle className="text-sm font-bold text-[#221610] dark:text-white">
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
