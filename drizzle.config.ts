import type { Config } from 'drizzle-kit';
export default {
  schema: './src/drizzle/netcore/schema/*.ts',
  out: './src/drizzle/netcore/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // TODO: connection limit and pooling config to be added
    url: process.env.DATABASE_URL,
  },
  introspect: {
    casing: 'preserve',
  },
  // schemaFilter: ['public'],
} satisfies Config;