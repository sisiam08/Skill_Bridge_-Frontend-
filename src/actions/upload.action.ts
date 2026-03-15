"use server";

import { UploadService } from "@/services/upload.service";

export const uploadImage = async (file: File) => {
  const { data, error } = await UploadService.uploadImage(file);


  return { data, error };
};
