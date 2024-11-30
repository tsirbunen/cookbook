DO $$ BEGIN
 CREATE TYPE "identity_provider" AS ENUM('email', 'github', 'facebook');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "email" varchar(50);--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "password_hash" varchar(250);--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "email_verified" boolean;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "latest_code_sent_by_email" varchar(20);--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "identity_provider" "identity_provider" NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_email_unique" UNIQUE("email");