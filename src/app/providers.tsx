"use client";

import React, { useState } from "react";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [reactQueryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {},
      },
    })
  );
  return (
    <QueryClientProvider client={reactQueryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}
