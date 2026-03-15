import { User } from "better-auth";

export type TutorBookingSession = {
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
    role: string;
  };
};

export type StudentBookings = {
  id: string;
  studentId: string;
  tutorId: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  price: number;
  status: string;
  classLink: string;
  tutor: {
    id: string;
    user: {
      name: string;
      email: string;
      role: string;
    };
    category: {
      name: string;
    };
  };
  reviews?: {
    rating: number;
    comment: string;
  };
};

export type SessionCardBooking = StudentBookings | TutorBookingSession;
