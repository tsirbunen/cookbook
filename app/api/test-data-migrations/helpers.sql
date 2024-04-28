UPDATE ingredients SET previous_id = NULL;

UPDATE instructions SET previous_id = NULL;

DELETE FROM tags;

DELETE FROM recipes_to_tags;

DELETE FROM photos;

DELETE FROM ingredients;

DELETE FROM ingredient_groups;

DELETE FROM instructions;

DELETE FROM instruction_groups;

DELETE FROM recipes;

DELETE FROM languages;