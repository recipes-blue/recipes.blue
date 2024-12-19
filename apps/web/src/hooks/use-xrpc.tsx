import { SERVER_URL } from "@/lib/utils";
import { useAuth } from "@/state/auth";
import { CredentialManager, XRPC } from "@atcute/client"

export function useXrpc() {
  const { agent } = useAuth();

  if (agent) {  
    return new XRPC({
      handler: agent,
      proxy: {
        type: 'api',
        service: `did:web:${SERVER_URL}`,
      },
    });
  }

  const creds = new CredentialManager({ service: `https://${SERVER_URL}` });
  return new XRPC({ handler: creds });
}
