"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const formSchema = z.object({
  role: z.string().min(1, "Role is required!"),
  name: z.string().min(1, "Full Name is required!"),
  email: z.email("Invalid email!"),
  password: z.string().min(6, "Minimum length is 6!"),
  confirmPassword: z.string().min(6, "Minimum length is 6!"),
});

export default function RegisterForm() {
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };
  const form = useForm({
    defaultValues: {
      role: "student",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const passwordsMatch =
    passwordValue.length > 0 && passwordValue === confirmPasswordValue;
  return (
    <Card className="lg:px-6">
      <CardHeader>
        <CardTitle className="text-3xl font-black text-[#ec5b13]  dark:text-white mb-2">
          Create Account
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          Fill in your details to get started
        </CardDescription>
      </CardHeader>

      <CardContent className="py-6 sm:py-12 flex flex-col justify-center">
        <form
          id="sign-up"
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="role"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      I am joining as a:
                    </FieldLabel>
                    <ToggleGroup
                      type="single"
                      id={field.name}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                      className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-primary/5"
                    >
                      <ToggleGroupItem
                        value="student"
                        className="flex-1  rounded-lg text-sm font-bold data-[state=on]:bg-[#ec5b13] data-[state=on]:text-white"
                      >
                        Student
                      </ToggleGroupItem>

                      <ToggleGroupItem
                        value="tutor"
                        className="flex-1  rounded-lg text-sm font-bold data-[state=on]:bg-[#ec5b13] data-[state=on]:text-white"
                      >
                        Tutor
                      </ToggleGroupItem>
                    </ToggleGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        person
                      </span>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="Enter your full name"
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="pl-10 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        mail
                      </span>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="example@gmail.com"
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="pl-10 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        lock
                      </span>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="••••••••"
                        onChange={(e) => {
                          const v = e.target.value;
                          field.handleChange(v);
                          setPasswordValue(v);
                        }}
                        className="pl-10 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="confirmPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        security
                      </span>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="••••••••"
                        onChange={(e) => {
                          const v = e.target.value;
                          field.handleChange(v);
                          setConfirmPasswordValue(v);
                        }}
                        className="pl-10 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end ">
        <Button
          form="sign-up"
          type="submit"
          disabled={!passwordsMatch}
          className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white dark:text-black font-bold  py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Create Account
        </Button>
        <p className="text-sm">or</p>
        <Button
          type="submit"
          onClick={() => handleGoogleLogin()

          }
          className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white dark:text-black font-bold  py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Continue with google
        </Button>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?
            <Link
              className="text-[#ec5b13] hover:text-[#d44f10] font-bold hover:underline ml-1"
              href="/login"
            >
              Log in
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
