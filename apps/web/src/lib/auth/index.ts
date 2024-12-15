'use server';

import { JoseKey } from "@atproto/jwk-jose";
import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { SessionStore, StateStore } from "./storage";
import envConfig from "@/envConfig";

export const getClient = async () => {
  const appUrl = envConfig.combinedEnv.PUBLIC_URL;

  return new NodeOAuthClient({
    clientMetadata: {
      client_id: `${appUrl}/oauth/client-metadata`,
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
      jwks_uri: `${appUrl}/oauth/jwks`,
    },
    keyset: await Promise.all([
      JoseKey.fromImportable(process.env.PRIVATE_JWK!, 'cookware_jwks_1'),
    ]),
    sessionStore: new SessionStore(),
    stateStore: new StateStore(),
  });
};
