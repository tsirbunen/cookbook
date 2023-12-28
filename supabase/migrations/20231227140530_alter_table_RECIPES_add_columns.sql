ALTER TABLE recipes
ADD created_at timestamptz default now();