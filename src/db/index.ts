// db.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless'; // needed to create fetch client
import * as schema from './schema'; // if you have schema defined

const sql = neon(process.env.DATABASE_URL!); // Neon-compatible driver
export const db = drizzle(sql, { schema }); // schema is optional
