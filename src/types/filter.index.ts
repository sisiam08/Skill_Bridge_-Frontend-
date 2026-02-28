export type Filters = {
  search: string | undefined;
  minPrice: string | undefined;
  maxPrice: string | undefined;
  rating: string | undefined;
  availability: string | undefined;
};

export type FiltersStateProp = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};
