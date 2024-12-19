import { SERVER_URL } from "@/lib/utils";
import { CredentialManager, XRPC } from "@atcute/client"
import { OAuthUserAgent } from "@atcute/oauth-browser-client";

export function useXrpc(agent?: OAuthUserAgent) {
  let handler;
  if (agent) handler = agent;
  else handler = new CredentialManager({ service: `https://${SERVER_URL}` });

  const rpc = new XRPC({ handler });

  return rpc;
}
