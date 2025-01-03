"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/actions/users";
import { FormCard } from "@/components/form-card";
import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { GoogleLoginButton } from "../_components/google-login-button";
import { OrSeparator } from "../_components/or-separator";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      login(values).then(({ success, error }) => {
        if (success) {
          router.push(DEFAULT_LOGIN_REDIRECT);
          router.refresh();
        } else {
          toast.error(error);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormCard className="mx-auto w-full max-w-md">
          <h2 className="text-lg font-semibold">Login to your account</h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} autoFocus placeholder="Enter Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput disabled={isPending} placeholder="Enter Your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton isLoading={isPending}>Login</LoadingButton>
          <OrSeparator />
          <GoogleLoginButton disabled={isPending}/>
          <div className="text-center">
            Do not have an account?{" "}
            <Link href="/register" className="text-blue-500 underline">
              Register
            </Link>
          </div>
        </FormCard>
      </form>
    </Form>
  );
};

export default LoginPage;
