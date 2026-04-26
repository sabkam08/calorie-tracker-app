export type PostgresConfig = {
  connectionString: string;
  ssl: boolean | { rejectUnauthorized: boolean };
  maxPoolSize: number;
  idleTimeoutMs: number;
  connectionTimeoutMs: number;
};

function readNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function readSslSetting(value: string | undefined): PostgresConfig["ssl"] {
  if (value === "disable") {
    return false;
  }

  if (value === "no-verify") {
    return { rejectUnauthorized: false };
  }

  if (value === "require") {
    return { rejectUnauthorized: true };
  }

  const isProduction = process.env.NODE_ENV === "production";
  return isProduction ? { rejectUnauthorized: false } : false;
}

export function getPostgresConfig(env: NodeJS.ProcessEnv = process.env): PostgresConfig {
  const connectionString = env.DATABASE_URL?.trim();

  if (!connectionString) {
    throw new Error("DATABASE_URL is required to connect to PostgreSQL.");
  }

  return {
    connectionString,
    ssl: readSslSetting(env.PGSSL_MODE),
    maxPoolSize: readNumber(env.PG_POOL_MAX, 10),
    idleTimeoutMs: readNumber(env.PG_IDLE_TIMEOUT_MS, 30_000),
    connectionTimeoutMs: readNumber(env.PG_CONNECT_TIMEOUT_MS, 5_000),
  };
}

