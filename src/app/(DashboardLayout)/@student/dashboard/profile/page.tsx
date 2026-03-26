"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, Camera, PencilLine, Save, UserRound } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as z from "zod";
import default_avatar from "../../../../../../public/default-avatar-profile.jpg";
import { toast } from "@/components/ui/sonner";
import { useForm } from "@tanstack/react-form";
import { getSession, updateUser } from "@/actions/user.action";
import { uploadImage } from "@/actions/upload.action";
import { authClient } from "@/lib/auth-client";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BD_PHONE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/;

const StudentAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine(
      (val) => val === "" || val === "01XXXXXXXXX" || BD_PHONE_REGEX.test(val),
      "Please enter a valid phone number",
    ),
});

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    default_avatar.src,
  );

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("tutor name");
  const [email, setEmail] = useState("tutor email");
  const [mainEmail, setMainEmail] = useState("");
  const [phone, setPhone] = useState("01XXXXXXXXX");
  const [role, setRole] = useState("TUTOR");
  const [status, setStatus] = useState("UNBAN");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFileRef = useRef<File | null>(null);

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
    })();
  }, []);

  const form = useForm({
    defaultValues: {
      name: name,
      email: email,
      phone: phone,
    },
    validators: { onSubmit: StudentAccountSchema },
    onSubmit: async ({ value }) => {
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

        if (!response?.data) {
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
            <CardTitle className="ui-title-panel">Student Profile</CardTitle>
            <CardDescription>Student information.</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(true);
                form.setFieldValue("name", name);
                form.setFieldValue("email", email);
                form.setFieldValue("phone", phone);
              }}
            >
              <PencilLine className="mr-2 size-4" suppressHydrationWarning />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="size-4 text-brand" suppressHydrationWarning />
            Account details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            id="profileForm"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
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
                  disabled={!isEditing}
                />
                {isEditing ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!isEditing}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="mr-2 size-4" suppressHydrationWarning />
                    Add Profile Picture
                  </Button>
                ) : null}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-3">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Name</Label>
                {isEditing ? (
                  <form.Field
                    name="name"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <Input
                            id="name"
                            value={field.state.value}
                            disabled={!isEditing}
                            onChange={(e) => field.handleChange(e.target.value)}
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
                {isEditing ? (
                  <form.Field
                    name="email"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <Input
                            id="email"
                            type="email"
                            value={field.state.value}
                            disabled={!isEditing}
                            onChange={(e) => field.handleChange(e.target.value)}
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
                {isEditing ? (
                  <form.Field
                    name="phone"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <Input
                            id="phone"
                            type="tel"
                            value={field.state.value ?? "01XXXXXXXXX"}
                            disabled={!isEditing}
                            onChange={(e) => field.handleChange(e.target.value)}
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
        <CardFooter className="flex justify-center">
          <div className="mt-15 flex flex-wrap justify-center gap-2">
            <Button
              className="bg-brand hover:bg-brand-strong text-white"
              disabled={!isEditing}
              form="profileForm"
              type="submit"
            >
              <Save className="mr-2 size-4" suppressHydrationWarning />
              Save Changes
            </Button>

            <Button
              variant="outline"
              disabled={!isEditing}
              onClick={() => {
                setIsEditing(false);
                selectedFileRef.current = null;
              }}
            >
              Cancel
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
