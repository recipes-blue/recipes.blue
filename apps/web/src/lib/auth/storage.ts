import type {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from '@atproto/oauth-client-node'
import { db, authSessionTable, authStateTable } from '@cookware/database'
import { eq } from 'drizzle-orm';

export class StateStore implements NodeSavedStateStore {
  constructor() {}
  async get(key: string): Promise<NodeSavedState | undefined> {
    const result = await db.query.authStateTable.findFirst({
      where: eq(authStateTable.key, key),
    });
    if (!result) return
    return result.state
  }

  async set(key: string, state: NodeSavedState) {
    await db.insert(authStateTable).values({
      key, state: state,
    }).onConflictDoUpdate({
      target: authStateTable.key,
      set: { state },
    });
  }

  async del(key: string) {
    await db.delete(authStateTable).where(eq(authStateTable.key, key));
  }
}

export class SessionStore implements NodeSavedSessionStore {
  async get(key: string): Promise<NodeSavedSession | undefined> {
    const result = await db.query.authSessionTable.findFirst({
      where: eq(authSessionTable.key, key),
    });
    if (!result) return
    return result.session
  }

  async set(key: string, session: NodeSavedSession) {
    await db.insert(authSessionTable)
      .values({ key, session })
      .onConflictDoUpdate({
        target: authSessionTable.key,
        set: { session },
      });
  }

  async del(key: string) {
    await db.delete(authSessionTable).where(eq(authSessionTable.key, key));
  }
}
