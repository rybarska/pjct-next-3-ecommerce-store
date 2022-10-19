import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();

console.log(
  await sql`
    SELECT * FROM mirages;
  `,
);
// just for testing, we want a persistent connection to the database
await sql.end();
