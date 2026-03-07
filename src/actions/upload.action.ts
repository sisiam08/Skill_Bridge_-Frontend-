"use server";

import { UploadService } from "@/services/upload.service";
import { success } from "zod";

export const uploadImage = async (file: File) => {
  const { data } = await UploadService.uploadImage(file);

  // console.log(data);

  return {success: data?.success, 
    message: data?.message,
    url: data?.data?.url};
};
