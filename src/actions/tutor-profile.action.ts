"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { env } from "@/env";
import { UserService } from "@/services/user.service";
import { CreateTutorProfilePayload, TutorProfile } from "@/types";

type TutorProfileApiResponse = {
  success: boolean;
  message: string;
  data: TutorProfile | null;
};

type TutorListApiResponse = {
  success: boolean;
  message: string;
  data?: {
    data?: TutorProfile[];
  };
};

export const getMyTutorProfile = async (): Promise<TutorProfileApiResponse> => {
  try {
    const session = await UserService.getSession();
    const userId = session?.data?.user?.id;

    if (!userId) {
      return {
        success: false,
        message: "User session not found",
        data: null,
      };
    }

    const url = new URL(`${env.API_URL}/tutors`);
    url.searchParams.set("limit", "500");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    const result = (await response.json()) as TutorListApiResponse;
    const tutors = result?.data?.data ?? [];
    const myProfile = tutors.find((item) => item.user?.id === userId) ?? null;

    return {
      success: true,
      message: myProfile ? "Tutor profile found" : "Tutor profile not found",
      data: myProfile,
    };
  } catch {
    return {
      success: false,
      message: "Failed to get tutor profile",
      data: null,
    };
  }
};

export const createTutorProfile = async (
  payload: CreateTutorProfilePayload,
): Promise<TutorProfileApiResponse> => {
  try {
    const session = await UserService.getSession();
    const userId = session?.data?.user?.id;

    if (!userId) {
      return {
        success: false,
        message: "User session not found",
        data: null,
      };
    }

    const cookieStore = await cookies();
    const cookie = cookieStore.toString();

    const response = await fetch(`${env.API_URL}/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify({
        ...payload,
        userId,
      }),
    });

    const result = (await response.json()) as TutorProfileApiResponse;

    if (result.success) {
      revalidatePath("/tutor-dashboard/tutor-profile");
    }

    return {
      success: result.success,
      message: result.message,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed to create tutor profile",
      data: null,
    };
  }
};
