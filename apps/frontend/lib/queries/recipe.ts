import { useXrpc } from "@lib/xrpc";
import { useQuery } from "@tanstack/react-query";

export const useRecipesQuery = () => {
  const { rpc } = useXrpc();
  return useQuery({
    queryKey: ['getRecipes'],
    queryFn: async () => {
      const res = await rpc.get('moe.hayden.cookware.getRecipes', {
        params: {
          cursor: '',
        },
      });
      return res.data;
    }
  });
};
