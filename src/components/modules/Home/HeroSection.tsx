"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { getcategory } from "@/actions/category.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Categories } from "@/types";
import hero_img from ".././../../../public/register-page-content.png";

const HeroFilters = dynamic(() => import("./HeroFilters"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
      <Button
        type="button"
        variant="outline"
        className="h-auto shadow-none w-37.5 px-4 py-2 text-[#221610] bg-white border border-gray-200 rounded-xl text-xs font-semibold hover:border-[#ec5b13] transition-colors"
      >
        Category
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-auto shadow-none w-37.5 px-4 py-2 text-[#221610] bg-white border border-gray-200 rounded-xl text-xs font-semibold hover:border-[#ec5b13] transition-colors"
      >
        Rating
      </Button>
    </div>
  ),
});

export default function HeroSection() {
  const [searchValue, setSeachValue] = useState("");
  const [categoryValue, setCategory] = useState("");
  const [ratingValue, setRating] = useState("");
  const [categories, setCategories] = useState<Categories[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getcategory();
      setCategories(response?.data ?? []);
    })();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchValue.trim()) {
      params.append("search", searchValue.trim());
    }
    if (categoryValue) {
      params.append("category", categoryValue);
    }
    if (ratingValue) {
      params.append("rating", ratingValue);
    }
    
    const query = params.toString();

    router.push(query ? `/find_tutors?${query}` : "/find_tutors");
    
  };

  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-[#f8f6f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left">
            <Badge
              variant="secondary"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec5b13]/10 text-[#ec5b13] text-xs font-bold uppercase tracking-wider w-fit mx-auto lg:mx-0"
            >
              <span className="material-symbols-outlined text-sm">
                auto_awesome
              </span>
              Unlock Your Potential
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight tracking-tight text-[#221610]">
              Connect with Expert Tutors,
              <span className="text-[#ec5b13] block">Learn Anything</span>
            </h1>

            <p className="text-base md:text-lg text-[#4b4b4b] leading-relaxed max-w-lg mx-auto lg:mx-0">
              Find the perfect mentor to help you master new skills with
              personalized one-on-one sessions tailored to your goals.
            </p>

            <form
              className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              {/* Search Box */}
              <div className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-2xl shadow-xl shadow-[#ec5b13]/5 border border-[#ec5b13]/10">
                <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100">
                  <span className="text-[#ec5b13] material-symbols-outlined">
                    search
                  </span>

                  <Input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSeachValue(e.target.value)}
                    placeholder="Search subjects (e.g. Physics, TypeScript)"
                    className="border-none focus-visible:ring-0 bg-transparent text-[#221610] placeholder:text-gray-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#ec5b13] hover:bg-[#d44f10] text-white px-8 py-3 rounded-xl font-bold transition-all w-full md:w-auto"
                >
                  Search
                </Button>
              </div>

              {/* Filters */}
              <HeroFilters
                categories={categories}
                categoryValue={categoryValue}
                ratingValue={ratingValue}
                onCategoryChange={(value) =>
                  setCategory(value === "all" ? "" : value)
                }
                onRatingChange={(value) =>
                  setRating(value === "all" ? "" : value)
                }
              />
            </form>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute -top-10 -right-10 w-56 md:w-64 h-56 md:h-64 bg-[#ec5b13]/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-10 -left-10 w-40 md:w-48 h-40 md:h-48 bg-[#ec5b13]/10 rounded-full blur-2xl" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#ec5b13]/20 aspect-video bg-gray-200">
              <Image
                src={hero_img}
                alt="Tutor and student"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
