import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './libs/database/drizzle',
  schema: './libs/database/src/schema/**/*.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});