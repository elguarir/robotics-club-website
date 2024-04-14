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
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function SignInForm() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: FormValues) => {
    await login.mutateAsync(values, {
      onError: (error) => {
         console.log("err-error", error);
      },
      onSuccess: (data) => {
        console.log("success-data", data);
      },
      onSettled: (data, err) => {
        console.log("settled-data", data);
        console.log("settled-err", err)
      }
    });
  };

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
                  <Input placeholder="email@example.com" {...field} />
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
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <Callout showCloseButton variant={"danger"}>
              <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
              {error}
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
