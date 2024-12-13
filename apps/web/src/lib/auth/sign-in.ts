'use server';

import { getClient } from "@/lib/auth";
import { redirect } from "next/navigation";

export const signIn = async (did: string) => {
  const client = await getClient();

  const url = await client.authorize(did, {
    scope: 'atproto transition:generic',
  });

  redirect(url.toString());
};
