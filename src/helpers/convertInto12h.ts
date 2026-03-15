import { format, parse } from "date-fns";

export const convertInto12h = (time: string) => {
  return format(parse(time, "HH:mm", new Date()), "hh:mm a");
};
