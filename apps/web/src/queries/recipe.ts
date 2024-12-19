import { useXrpc } from "@/hooks/use-xrpc";
import { useAuth } from "@/state/auth";
import { XRPC, XRPCError } from "@atcute/client";
import { Recipe, RecipeCollection } from "@cookware/lexicons";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { notFound, useLocation, useRouter } from "@tanstack/react-router";
import { UseFormReturn } from "react-hook-form";
import { TID } from '@atproto/common-web';

const RQKEY_ROOT = 'posts';
export const RQKEY = (cursor: string, did: string, rkey: string) => [RQKEY_ROOT, cursor, did, rkey];

export const useRecipesQuery = (cursor: string, did?: string) => {
  const rpc = useXrpc();
  return useQuery({
    queryKey: RQKEY(cursor, did ?? '', ''),
    queryFn: async () => {
      const res = await rpc.get('blue.recipes.feed.getRecipes', {
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
      const res = await rpc.get('blue.recipes.feed.getRecipe', {
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
  const rpc = useXrpc();
  return useQuery(recipeQueryOptions(rpc, did, rkey));
};

export const useNewRecipeMutation = (form: UseFormReturn<Recipe>) => {
  const { agent } = useAuth();
  const rpc = useXrpc();
  return useMutation({
    mutationKey: ['recipes.new'],
    mutationFn: async ({ recipe }: { recipe: Recipe }) => {
      const rkey = TID.nextStr();
      const res = await rpc.call(`com.atproto.repo.createRecord`, {
        data: {
          repo: agent?.session.info.sub as `did:${string}`,
          record: recipe,
          collection: RecipeCollection,
          rkey: rkey,
        },
      });
      return {
        rkey: rkey,
        resp: res.data
      };
    },
    onError: (error) => {
      form.setError('title', error);
    },
    onSuccess: ({ rkey }) => {
      window.location.assign(`/recipes/${agent?.sub}/${rkey}`);
    },
  });
};
