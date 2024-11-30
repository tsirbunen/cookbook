ALTER TABLE "instructions" RENAME COLUMN "instruction_group_id" TO "group_id";--> statement-breakpoint
ALTER TABLE "instructions" DROP CONSTRAINT "instructions_instruction_group_id_instruction_groups_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instructions" ADD CONSTRAINT "instructions_group_id_instruction_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "instruction_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
