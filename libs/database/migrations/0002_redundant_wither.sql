DROP INDEX IF EXISTS "recipes_id_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "recipes_rkey_author_did_unique";--> statement-breakpoint
ALTER TABLE `recipes` ALTER COLUMN "title" TO "title" text;--> statement-breakpoint
CREATE UNIQUE INDEX `recipes_id_unique` ON `recipes` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `recipes_rkey_author_did_unique` ON `recipes` (`rkey`,`author_did`);