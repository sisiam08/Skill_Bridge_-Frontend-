export type AvailabilityType = {
  id?: string;
  tutorId?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive?: boolean;
};

export type UpdateAvailabilityType = {
  id: string;
  startTime: string;
  endTime: string;
};
