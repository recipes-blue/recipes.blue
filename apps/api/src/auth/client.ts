import { JoseKey } from "@atproto/jwk-jose";
import { NodeOAuthClient } from "@atproto/oauth-client-node";
import env from "../config/env.js";
import { SessionStore, StateStore } from "./storage.js";
import { Context } from "hono";

export const getClient = async (ctx: Context) => {
  let appUrl = 'https://recipes.blue';
  if (env.ENV == 'development') {
    appUrl = `https://${ctx.req.header('Host')}`;
  }

  return new NodeOAuthClient({
    clientMetadata: {
      client_id: `${appUrl}/oauth/client-metadata.json`,
      client_name: 'Cookware',
      client_uri: appUrl,
      redirect_uris: [`${appUrl}/oauth/callback`],
      response_types: ['code'],
      application_type: 'web',
      grant_types: ['authorization_code', 'refresh_token'],
      scope: 'atproto transition:generic',
      token_endpoint_auth_method: 'private_key_jwt',
      token_endpoint_auth_signing_alg: 'ES256',
      dpop_bound_access_tokens: true,
      jwks_uri: `${appUrl}/oauth/jwks.json`,
    },
    keyset: await Promise.all([
      JoseKey.fromImportable(env.JWKS_PRIVATE_KEY, 'cookware_jwks_1'),
    ]),
    sessionStore: new SessionStore(),
    stateStore: new StateStore(),
  });
};
