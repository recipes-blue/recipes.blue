import { CredentialManager, XRPC } from "@atcute/client";
import React, { createContext, PropsWithChildren, useContext } from "react";
import { CW_SERVICE } from "./consts";

type XrpcContext = {
  creds?: CredentialManager;
  rpc?: XRPC;
};

const xrpcContext = createContext<XrpcContext>({
  creds: undefined,
  rpc: undefined,
});

export const XrpcProvider = ({ children }: PropsWithChildren) => {
  const ctx = React.useMemo(() => {
    const creds = new CredentialManager({ service: CW_SERVICE });
    const rpc = new XRPC({ handler: creds });
    return { creds, rpc } satisfies XrpcContext;
  }, []);

  return <xrpcContext.Provider value={ctx}>{children}</xrpcContext.Provider>;
};

export const useXrpc = () => {
  const ctx = useContext(xrpcContext);
  if (!ctx.rpc || !ctx.creds)
    throw new Error('useXrpc() must be used below <XrpcProvider>.');
  return { rpc: ctx.rpc, creds: ctx.creds };
};
