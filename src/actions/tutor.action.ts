"use server";

import { TutorService } from "@/services/tutor.service";
import { Filters, ServiceOptions, TutorProfileCreateData } from "@/types";
import { updateTag } from "next/cache";

export const getAllTutors = async (
  params?: Filters,
  options?: ServiceOptions,
) => {
  const { data } = await TutorService.getAllTutors(params, options);
  updateTag("tutors");

  return data;
};

export const getTutorById = async (id: string) => {
  const { data } = await TutorService.getTutorById(id);
  return data;
};

export const getTutorProfile = async () => {
  const { data } = await TutorService.getTutorProfile();
  return data;
};

export const createTutorProfile = async (tutorData: TutorProfileCreateData) => {
  const { data } = await TutorService.createTutorProfile(tutorData);
  return data;
};

export const updateTutorProfile = async (tutorData: TutorProfileCreateData) => {
  const { data } = await TutorService.updateTutorProfile(tutorData);
  return data;
}