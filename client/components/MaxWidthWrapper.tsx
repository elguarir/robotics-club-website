import { ScrollArea } from "@/components/ui/scroll-area";
import React, { PropsWithChildren } from "react";

const MaxWidthWrapper = ({ children }: PropsWithChildren) => {
  return <ScrollArea className="h-screen pb-16">{children}</ScrollArea>;
};

export default MaxWidthWrapper;
