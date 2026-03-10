import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import default_avatar from "../../.././public/default-avatar-profile.jpg";
import Image from "next/image";
import { TutorCardProps } from "@/types";

export default function TutorCard({
  user,
  category,
  totalRating = 0,
  totalReview = 0,
  hourlyRate = 0,
  bio = "",
}: TutorCardProps) {
  const averageRating = totalReview > 0 ? totalRating / totalReview : 0;

  console.log("User Image: ", user?.image);

  return (
    <Card className={"group overflow-hidden"}>
      <CardHeader className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-30 w-30 shrink-0 overflow-hidden rounded-full sm:h-48 sm:w-48">
            <Image
              src={user?.image || default_avatar}
              alt={user?.name ?? "Tutor"}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <CardTitle>{user?.name ?? "Unknown Tutor"}</CardTitle>
          <div className="flex items-center gap-2 text-amber-500">
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="text-sm font-bold">
              {averageRating.toFixed(1)}
            </span>
          </div>
        </div>
        <CardDescription>{category?.name ?? "General"}</CardDescription>
        <p className="mb-2 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
          {bio}
        </p>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">{hourlyRate}</span>
            <span className="text-xs text-slate-500">tk/hr</span>
          </div>

          <Button className="cursor-pointer">View Profile</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
