ALTER TABLE "ingredient_groups" ADD COLUMN "recipe_id" integer;--> statement-breakpoint
ALTER TABLE "instruction_groups" ADD COLUMN "recipe_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredient_groups" ADD CONSTRAINT "ingredient_groups_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instruction_groups" ADD CONSTRAINT "instruction_groups_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
