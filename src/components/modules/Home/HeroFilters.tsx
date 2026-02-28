"use client";

import { Categories } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HeroFiltersProps = {
  categories: Categories[];
  categoryValue: string;
  ratingValue: string;
  onCategoryChange: (value: string) => void;
  onRatingChange: (value: string) => void;
};

export default function HeroFilters({
  categories,
  categoryValue,
  ratingValue,
  onCategoryChange,
  onRatingChange,
}: HeroFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
      <Select value={categoryValue || undefined} onValueChange={onCategoryChange}>
        <SelectTrigger className="h-auto shadow-none w-37.5 px-4 py-2 text-[#221610] bg-white border border-gray-200 rounded-xl text-xs font-semibold hover:border-[#ec5b13] transition-colors">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={ratingValue || undefined} onValueChange={onRatingChange}>
        <SelectTrigger className="h-auto shadow-none w-37.5 px-4 py-2 text-[#221610] bg-white border border-gray-200 rounded-xl text-xs font-semibold hover:border-[#ec5b13] transition-colors">
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ratings</SelectItem>
          <SelectItem value="5">5 & up</SelectItem>
          <SelectItem value="4">4 & up</SelectItem>
          <SelectItem value="3">3 & up</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
