DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('BREAKFAST', 'LUNCH', 'DINNER', 'BRUNCH', 'SNACK');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredient_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(250)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(350) NOT NULL,
	"amount" real,
	"unit" varchar(100),
	"previous_ingredient_id" integer,
	"ingredient_group_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "instruction_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(250)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "instructions" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" varchar(350) NOT NULL,
	"previous_instruction_id" integer,
	"instruction_group_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(500) NOT NULL,
	"is_main_image" boolean NOT NULL,
	"recipe_id" integer
);
--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "title" SET DATA TYPE varchar(250);--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "description" varchar(500);--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "category" "category";--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "oven_needed" boolean;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_previous_ingredient_id_ingredients_id_fk" FOREIGN KEY ("previous_ingredient_id") REFERENCES "ingredients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_ingredient_group_id_ingredient_groups_id_fk" FOREIGN KEY ("ingredient_group_id") REFERENCES "ingredient_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instructions" ADD CONSTRAINT "instructions_previous_instruction_id_instructions_id_fk" FOREIGN KEY ("previous_instruction_id") REFERENCES "instructions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instructions" ADD CONSTRAINT "instructions_instruction_group_id_instruction_groups_id_fk" FOREIGN KEY ("instruction_group_id") REFERENCES "instruction_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "photos" ADD CONSTRAINT "photos_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
