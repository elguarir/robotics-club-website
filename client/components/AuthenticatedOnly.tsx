"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
type Props = {
  children: React.ReactNode;
};

const AuthenticatedOnly = (props: Props) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen gap-3">
        <BarLoader color="#3d3d3d" />
        <p className="text-sm font-[450]">
           Checking your credentials...
        </p>
      </div>
    );

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return props.children;
};

export default AuthenticatedOnly;
