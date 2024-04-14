"use client";
import { SignInForm } from "@/components/SignInForm";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  let { user, isLoading } = useAuth();
  useEffect(() => {
    console.log("user", user);

  }, [user, isLoading]);
  return (
    <main className="relative w-full h-full">
      <div className="w-full h-full min-h-screen lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center h-full py-12 max-lg:min-h-screen">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-left">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <SignInForm />
            <div className="mt-0 text-sm font-[450] text-center">
              You're new here?{" "}
              <Link href="/join-us" className="font-medium underline">
                Join us
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-screen max-lg:hidden">
          <img
            src="/placeholder.svg"
            className="object-cover w-full h-full"
            alt="Image"
          />
        </div>
      </div>
    </main>
  );
}
