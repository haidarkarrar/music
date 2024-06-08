import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./drizzle/schema.ts",
    out: "./drizzle/migrations",
    dialect: 'mysql',
    dbCredentials: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'music'
    },
    verbose: true,
    strict: true,
})