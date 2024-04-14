"use client";

import {
  QueryClient as ReactQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

type QueryClientProps = {
  children: ReactNode;
};

const QueryClient = ({ children }: QueryClientProps) => {
  const [queryClient] = useState(() => new ReactQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryClient;
