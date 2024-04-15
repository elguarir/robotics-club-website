import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center w-full h-full min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold">Home</h1>
        <Button asChild>
          <Link href="/sign-in" className="w-32">
            Sign In
          </Link>
        </Button>
      </div>
    </main>
  );
}
