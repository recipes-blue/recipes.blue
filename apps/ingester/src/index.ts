import { Jetstream } from "@skyware/jetstream";
import { WebSocket } from "ws";
import { ingestLogger } from "./logger.js";
import env from "./config.js";
import { RecipeCollection, RecipeRecord, parseDid } from "@cookware/lexicons";
import { db, recipeTable } from "@cookware/database";
import { and, eq } from "drizzle-orm";

export const newIngester = () => {
  const jetstream = new Jetstream({
    ws: WebSocket,
    endpoint: env.JETSTREAM_ENDPOINT,
    wantedCollections: ['blue.recipes.*'],
    cursor: 0,
  });

  jetstream.on("commit", async event => {
    if (event.commit.operation == 'create' || event.commit.operation == 'update') {
      const now = new Date();
      const { record } = event.commit;

      if (
        event.commit.collection == RecipeCollection
        && record.$type == RecipeCollection
        && RecipeRecord.safeParse(record).success
      ) {
        const res = await db
          .insert(recipeTable)
          .values({
            rkey: event.commit.rkey,
            title: record.title,
            time: record.time,
            serves: record.serves,
            description: record.description,
            ingredients: record.ingredients,
            steps: record.steps,
            imageRef: record.image ? record.image.ref.$link : null,
            authorDid: parseDid(event.did)!,
            createdAt: now,
          })
          .onConflictDoUpdate({
            target: recipeTable.id,
            set: {
              title: record.title,
              time: record.time,
              serves: record.serves,
              description: record.description,
              ingredients: record.ingredients,
              steps: record.steps,
              imageRef: record.image ? record.image.ref.$link : null,
            },
          })
          .execute();

        ingestLogger.info({ res }, 'recipe ingested');
      }
    } else if (event.commit.operation == 'delete') {
      const res = await db
        .delete(recipeTable)
        .where(
          and(
            eq(recipeTable.authorDid, parseDid(event.did)!),
            eq(recipeTable.rkey, event.commit.rkey),
          )
        )
        .execute();

      ingestLogger.info({ res }, 'recipe deleted');
    }
  });

  jetstream.on('open', () => {
    ingestLogger.info({
      endpoint: env.JETSTREAM_ENDPOINT,
      wantedCollections: ['recipes.blue.*'],
    }, 'Ingester connection opened.');
  });

  jetstream.on('close', () => {
    ingestLogger.error('Ingester connection closed.');
  });

  jetstream.on('error', err => {
    ingestLogger.error({ err }, 'Ingester runtime error.');
  });

  return jetstream;
};

newIngester().start();
