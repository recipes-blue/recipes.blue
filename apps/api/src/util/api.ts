import { XRPC } from '@atcute/client';
import type { AppBskyActorProfile, BlueRecipesFeedDefs } from '@atcute/client/lexicons';
import { DID, getDidDoc } from '@cookware/lexicons';

export const getAuthorInfo = async (
  did: DID,
  rpc: XRPC,
): Promise<BlueRecipesFeedDefs.AuthorInfo> => {
  const author = await getDidDoc(did);
  const profile = await rpc.get('com.atproto.repo.getRecord', {
    params: {
      repo: did,
      collection: 'app.bsky.actor.profile',
      rkey: 'self',
    },
  });
  const data = profile.data.value as AppBskyActorProfile.Record;

  let info: BlueRecipesFeedDefs.AuthorInfo = {
    did: did,
    handle: author.alsoKnownAs[0]?.substring(5) as string,
    displayName: data.displayName,
  };

  if (data.avatar)
    info['avatarUrl'] = `https://cdn.bsky.app/img/avatar_thumbnail/plain/${did}/${data.avatar.ref.$link}@jpeg`;

  return info;
}; 
