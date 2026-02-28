import { Button } from "@/components/ui/button";
import { PaginationProps } from "@/types";

const getPageNumbers = (current: number, total: number) => {
  if (total <= 1) return [];

  const pages = [1];

  // left ellipsis
  if (current > 2) pages.push(-1);

  for (let i = current - 1; i <= current + 1; i++) {
    if (i > 1 && i < total) pages.push(i);
  }

  // right ellipsis
  if (current < total - 1) pages.push(-2);

  if (total > 1) pages.push(total);

  return [...new Set(pages)];
};

export default function Pagination({
  paginationInfo,
  onPageChange,
}: PaginationProps) {
  const { page, totalPages } = paginationInfo;

  if (!totalPages || totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous */}
      <Button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex size-10 items-center justify-center rounded-lg border border-primary/10 bg-white transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background-dark"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </Button>

      {/* Pages */}
      {pageNumbers.map((num, index) => {
        if (num < 0) {
          return (
            <span key={`ellipsis-${index}`} className="px-1 text-slate-400">
              ...
            </span>
          );
        }

        const isActive = num === page;

        return (
          <Button
            key={num}
            type="button"
            disabled={isActive}
            onClick={() => onPageChange(num)}
            className={
              isActive
                ? "flex size-10 items-center justify-center rounded-lg bg-primary font-bold text-white disabled:cursor-default disabled:opacity-100"
                : "flex size-10 items-center justify-center rounded-lg border border-primary/10 bg-white transition-colors hover:bg-primary/5 dark:bg-background-dark"
            }
          >
            {num}
          </Button>
        );
      })}

      {/* Next */}
      <Button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex size-10 items-center justify-center rounded-lg border border-primary/10 bg-white transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background-dark"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </Button>
    </div>
  );
}
