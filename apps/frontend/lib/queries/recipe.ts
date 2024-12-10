import { useQuery } from "@tanstack/react-query";

export const useRecipesQuery = () => {
  return useQuery({
    queryKey: ['getRecipes'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/xrpc/moe.hayden.cookware.getRecipes?cursor=0');
      return res.json();
    }
  });
};
