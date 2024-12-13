import { resolveHandle } from '@/lib/auth/handle';
import { getPdsUrl } from '@/lib/auth/pds';
import { signIn } from '@/lib/auth/sign-in';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useResolveHandle = (handle: string) => {
  return useQuery({
    queryKey: ['handleLookup', handle],
    queryFn: async () => {
      const did = await resolveHandle(handle);
      const pdsUrl = await getPdsUrl(did);
      if (!pdsUrl) {
        throw new Error('Your PDS was unavailable.');
      }

      return { did, pdsUrl };
    },
    enabled: handle.length > 2,
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ did }: { did: string }) => {
      await signIn(did);
      return {};
    },
  });
};
