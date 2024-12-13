'use client';

import { SessionProvider } from "@/lib/auth/context";
import { getQueryClient } from "@/lib/react-query";
import { OAuthSession } from "@atproto/oauth-client-node";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

export const Providers = ({
  children,
  session,
}: PropsWithChildren<{
  session: OAuthSession | null;
}>) => {
  const queryClient = getQueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};
