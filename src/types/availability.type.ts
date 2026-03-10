export type AvailabilityType = {
  id?: string;
  tutorId?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive?: boolean;
};
