"use client";
import { getAllTutors } from "@/actions/tutor.action";
import Pagination from "@/components/layout/Pagination";
import FiltersSidebar from "@/components/modules/Tutor/FilterSidebar";
import TutorCard from "@/components/layout/TutorCard";
import { Filters, PaginationType, TutorCardProps } from "@/types";
import { useState, useEffect, type ComponentProps } from "react";
import Sorting from "@/components/layout/Sorting";

export default function TutorsPage() {
  const [filters, setFilters] = useState<Filters>({
    search: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    rating: undefined,
    availability: undefined,
    sortBy: undefined,
    sortOrder: undefined,
    page: "1",
    limit: "10",
  });

  const [tutors, setTutors] = useState<{
    data: TutorCardProps[];
    pagination: PaginationType;
  }>({
    data: [],
    pagination: {
      totalData: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  });

  useEffect(() => {
    const fetchTutors = async () => {
      const { data } = await getAllTutors(filters, { revalidate: 10 });
      if (data) {
        setTutors(data);
      }
    };
    fetchTutors();
  }, [filters]);

  const { totalData }: PaginationType = tutors.pagination;

  const handlePageChange = (nextPage: number) => {
    if (
      nextPage < 1 ||
      nextPage > tutors.pagination.totalPages ||
      nextPage === tutors.pagination.page
    ) {
      return;
    }

    setFilters((prev) => ({
      ...prev,
      page: String(nextPage),
    }));
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <FiltersSidebar filters={filters} setFilters={setFilters} />

        <div className="flex-1">
          <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm font-medium text-slate-500">
              Showing{" "}
              <span className="text-slate-900 dark:text-slate-100 font-bold">
                {totalData}
              </span>{" "}
              <span className="inline-block">
                {totalData > 1 ? "tutors" : "tutor"}
              </span>
            </p>

            <Sorting filters={filters} setFilters={setFilters} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tutors?.data?.map((tutor) => (
              <TutorCard key={tutor.id} {...tutor} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            paginationInfo={tutors.pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
