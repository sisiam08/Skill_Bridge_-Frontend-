"use server";

import { TutorService } from "@/services/tutor.service";
import { Filters, ServiceOptions, TutorProfileCreateData } from "@/types";
import { updateTag } from "next/cache";

export const getAllTutors = async (
  params?: Filters,
  options?: ServiceOptions,
) => {
  const { data, error } = await TutorService.getAllTutors(params, options);
  updateTag("tutors");

  return {  data, error };
};

export const getTutorById = async (id: string) => {
  const { data, error } = await TutorService.getTutorById(id);
  return { data, error };
};

export const getTutorProfile = async () => {
  const { data, error } = await TutorService.getTutorProfile();
  return { data, error };
};

export const createTutorProfile = async (tutorData: TutorProfileCreateData) => {
  const { data, error } = await TutorService.createTutorProfile(tutorData);
  return { data, error };
};

export const updateTutorProfile = async (tutorData: TutorProfileCreateData) => {
  const { data, error } = await TutorService.updateTutorProfile(tutorData);
  return { data, error };
};

export const setDefaultClassLink = async (defaultClassLink: string) => {
  const { data, error } =
    await TutorService.setDefaultClassLink(defaultClassLink);
  return { data, error };
};

export const getDefaultClassLink = async () => {
  const { data, error } = await TutorService.getDefaultClassLink();
  return { data, error };
};

export const sendClassLink = async (bookingId: string, classLink: string) => {
  const { data, error } = await TutorService.sendClassLink(
    bookingId,
    classLink,
  );
  return { data, error };
};

export const getTutorStats = async () => {
  const { data, error } = await TutorService.getTutorStats();
  return { data, error };
};

export const getWeeklyEarnings = async () => {
  const { data, error } = await TutorService.getWeeklyEarnings();
  return { data, error };
};
