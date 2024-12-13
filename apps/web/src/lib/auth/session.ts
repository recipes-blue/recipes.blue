import { cookies } from "next/headers";
import { cache } from "react";
import { z } from "zod";
import { getClient } from ".";

const AUTH_COOKIE_NAME = 'cookware_session';

const jwt = z.custom<`${string}.${string}.${string}`>((data: string) => {
  if (typeof data !== 'string') return false;
  if (data.split('.').length != 3) return false;
  return true;
});

export const setSession = async (did: string) => {
  const client = await getClient();

  const userToken = await client.keyset?.createJwt({ alg: 'ES256' }, {
    iat: Date.now(),
    sub: did,
  });

  (await cookies()).set(AUTH_COOKIE_NAME, userToken!, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });
};

export const getSession = cache(async () => {
  const client = await getClient();

  const tokenCookie = (await cookies()).get(AUTH_COOKIE_NAME);
  if (!tokenCookie) return null;

  let token;
  try {
    const tokenValidated = jwt.parse(tokenCookie.value);
    token = await client.keyset?.verifyJwt(tokenValidated);
    const session = await client.restore(token?.payload.sub!);

    return session;
  } catch(e) {
    console.warn('Failed to restore JWT.', e);
    return null;
  }
});
