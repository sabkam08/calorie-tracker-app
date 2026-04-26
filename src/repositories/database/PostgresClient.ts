import "server-only";

import { Pool, type QueryResultRow } from "pg";

import { getPostgresConfig } from "./PostgresConfig";

declare global {
  // Keep one pool during local HMR to avoid opening excess clients.
  // eslint-disable-next-line no-var
  var __calorieTrackerPgPool: Pool | undefined;
}

export function createPostgresPool(): Pool {
  const config = getPostgresConfig();

  return new Pool({
    connectionString: config.connectionString,
    ssl: config.ssl,
    max: config.maxPoolSize,
    idleTimeoutMillis: config.idleTimeoutMs,
    connectionTimeoutMillis: config.connectionTimeoutMs,
  });
}

export function getPostgresPool(): Pool {
  if (!globalThis.__calorieTrackerPgPool) {
    globalThis.__calorieTrackerPgPool = createPostgresPool();
  }

  return globalThis.__calorieTrackerPgPool;
}

export async function queryPostgres<T extends QueryResultRow>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const pool = getPostgresPool();
  const result = await pool.query<T>(sql, params);
  return result.rows;
}

export async function checkPostgresConnection(): Promise<{ ok: boolean; now?: string; error?: string }> {
  try {
    const rows = await queryPostgres<{ now: string }>("SELECT NOW()::text AS now");
    return { ok: true, now: rows[0]?.now };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown PostgreSQL connection error.";
    return { ok: false, error: message };
  }
}

export async function closePostgresPool(): Promise<void> {
  if (!globalThis.__calorieTrackerPgPool) {
    return;
  }

  await globalThis.__calorieTrackerPgPool.end();
  globalThis.__calorieTrackerPgPool = undefined;
}

