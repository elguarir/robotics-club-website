import { SignInForm } from "@/components/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="relative w-full h-full">
      <div className="w-full h-full min-h-screen lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center h-full py-12 max-lg:min-h-screen">
          <div className="mx-auto grid max-w-[360px] w-full gap-6">
            <div className="grid gap-2 text-left">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Fill in your credentials to continue
              </p>
            </div>
            <SignInForm />
            <div className="mt-0 text-sm font-[450] text-center">
              You're new here?{" "}
              <Link
                href="/join-us"
                className="font-medium underline hover:text-primary"
              >
                Join us
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-screen p-4 relative bg-neutral-100 border-r border-2 max-lg:hidden">
          <img
            src="/login-illustration.jpeg"
            className="object-cover w-full rounded-sm h-full"
            alt="Image"
          />
          <div className="absolute bottom-6 left-6 px-6 py-1 rounded-sm text-sm font-mono text-white text-center bg-black bg-opacity-40">
            Illustration Generated by{" "}
            <a
              className="hover:text-neutral-200 transition-colors"
              href="https://www.adobe.com/products/firefly.html"
              target="_blank"
            >
              AI
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
