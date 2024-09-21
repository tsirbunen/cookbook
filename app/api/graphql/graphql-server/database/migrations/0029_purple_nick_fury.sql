ALTER TABLE "accounts" RENAME COLUMN "title" TO "username";--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_title_unique";--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_username_unique" UNIQUE("username");