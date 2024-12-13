import { OAuthSession } from "@atproto/oauth-client-node";
import { createContext, PropsWithChildren } from "react";

const SessionContext = createContext<OAuthSession | null>(null);

export const SessionProvider = ({ session, children }: PropsWithChildren<{ session: OAuthSession | null }>) => {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
};
