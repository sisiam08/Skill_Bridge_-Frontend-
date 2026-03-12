export type BookingSession = {
  id: string;
  studentId: string;
  tutorId: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  price: number;
  status: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
};