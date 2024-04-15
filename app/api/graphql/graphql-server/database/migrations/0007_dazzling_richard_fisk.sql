CREATE TABLE IF NOT EXISTS "languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(150) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "language_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
