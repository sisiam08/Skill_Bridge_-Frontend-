export type Filters = {
  search?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
  rating?: string | undefined;
  availability?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
  page?: string | undefined;
  limit?: string | undefined;
};

export type FiltersStateProp = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export type PaginationType = {
  totalData: number;
  page: number;
  limit: number;
  totalPages: number;
};


export type PaginationProps = {
  paginationInfo: PaginationType;
  onPageChange: (page: number) => void;
};