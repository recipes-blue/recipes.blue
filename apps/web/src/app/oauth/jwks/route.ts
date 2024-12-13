'use server';
import { getClient } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const client = await getClient();
  return NextResponse.json(client.jwks);
};
