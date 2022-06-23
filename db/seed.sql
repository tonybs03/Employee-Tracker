INSERT INTO department (d_name)
VALUES
  ('Magical'),
  ('Physical'),
  ('Technological'),
  ('Technomagical'),
  ('Backend-Support');

INSERT INTO workrole (title, salary, d_id)
VALUES
  ('Tank',                100000, 2),
  ('Mage',                300000, 1),
  ('Physical-Fighter',    150000, 2),
  ('Tech-Fighter',        150000, 3),
  ('Magical-Fighter',     150000, 1),
  ('TechMag-Fighter',     150000, 1),
  ('Organizer',           100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Nick',            'Fury',         7,  null),
  ('Steven',          'Strange',      2,  null),
  ('Peter',           'Quil',         4,  null),
  ('Arthur',          'Douglas',      1,     3),
  ('Wanda',           'Maximoff',     2,     2),
  ('Steve',           'Rogers',       3,     1),
  ('Tony',            'Stark',        4,     1),
  ('Thor',            'Odinson',      5,     1),
  ('Dr.',             'Doom',         6,  null);
