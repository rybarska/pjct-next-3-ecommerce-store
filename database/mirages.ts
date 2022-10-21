import { sql } from './connect';

// Now we are getting this data from the database
/* export const mirages = [
  {
    id: 1,
    name: 'Aurora borealis',
    price: '999999',
    description:
      "a natural light display in Earth's sky; result of disturbances in the magnetosphere caused by the solar wind",
  },
  {
    id: 2,
    name: 'Brocken spectre',
    price: '999999',
    description:
      'the magnified shadow of an observer cast in mid air upon any type of cloud opposite to a strong light source',
  },
  {
    id: 3,
    name: 'Fata morgana',
    price: '999999',
    description:
      'superior mirage visible in a narrow band right above the horizon; occurs because rays of light bend when they pass through air layers of different temperatures in a steep thermal inversion where an atmospheric duct has formed',
  },
  {
    id: 4,
    name: 'Green flash',
    price: '999999',
    description:
      "a distinct green spot is briefly visible above the upper rim of the Sun's disk; occur because the Earth's atmosphere can cause the light from the Sun to refract into different colors",
  },
  {
    id: 5,
    name: 'Light pillars',
    price: '999999',
    description:
      'vertical beams of light that appear to extend above and/or below a light source; created by the reflection of light from tiny ice crystals that are suspended in the atmosphere or that comprise high-altitude clouds',
  },
  {
    id: 6,
    name: 'Moon rainbow',
    price: '999999',
    description:
      'a rainbow produced by moonlight, caused by the refraction of light in many water droplets; much fainter than solar rainbows and very rarely seen',
  },
  {
    id: 7,
    name: 'Omega sun',
    price: '999999',
    description:
      'the sun appearing in shape of the greek letter omega; the lower part is an inverted image produced by refraction by a layer of warmer and less dense air close to the ocean surface',
  },
  {
    id: 8,
    name: 'Sundog',
    price: '999999',
    description:
      'colored spots of light that develop due to the refraction of light through ice crystals',
  },
]; */

export type Mirage = {
  id: number;
  name: string;
  price: number;
  description: string;
};

// Get all mirages
export async function getMirages() {
  const mirages = await sql<Mirage[]>`
    SELECT * FROM mirages
  `;
  return mirages;
}
// Get a single mirage by id
export async function getMirageById(id: number) {
  const [mirage] = await sql<Mirage[]>`
    SELECT
      *
    FROM
      mirages
    WHERE
      id = ${id}
  `;
  return mirage;
}
// Alternative method: accept id of undefined
// // Get a single mirage by id
// export async function getMirageById(id: number | undefined) {
//   if (!id) return undefined;
//   const [mirage] = await sql<Mirage[]>`
//     SELECT
//       *
//     FROM
//       mirages
//     WHERE
//       id = ${id}
//   `;
//   return mirage;
// }

export async function createMirage(
  name: string,
  price: number,
  description: string,
) {
  const [mirage] = await sql<Mirage[]>`
    INSERT INTO mirages
      (name, price, description)
    VALUES
      (${name}, ${price}, ${description})
    RETURNING *
  `;
  return mirage;
}

export async function updateMirageById(
  id: number,
  name: string,
  price: number,
  description: string,
) {
  const [mirage] = await sql<Mirage[]>`
    UPDATE
      mirages
    SET
      name = ${name},
      price = ${price},
      description = ${description}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return mirage;
}
export async function deleteMirageById(id: number) {
  const [mirage] = await sql<Mirage[]>`
    DELETE FROM
      mirages
    WHERE
      id = ${id}
    RETURNING *
  `;
  return mirage;
}
