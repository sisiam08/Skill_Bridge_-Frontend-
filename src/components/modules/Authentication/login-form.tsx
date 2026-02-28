"use client";

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
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email("Invalid email!"),
  password: z.string().min(8, "Minimum length is 8!"),
});

export default function LoginForm() {
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Logging...");

      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (error?.code === "EMAIL_NOT_VERIFIED") {
          toast.warning("Please verify your email first!");
          setVerificationEmail(value.email);
          setShowVerifyButton(true);
          return;
        }

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Login successful!", {
          id: toastId,
        });
        router.push("/");
      } catch (error: any) {
        toast.error(error.message, { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Card className="mx-auto my-6 max-w-150 lg:px-6">
      <CardHeader>
        <CardTitle className="text-3xl font-black text-[#ec5b13]  dark:text-white mb-2">
          Welcome back
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          Fill in your details to learn more skills
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

          <FieldGroup>
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
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-5 justify-end ">
        <Button
          form="sign-up"
          type="submit"
          disabled={loading}
          className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white font-bold rounded-xl shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {loading ? "Logging..." : "Login"}
        </Button>
        {showVerifyButton && (
          <Button
            type="button"
            onClick={() =>
              authClient.sendVerificationEmail({
                email: verificationEmail,
                callbackURL: "http://localhost:3000",
              })
            }
            className="bg-transparent p-0 text-primary hover:bg-transparent hover:underline shadow-none"
          >
            Resend Verification Email
          </Button>
        )}
        <p className="text-sm">or</p>
        <Button
          type="submit"
          onClick={handleGoogleLogin}
          className="w-full bg-[#c47852] hover:bg-[#d44f10] text-white dark:text-black font-bold rounded-xl shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          Log in with google
        </Button>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?
            <Link
              className="text-[#ee7031] hover:text-[#d44f10] font-bold hover:underline ml-1"
              href="/register"
            >
              Register
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
