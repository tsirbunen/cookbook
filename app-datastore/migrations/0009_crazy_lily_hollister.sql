ALTER TABLE "ingredients" RENAME COLUMN "previous_ingredient_id" TO "previous_id";--> statement-breakpoint
ALTER TABLE "ingredients" RENAME COLUMN "ingredient_group_id" TO "group_id";--> statement-breakpoint
ALTER TABLE "instructions" RENAME COLUMN "previous_instruction_id" TO "previous_id";--> statement-breakpoint
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_previous_ingredient_id_ingredients_id_fk";
--> statement-breakpoint
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_ingredient_group_id_ingredient_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "instructions" DROP CONSTRAINT "instructions_previous_instruction_id_instructions_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_previous_id_ingredients_id_fk" FOREIGN KEY ("previous_id") REFERENCES "ingredients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_group_id_ingredient_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "ingredient_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instructions" ADD CONSTRAINT "instructions_previous_id_instructions_id_fk" FOREIGN KEY ("previous_id") REFERENCES "instructions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
