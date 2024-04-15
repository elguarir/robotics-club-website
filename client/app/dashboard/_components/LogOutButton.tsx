"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";
import React from "react";

type Props = {};

const LogOutButton = (props: Props) => {
  const { logout } = useAuth();

  return (
    <Button
      onClick={() => logout.mutate()}
      variant={"outline"}
      size="sm"
      isLoading={logout.isPending}
      loadingText="Logging out..."
      className="w-full"
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
