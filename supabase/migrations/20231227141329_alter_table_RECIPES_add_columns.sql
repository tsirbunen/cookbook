ALTER TABLE recipes
ADD updated_at timestamptz default now();