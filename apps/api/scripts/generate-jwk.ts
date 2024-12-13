import { generateKeyPair } from "jose";

async function serializeKeyToJwk() {
  // Generate an RSA key pair
  const { publicKey, privateKey } = await generateKeyPair("ES256");

  // Export keys as JWK
  const publicJwk = await import("jose").then((lib) =>
    lib.exportJWK(publicKey)
  );
  const privateJwk = await import("jose").then((lib) =>
    lib.exportJWK(privateKey)
  );

  // Convert to JSON strings
  const publicJwkString = JSON.stringify(publicJwk);
  const privateJwkString = JSON.stringify(privateJwk);

  // save 3 of these to PRIVATE_KEY_X env vars
  console.log(publicJwkString, privateJwkString);

  return { publicJwkString, privateJwkString };
}

serializeKeyToJwk();
