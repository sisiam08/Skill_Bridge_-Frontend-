"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function TutorProfileClient() {
  // UI-only state for design preview (no data fetching)
  const [hasTutorProfile, setHasTutorProfile] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(
    "/default-avatar-profile.jpg",
  );

  const [name, setName] = useState("Tutor Name");
  const [email, setEmail] = useState("tutor@email.com");
  const [phone, setPhone] = useState("+8801XXXXXXXXX");
  const [category, setCategory] = useState("Mathematics");
  const [experienceYears, setExperienceYears] = useState("3");
  const [hourlyRate, setHourlyRate] = useState("500");
  const [bio, setBio] = useState(
    "Short description about your teaching background...",
  );

  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isProfileFormEditMode = isEditing || isCreating;
  const isProfileFormDisableMode = !isProfileFormEditMode;
  const isAccountFormEditMode = isEditing;
  const isAccountFormDisableMode = !isAccountFormEditMode;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setAvatarPreview(nextPreview);
  };

  const handleStartEdit = () => {
    if (!hasTutorProfile) return;
    setIsCreating(false);
    setIsEditing(true);
  };

  const handleStartCreate = () => {
    setIsEditing(false);
    setIsCreating(true);
  };

  const handleCancelForm = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleSubmitForm = () => {
    if (isCreating) {
      setHasTutorProfile(true);
      setIsCreating(false);
      return;
    }
    setIsEditing(false);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">Tutor Profile</CardTitle>
            <CardDescription>
              Tutor information.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              disabled={!hasTutorProfile}
              onClick={handleStartEdit}
            >
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Account details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="size-30">
                <AvatarImage src={avatarPreview} />
                <AvatarFallback>TP</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={isAccountFormDisableMode}
                />
                {isAccountFormEditMode ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isAccountFormDisableMode}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Add Profile Picture
                  </Button>
                ) : null}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Name</Label>
                {isAccountFormEditMode ? (
                  <Input
                    id="name"
                    value={name}
                    disabled={isAccountFormDisableMode}
                    onChange={(event) => setName(event.target.value)}
                  />
                ) : (
                  <p className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                    {name}
                  </p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                {isAccountFormEditMode ? (
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled={isAccountFormDisableMode}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                ) : (
                  <p className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                    {email}
                  </p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Phone</Label>
                {isAccountFormEditMode ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    disabled={isAccountFormDisableMode}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                ) : (
                  <p className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                    {phone}
                  </p>
                )}
              </div>
            </div>
            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Role</p>
                <Badge>Tutor</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Status</p>
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle>Professional profile details</CardTitle>
              <CardDescription>
                {isCreating
                  ? "Write all tutor information to create your profile."
                  : hasTutorProfile
                  ? "Manage your professional profile."
                  : "Create your professional profile."}
              </CardDescription>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-5">
            {hasTutorProfile || isCreating ? (
              <form>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    {isProfileFormEditMode ? (
                      isMounted ? (
                      <Select
                        disabled={isProfileFormDisableMode}
                        value={category}
                        onValueChange={setCategory}
                      >
                        <SelectTrigger id="category" className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Programming">Programming</SelectItem>
                        </SelectContent>
                      </Select>
                      ) : (
                        <Input value={category} disabled />
                      )
                    ) : (
                      <p className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                        {category}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (Years)</Label>
                    {isProfileFormEditMode ? (
                      <Input
                        id="experience"
                        type="number"
                        value={experienceYears}
                        disabled={isProfileFormDisableMode}
                        onChange={(event) =>
                          setExperienceYears(event.target.value)
                        }
                      />
                    ) : (
                      <p className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                        {experienceYears}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourly-rate">Hourly Rate (tk)</Label>
                    {isProfileFormEditMode ? (
                      <Input
                        id="hourly-rate"
                        type="number"
                        value={hourlyRate}
                        disabled={isProfileFormDisableMode}
                        onChange={(event) => setHourlyRate(event.target.value)}
                      />
                    ) : (
                      <p className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                        {hourlyRate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 my-5">
                  <Label htmlFor="bio">Bio</Label>
                  {isProfileFormEditMode ? (
                    <textarea
                      id="bio"
                      value={bio}
                      rows={5}
                      className="flex min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isProfileFormDisableMode}
                      onChange={(event) => setBio(event.target.value)}
                    />
                  ) : (
                    <p className="min-h-28 whitespace-pre-wrap rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium leading-relaxed">
                      {bio}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="mt-15 flex flex-wrap justify-center gap-2">
                  <Button
                    className="bg-[#ec5b13] hover:bg-[#d44f10] text-white"
                    disabled={isProfileFormDisableMode}
                    onClick={handleSubmitForm}
                  >
                    {isCreating ? "Create Profile" : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    disabled={isProfileFormDisableMode}
                    onClick={handleCancelForm}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex justify-center py-6">
                <Button
                  className="bg-[#ec5b13] hover:bg-[#d44f10] text-white"
                  onClick={handleStartCreate}
                >
                  Create Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
