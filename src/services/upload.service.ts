import { env } from "@/env";

const API_URL = env.API_URL;

export const UploadService = {
  uploadImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_URL}/uploads`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        return {
          data: null,
          error: { message: data?.message || "Upload unsuccessful" },
        };
      }

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Failed to upload image!" },
      };
    }
  },
};
