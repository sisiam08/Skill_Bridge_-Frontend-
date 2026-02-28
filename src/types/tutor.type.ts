export type TutorCardProps = {
  id?: string;
  user?: {
    name?: string;
    image?: string | null;
  };
  category?: {
    name?: string;
  };
  totalRating?: number;
  totalReview?: number;
  hourlyRate?: number;
  bio?: string;
};
