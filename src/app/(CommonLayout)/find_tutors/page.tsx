"use client";
import { getAllTutors } from "@/actions/tutor.action";
import Pagination from "@/components/layout/Pagination";
import FiltersSidebar from "@/components/modules/Tutor/FilterSidebar";
import TutorCard from "@/components/modules/Tutor/TutorCard";
import { Filters } from "@/types";
import { useState, useEffect } from "react";

export default function TutorsPage() {
  const [filters, setFilters] = useState<Filters>({
    search: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    rating: undefined,
    availability: undefined,
  });

  const [tutors, setTutors] = useState({ data: [], pagination: {} });

  useEffect(() => {
    const fetchTutors = async () => {
      const { data } = await getAllTutors(filters, {revalidate:10});
      setTutors(data);
    };
    fetchTutors();
  }, [filters]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <FiltersSidebar filters={filters} setFilters={setFilters} />

        <div className="flex-1">
          

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tutors?.data?.map((tutor: any) => (
              <TutorCard key={tutor.id} {...tutor} />
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
