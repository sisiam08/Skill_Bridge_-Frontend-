"use server";

import { CategoryService } from "@/services/category.service";

export const getcategory = async () => {
  const { data } = await CategoryService.getCategories();

  return data;
};
