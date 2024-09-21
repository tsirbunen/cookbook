ALTER TABLE "accounts" DROP CONSTRAINT "accounts_phone_number_unique";--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "phone_number";--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "is_verified";--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "latest_code";--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_id_at_provider_unique" UNIQUE("id_at_provider");