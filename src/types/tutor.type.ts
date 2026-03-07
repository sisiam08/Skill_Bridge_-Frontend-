export type TutorCardProps = {
  id?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string | null;
  };
  category?: {
    id?: string;
    name?: string;
  };
  totalRating?: number;
  totalReview?: number;
  hourlyRate?: number;
  bio?: string;
};

export type TutorProfile = {
  id: string;
  userId: string;
  categoriesId: string;
  bio?: string | null;
  hourlyRate: number;
  experienceYears: number;
  totalRating: number;
  totalReviews: number;
  totalCompletedBookings: number;
  user?: {
    id: string;
    name?: string;
    email?: string;
    image?: string | null;
    phone?: string | null;
    role?: string;
    status?: string;
  };
  category?: {
    id?: string;
    name?: string;
  };
};


export type TutorProfileCreateData = {
  userId: string;
  categoriesId: string;
  bio?: string | null;
  hourlyRate: number;
  experienceYears: number;
};

export type TutorProfileUpdateData = {
  userId: string;
  categoriesId: string;
  bio?: string | null;
  hourlyRate: number;
  experienceYears: number;
}