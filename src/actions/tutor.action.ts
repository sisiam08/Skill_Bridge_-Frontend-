"use server";

import { TutorService } from "@/services/tutor.service";
import { Filters, ServiceOptions } from "@/types";
import { updateTag } from "next/cache";

export const getAllTutors = async (
  params?: Filters,
  options?: ServiceOptions,
) => {
  const { data } = await TutorService.getAllTutors(params, options);
  updateTag("tutors")

  return data;
};
