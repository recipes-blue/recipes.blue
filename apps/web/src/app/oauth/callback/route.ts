'use server';

import { type NextRequest } from "next/server";
import { getClient } from "@/lib/auth";
import { setSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export const GET = async (req: NextRequest) => {
  const client = await getClient();
  const params = req.nextUrl.searchParams;

  const { session } = await client.callback(params);
  await setSession(session.did);

  return redirect('/');
};
