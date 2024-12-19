import { useXrpc } from "@/hooks/use-xrpc";
import { useAuth } from "@/state/auth";
import { AppBskyActorProfile } from "@atcute/client/lexicons";
import { At } from "@atcute/client/lexicons";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = () => {
  const { isLoggedIn, agent } = useAuth();
  const rpc = useXrpc(agent);

  return useQuery({
    queryKey: ['self'],
    queryFn: async () => {
      const res = await rpc.get('com.atproto.repo.getRecord', {
        params: {
          repo: agent?.sub as At.DID,
          collection: 'app.bsky.actor.profile',
          rkey: 'self',
        },
      });

      return res.data.value as AppBskyActorProfile.Record;
    },
    enabled: isLoggedIn,
  });
}
