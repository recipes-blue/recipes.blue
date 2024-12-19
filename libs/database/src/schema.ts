import { customType, int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { DID } from "@cookware/lexicons";
import { Ingredient, Step } from "@cookware/lexicons";
import { NodeSavedSession, NodeSavedState } from "@atproto/oauth-client-node";

const did = customType<{ data: DID }>({
  dataType() {
    return "text";
  },
});

const dateIsoText = customType<{ data: Date; driverData: string }>({
  dataType() {
    return "text";
  },
  toDriver: (value) => value.toISOString(),
  fromDriver: (value) => new Date(value),
});

export const recipeTable = sqliteTable("recipes", {
  id: int('id').primaryKey().notNull().unique(),
  rkey: text('rkey').notNull(),
  title: text('title').notNull(),
  time: int('time').notNull().default(0),
  description: text('description'),
  ingredients: text('ingredients', { mode: 'json' }).$type<Partial<Ingredient>[]>().notNull(),
  steps: text('steps', { mode: 'json' }).$type<Partial<Step>[]>().notNull(),
  createdAt: dateIsoText("created_at").notNull(),
  authorDid: did("author_did").notNull(),
}, t => ({
  unique_author_rkey: unique().on(t.rkey, t.authorDid),
}));

export const authStateTable = sqliteTable("auth_state", {
  key: text().primaryKey(),
  state: text({ mode: 'json' }).$type<NodeSavedState>().notNull(),
});

export const authSessionTable = sqliteTable("auth_session", {
  key: text().primaryKey(),
  session: text({ mode: 'json' }).$type<NodeSavedSession>().notNull(),
});
