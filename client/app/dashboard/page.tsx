"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <>
      <main className="flex flex-col h-[calc(100vh-64px)] gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div
          className="flex items-center justify-center h-full py-16 border border-dashed rounded-lg shadow-sm"
        >
          <div className="flex flex-col items-center gap-1 text-center text-balance">
            <h3 className="text-2xl lg:text-4xl font-bold tracking-tight">
              Welcome back,{" "} 
              <span className="text-primary">{user?.name}</span> 👋
            </h3>
            <p className="text-sm lg:text-base text-balance text-muted-foreground">
              You can start working on your assigned tasks, <br /> see your
              project progress and more.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/tasks">View Tasks</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
