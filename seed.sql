insert into owners
    (name, phone_number, hash)
VALUES
    ('chris', '8675309','$2a$10$XsQh5tmAS1AG/pxuu2Z1bu8.A4jqJdOYHrwK6Gk/N3uyVm15S8vzS'),
    ('aylor', '5554321','$2a$10$zl05WU10/H/x0hFO9/r2oeS1tDDCAMrZzJ1mHWTvJ5GlIBLSoyTai');

insert into pets
    (name, species, birthdate, owner_id)
VALUES
    ('oakley', 'cat','2010-05-30',1),
    ('milla', 'tortise shell', '2005-01-01',1),
    ('dexter','dog','2003-09-01',2),
    ('hank', 'dog','1999-03-14',2),
    ('seymour','cat','2001-12-25',2);