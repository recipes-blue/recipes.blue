import { cache } from "react";
import { z } from "zod";

export const getDidDoc = cache(async (did: string) => {
  const url = `https://plc.directory/${did}`;
  const res = await fetch(url, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  return PlcDocument.parse(await res.json());
});

export const getPdsUrl = cache(async (did: string) => {
  const plc = await getDidDoc(did);

  return (plc.service
    .find(s => s.type == 'AtprotoPersonalDataServer')
    ?.serviceEndpoint)
    || null;
});

const PlcDocument = z.object({
  id: z.string(),
  alsoKnownAs: z.array(z.string()),
  service: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      serviceEndpoint: z.string(),
    }),
  ),
});
