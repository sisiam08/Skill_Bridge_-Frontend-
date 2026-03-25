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
import { Categories, TutorProfile } from "@/types";
import { getcategory } from "@/actions/category.action";
import {
  createTutorProfile,
  getTutorProfile,
  updateTutorProfile,
} from "@/actions/tutor.action";
import { getSession, updateUser } from "@/actions/user.action";
import default_avatar from "../../../../../../public/default-avatar-profile.jpg";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError } from "@/components/ui/field";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/actions/upload.action";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  PencilLine,
  Save,
  UserRound,
} from "lucide-react";

const TutorProfileSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  bio: z.string().max(255, "Bio must be at most 255 characters"),
  experienceYears: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num >= 0;
  }, "Experience years must be greater than or equal to 0"),
  hourlyRate: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num >= 0;
  }, "Hourly rate must be a non-negative number"),
});

const BD_PHONE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/;

const TutorAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .refine(
      (val) => val === "" || val === "01XXXXXXXXX" || BD_PHONE_REGEX.test(val),
      "Please enter a valid phone number",
    ),
});

export default function TutorProfilePage() {
  const [hasTutorProfile, setHasTutorProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    typeof default_avatar === "string" ? default_avatar : default_avatar.src,
  );

  const [categories, setCategories] = useState<Categories[]>([]);
  // console.log(categories);

  const [tutorData, setTutorData] = useState<TutorProfile>();
  // console.log(tutorData);

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("tutor name");
  const [email, setEmail] = useState("tutor email");
  const [mainEmail, setMainEmail] = useState("");
  const [phone, setPhone] = useState("01XXXXXXXXX");
  const [role, setRole] = useState("TUTOR");
  const [status, setStatus] = useState("UNBAN");

  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFileRef = useRef<File | null>(null);

  const isProfileFormEditMode = isEditing || isCreating;
  const isProfileFormDisableMode = !isProfileFormEditMode;
  const isAccountFormEditMode = isEditing;
  const isAccountFormDisableMode = !isAccountFormEditMode;

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session?.data?.user) return;

      setUserId(session.data.user.id);
      setName(session?.data?.user?.name || "tutor name");
      setEmail(session?.data?.user?.email || "tutor email");
      setMainEmail(session?.data?.user?.email);
      setPhone(session?.data?.user?.phone || "01XXXXXXXXX");
      setRole(session?.data?.user?.role || "TUTOR");
      setStatus(session?.data?.user?.status || "UNBAN");
      if (session?.data?.user.image) {
        const imageUrl = session.data.user.image;
        setProfileImagePreview(imageUrl);
      }

      const tutorResponse = await getTutorProfile();
      const categoriesResponse = await getcategory();

      const profileData = tutorResponse?.data.data ?? null;
      setTutorData(profileData ?? undefined);

      setCategories(categoriesResponse?.data.data || []);

      if (profileData) {
        setHasTutorProfile(true);

        setCategory(profileData.category?.name || "");
        setBio(profileData.bio || "");
        setExperienceYears(profileData.experienceYears?.toString() || "");
        setHourlyRate(profileData.hourlyRate?.toString() || "");
      }
    })();
  }, []);

  const profileForm = useForm({
    defaultValues: {
      categoryId: "",
      bio: "",
      experienceYears: "",
      hourlyRate: "",
    },
    validators: { onChange: TutorProfileSchema },
    onSubmit: async ({ value }) => {
      const tutorProfileData = {
        userId: userId,
        categoriesId: value.categoryId,
        bio: value.bio,
        experienceYears: Number(value.experienceYears),
        hourlyRate: Number(value.hourlyRate),
      };

      try {
        if (isCreating) {
          const toastId = toast.loading("Creating profile...");
          const response = await createTutorProfile(tutorProfileData);
          if (response.error || !response.data) {
            toast.error(response.error?.message || "Failed to create profile", {
              id: toastId,
            });
            return;
          }

          const freshProfile = await getTutorProfile();
          const profileData = freshProfile?.data ?? null;
          setTutorData(profileData ?? undefined);

          if (profileData) {
            setCategory(profileData.category?.name || "");
            setBio(profileData.bio || "");
            setExperienceYears(profileData.experienceYears?.toString() || "");
            setHourlyRate(profileData.hourlyRate?.toString() || "");
          }

          setHasTutorProfile(true);
          setIsCreating(false);

          toast.success("Profile created successfully!", { id: toastId });
        } else {
          const profileChanged =
            value.categoryId !== tutorData?.categoriesId ||
            value.bio !== tutorData?.bio ||
            value.experienceYears !== tutorData?.experienceYears?.toString() ||
            value.hourlyRate !== tutorData?.hourlyRate?.toString();

          if (!profileChanged) {
            setIsEditing(false);
            return;
          }

          const toastId = toast.loading("Saving changes...");
          const response = await updateTutorProfile(tutorProfileData);
          if (response.error || !response.data) {
            toast.error(response.error?.message || "Failed to update profile", {
              id: toastId,
            });
            return;
          }

          const freshProfile = await getTutorProfile();
          const profileData = freshProfile?.data ?? null;
          setTutorData(profileData ?? undefined);
          if (profileData) {
            setCategory(profileData.category?.name || "");
            setBio(profileData.bio || "");
            setExperienceYears(profileData.experienceYears?.toString() || "");
            setHourlyRate(profileData.hourlyRate?.toString() || "");
          }
          setIsEditing(false);
          toast.success("Changes saved successfully!", { id: toastId });
        }
      } catch (error) {
        toast.error("An error occurred.");
      }
    },
  });

  const accountForm = useForm({
    defaultValues: {
      name: name,
      email: email,
      phone: phone,
    },
    validators: { onChange: TutorAccountSchema },
    onSubmit: async ({ value }) => {
      // console.log(value);

      const accountChanged =
        value.name !== name ||
        value.email !== mainEmail ||
        value.phone !== phone ||
        selectedFileRef.current !== null;

      if (!accountChanged) {
        setIsEditing(false);
        return;
      }

      const updatedData: { name: string; phone: string; image?: string } = {
        name: value.name,
        phone: value.phone,
      };

      const toastId = toast.loading("Saving your profile changes...");

      try {
        if (selectedFileRef.current) {
          const response = await uploadImage(selectedFileRef.current);

          if (response.error || !response.data) {
            toast.error(
              response.error?.message ||
                "Unable to upload profile image. Please try again.",
              { id: toastId },
            );
            return;
          }

          updatedData.image = response.data?.data?.url;
          toast.success("Profile image uploaded successfully", {
            id: toastId,
            duration: 2000,
          });
        }

        const response = await updateUser(updatedData);

        if (value.email !== mainEmail) {
          const response = await authClient.changeEmail({
            newEmail: value.email,
            callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`,
          });

          if (response.error) {
            toast.error(
              response.error.message ||
                "Failed to change email. Please check and try again.",
              { id: toastId },
            );
            return;
          }

          toast.success(
            "A verification email has been sent to your new email address. Your email will be updated once verified.",
            { id: toastId },
          );
          return;
        }

        if (response.error || !response.data) {
          toast.error("Failed to save profile changes. Please try again.", {
            id: toastId,
          });
          return;
        }

        setName(value.name);
        setPhone(value.phone);
        if (updatedData.image) setProfileImagePreview(updatedData.image);
        selectedFileRef.current = null;
        setIsEditing(false);
        toast.success("Profile updated successfully!", { id: toastId });
      } catch (error) {
        toast.error(
          "Something went wrong while saving your profile. Please try again.",
          { id: toastId },
        );
      }
    },
  });

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    selectedFileRef.current = file;
    setProfileImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card className="overflow-hidden border-border/70 bg-linear-to-r from-orange-50 via-white to-amber-50 dark:from-card dark:via-card dark:to-card">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="ui-title-panel">Tutor Profile</CardTitle>
            <CardDescription>Tutor information.</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              disabled={!hasTutorProfile}
              onClick={() => {
                setIsCreating(false);
                setIsEditing(true);
                accountForm.setFieldValue("name", name);
                accountForm.setFieldValue("email", email);
                accountForm.setFieldValue("phone", phone);
                if (tutorData) {
                  profileForm.setFieldValue(
                    "categoryId",
                    tutorData.categoriesId || "",
                  );
                  profileForm.setFieldValue("bio", tutorData.bio || "");
                  profileForm.setFieldValue(
                    "experienceYears",
                    tutorData.experienceYears?.toString() || "",
                  );
                  profileForm.setFieldValue(
                    "hourlyRate",
                    tutorData.hourlyRate?.toString() || "",
                  );
                }
              }}
            >
              <PencilLine className="mr-2 size-4" suppressHydrationWarning />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound
                className="size-4 text-brand"
                suppressHydrationWarning
              />
              Account details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form>
              <div className="flex flex-col items-center gap-3 mb-3">
                <Avatar className="size-24 sm:size-28">
                  <AvatarImage src={profileImagePreview} />
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
                      <Camera
                        className="mr-2 size-4"
                        suppressHydrationWarning
                      />
                      Add Profile Picture
                    </Button>
                  ) : null}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-3">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="name">Name</Label>
                  {isAccountFormEditMode ? (
                    <accountForm.Field
                      name="name"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field>
                            <Input
                              id="name"
                              value={field.state.value}
                              disabled={isAccountFormDisableMode}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
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
                    <accountForm.Field
                      name="email"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field>
                            <Input
                              id="email"
                              type="email"
                              value={field.state.value}
                              disabled={isAccountFormDisableMode}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
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
                    <accountForm.Field
                      name="phone"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field>
                            <Input
                              id="phone"
                              type="tel"
                              value={field.state.value ?? "01XXXXXXXXX"}
                              disabled={isAccountFormDisableMode}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  ) : (
                    <p className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                      {phone || "01XXXXXXXXX"}
                    </p>
                  )}
                </div>
              </div>
            </form>

            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Role</p>
                <Badge className="bg-brand text-white hover:bg-brand">
                  {role}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Status</p>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BadgeCheck className="size-3.5" suppressHydrationWarning />
                  {status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <BriefcaseBusiness
                  className="size-4 text-brand"
                  suppressHydrationWarning
                />
                Professional profile details
              </CardTitle>
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
              <form
                id="profileForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  profileForm.handleSubmit();
                }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    {isProfileFormEditMode ? (
                      <profileForm.Field
                        name="categoryId"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field>
                              <Select
                                disabled={isProfileFormDisableMode}
                                value={field.state.value}
                                onValueChange={(value) =>
                                  field.handleChange(value)
                                }
                              >
                                <SelectTrigger id="category" className="w-full">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">
                                    All Categories
                                  </SelectItem>
                                  {categories.map((cat) => (
                                    <SelectItem
                                      key={cat.id}
                                      value={cat.id || ""}
                                    >
                                      {cat.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />
                    ) : (
                      <p className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                        {category}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (Years)</Label>
                    {isProfileFormEditMode ? (
                      <profileForm.Field
                        name="experienceYears"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field>
                              <Input
                                id="experience"
                                type="number"
                                placeholder="year"
                                value={field.state.value}
                                disabled={isProfileFormDisableMode}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
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
                      <profileForm.Field
                        name="hourlyRate"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field>
                              <Input
                                id="hourly-rate"
                                type="number"
                                placeholder="tk"
                                value={field.state.value}
                                disabled={isProfileFormDisableMode}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
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
                    <profileForm.Field
                      name="bio"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field>
                            <Textarea
                              id="bio"
                              value={field.state.value}
                              placeholder="write here..."
                              rows={5}
                              className="flex min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              disabled={isProfileFormDisableMode}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  ) : (
                    <p className="min-h-28 whitespace-pre-wrap rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium leading-relaxed">
                      {bio}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="mt-15 flex flex-wrap justify-center gap-2">
                  {isCreating ? (
                    <Button
                      className="bg-brand hover:bg-brand-strong text-white"
                      disabled={isProfileFormDisableMode}
                      form="profileForm"
                      type="submit"
                    >
                      Create Profile
                    </Button>
                  ) : (
                    <Button
                      className="bg-brand hover:bg-brand-strong text-white"
                      disabled={isProfileFormDisableMode}
                      form="profileForm"
                      type="submit"
                      onClick={() => {
                        accountForm.handleSubmit();
                        profileForm.handleSubmit();
                      }}
                    >
                      <Save className="mr-2 size-4" suppressHydrationWarning />
                      Save Changes
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    disabled={isProfileFormDisableMode}
                    onClick={() => {
                      setIsEditing(false);
                      setIsCreating(false);
                      selectedFileRef.current = null;
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex justify-center py-6">
                <Button
                  className="bg-brand hover:bg-brand-strong text-white"
                  onClick={() => {
                    setIsEditing(false);
                    setIsCreating(true);
                  }}
                >
                  <PencilLine
                    className="mr-2 size-4"
                    suppressHydrationWarning
                  />
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
