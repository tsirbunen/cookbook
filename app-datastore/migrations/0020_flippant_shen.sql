ALTER TABLE "accounts" ADD CONSTRAINT "accounts_title_unique" UNIQUE("title");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_phone_number_unique" UNIQUE("phone_number");