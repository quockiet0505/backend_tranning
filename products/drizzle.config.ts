import "dotenv/config";
import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const databaseUrl = new URL(process.env.DATABASE_URL);
const sslMode = databaseUrl.searchParams.get("sslmode");
const ssl =
  sslMode === "require" ||
  sslMode === "prefer" ||
  sslMode === "verify-full" ||
  sslMode === "allow"
    ? sslMode
    : undefined;

export default {
  schema: "./database/schema",
  out: "./database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: databaseUrl.hostname,
    port: databaseUrl.port ? Number(databaseUrl.port) : undefined,
    user: databaseUrl.username || undefined,
    password: databaseUrl.password || undefined,
    database: databaseUrl.pathname.replace(/^\//, ""),
    ssl,
  },
} satisfies Config;
