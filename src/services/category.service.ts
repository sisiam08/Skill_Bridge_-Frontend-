import { env } from "@/env";

const API_URL = env.API_URL;

export const CategoryService = {
  getCategories: async function () {
    try {
      const url = new URL(`${API_URL}/categories`);

      const res = await fetch(url.toString(), { cache: "no-store" });

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Somthing went wrong!",
        },
      };
    }
  },
};
