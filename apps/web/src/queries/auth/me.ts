import { getSession } from "@/lib/auth/session";
import { useQuery } from "@tanstack/react-query";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      'use server';
      const sess = await getSession();
      return sess;
    },
  });
};
