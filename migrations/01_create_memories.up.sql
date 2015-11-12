CREATE DATABASE memories_db;

CREATE TABLE memories (
  id serial primary key,
  old_days text,
  these_days text,
  year integer
);

