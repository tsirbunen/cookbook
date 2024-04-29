ALTER TABLE "ingredient_groups" ALTER COLUMN "recipe_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ingredients" ALTER COLUMN "group_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "instruction_groups" ALTER COLUMN "recipe_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "instructions" ALTER COLUMN "group_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "photos" ALTER COLUMN "recipe_id" SET NOT NULL;