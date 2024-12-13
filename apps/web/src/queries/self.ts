import { AppBskyActorGetProfile } from "@atcute/client/lexicons";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['self'],
    queryFn: async () => {
      try {
        const res = await axios.get<AppBskyActorGetProfile.Output>('/oauth/me');
        return res.data;
      } catch(err) {
        if (err instanceof AxiosError && err.status == 401) {
          // If we get a 401, we're just unauthenticated.
          return null;
        }
        throw err;
      }
    },
  });
}
