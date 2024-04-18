"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState } from "react";
import Callout from "./ui/callout";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { BarLoader } from "react-spinners";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function SignInForm() {
  const { login, user, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    login.mutate(values, {
      onError: (error: Error | any) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || error.message);
          return;
        }
      },
      onSuccess: () => {
        setError(null),
          toast.success("Logged in successfully, redirecting...", {
            position: "bottom-left",
          });
        router.push("/dashboard");
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-60 gap-3">
        <BarLoader color="#3d3d3d" />
        <p className="text-sm font-[450]">Loading...</p>
      </div>
    );

  if (user) {
    router.push("/dashboard");
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="grid gap-4" disabled={login.isPending}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    placeholder="email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
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
                  <Input
                    autoComplete="current-password"
                    type="password"
                    placeholder="••••••"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <Callout showCloseButton variant={"danger"}>
              <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
              <p className="font-[450]">{error}</p>
            </Callout>
          )}
          <Button
            isLoading={login.isPending}
            loadingText="Logging in..."
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
