-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create mirages table
CREATE TABLE mirages(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  price integer NOT NULL,
  description varchar(250)
);


-- Insert some mirages (C in CRUD - Create)
INSERT INTO mirages
  (name, price, description)
VALUES
  (
    'Aurora borealis',
    999999,
      'a natural light display in the sky; result of disturbances in the magnetosphere caused by the solar wind'
  ),
  (
    'Brocken spectre',
    999999,
      'the magnified shadow of an observer cast in mid air upon any type of cloud opposite to a strong light source'
  ),
  (
    'Fata morgana',
    999999,
      'superior mirage visible in a narrow band right above the horizon; occurs because rays of light bend when they pass through air layers of different temperatures in a steep thermal inversion where an atmospheric duct has formed'
  ),
  (
    'Green flash',
    999999,
      'a distinct green spot is briefly visible above the upper rim of the disk of the Sun; occur because the atmosphere of the Earth can cause the light from the Sun to refract into different colors'
  ),
  (
    'Light pillars',
    999999,
      'vertical beams of light that appear to extend above and/or below a light source; created by the reflection of light from tiny ice crystals that are suspended in the atmosphere or that comprise high-altitude clouds'
  ),
  (
    'Moon rainbow',
    999999,
      'a rainbow produced by moonlight, caused by the refraction of light in many water droplets; much fainter than solar rainbows and very rarely seen'
  ),
  (
    'Omega sun',
    999999,
      'the sun appearing in shape of the greek letter omega; the lower part is an inverted image produced by refraction by a layer of warmer and less dense air close to the ocean surface'
  ),
  (
    'Sundog',
    999999,
      'colored spots of light that develop due to the refraction of light through ice crystals'
  );


-- Read some mirages (R in CRUD - Read)
SELECT * FROM mirages;
