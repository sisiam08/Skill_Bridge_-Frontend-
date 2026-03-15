import { env } from "@/env";
import {
  Filters,
  ServiceOptions,
  TutorProfile,
  TutorProfileCreateData,
} from "@/types";
import { getWeek } from "date-fns";
import { cookies } from "next/headers";
import { set } from "zod";

const API_URL = env.API_URL;

export const TutorService = {
  getAllTutors: async function (params?: Filters, options?: ServiceOptions) {
    try {
      const url = new URL(`${API_URL}/tutors`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["tutors"] };

      const res = await fetch(url.toString(), config);

      const data = res.json();

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

  getTutorById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/tutors/${id}`);

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getTutorProfile: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors/profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  createTutorProfile: async function (
    tutorProfileData: TutorProfileCreateData,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(tutorProfileData),
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to create tutor profile" },
        };
      }

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  updateTutorProfile: async function (
    tutorProfileData: TutorProfileCreateData,
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(tutorProfileData),
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to update tutor profile" },
        };
      }

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  setDefaultClassLink: async function (defaultClassLink: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors/defaultClassLink`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ defaultClassLink }),
      });


      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getDefaultClassLink: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors/defaultClassLink`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  sendClassLink: async (bookingId: string, classLink: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors/${bookingId}/classLink`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ classLink }),
      });

      const data = await res.json();

      return {
        data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error.message || "Something went wrong!" },
      };
    }
  },

  getTutorStats: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors/stats`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getWeeklyEarnings: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors/weeklyEarnings`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
