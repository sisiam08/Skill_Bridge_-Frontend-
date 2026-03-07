"use server";

import { UserService } from "@/services/user.service";
import { UserUpdate } from "@/types";

export const getSession = async () => {
  const session = await UserService.getSession();
  return session;
};

export const updateUser = async (userData: UserUpdate) => {
  const { data } = await UserService.updateUser(userData);
  return { data };
};
