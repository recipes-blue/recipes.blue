import { AppBskyActorGetProfile } from "@atcute/client/lexicons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['self'],
    queryFn: async () => {
      const res = await axios.get<AppBskyActorGetProfile.Output>('/oauth/me');
      return res.data;
    },
  });
}
