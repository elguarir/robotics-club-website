import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/helpers/getSession";

export default async function Dashboard() {
  let session = await getSession();
  return (
    <>
      <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div
          className="flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-balance">
              Welcome back,{" "}
              <span className="text-primary">{session?.name}</span> 👋
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start working on your assigned tasks, see your project
              progress and more.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/projects">View Tasks</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
