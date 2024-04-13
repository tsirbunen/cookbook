CREATE TABLE IF NOT EXISTS "recipes_to_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" integer,
	"tag_id" integer
);
--> statement-breakpoint
ALTER TABLE "tags" DROP CONSTRAINT "tags_recipe_id_recipes_id_fk";
--> statement-breakpoint
ALTER TABLE "tags" DROP COLUMN IF EXISTS "recipe_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes_to_tags" ADD CONSTRAINT "recipes_to_tags_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes_to_tags" ADD CONSTRAINT "recipes_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
