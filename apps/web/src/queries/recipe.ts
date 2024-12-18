import { useXrpc } from "@/hooks/use-xrpc";
import { SERVER_URL } from "@/lib/utils";
import { XRPC, XRPCError } from "@atcute/client";
import { Recipe } from "@cookware/lexicons";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import axios from "axios";
import { UseFormReturn } from "react-hook-form";

const RQKEY_ROOT = 'posts';
export const RQKEY = (cursor: string, did: string, rkey: string) => [RQKEY_ROOT, cursor, did, rkey];

export const useRecipesQuery = (cursor: string, did?: string) => {
  const { rpc } = useXrpc();
  return useQuery({
    queryKey: RQKEY(cursor, did ?? '', ''),
    queryFn: async () => {
      const res = await rpc.get('moe.hayden.cookware.getRecipes', {
        params: { cursor, did },
      });
      return res.data;
    },
  });
};

export const recipeQueryOptions = (rpc: XRPC, did: string, rkey: string) => {
  return queryOptions({
    queryKey: RQKEY('', did, rkey),
    queryFn: async () => {
      try {
      const res = await rpc.get('moe.hayden.cookware.getRecipe', {
        params: { did, rkey },
      });
      return res.data;
      } catch (err) {
        if (err instanceof XRPCError && err.kind && err.kind == 'not_found') {
          throw notFound({ routeId: '/_' });
        }
        throw err;
      }
    },
  });
};

export const useRecipeQuery = (did: string, rkey: string) => {
  const { rpc } = useXrpc();
  return useQuery(recipeQueryOptions(rpc, did, rkey));
};

export const useNewRecipeMutation = (form: UseFormReturn<Recipe>) => {
  return useMutation({
    mutationKey: ['recipes.new'],
    mutationFn: async ({ recipe }: { recipe: Recipe }) => {
      const res = await axios.post(`https://${SERVER_URL}/api/recipes`, recipe);
      return res.data;
    },
    onError: (error) => {
      console.error(error);
      form.setError('title', error);
    },
  });
};
