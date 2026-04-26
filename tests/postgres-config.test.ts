import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getPostgresConfig } from "@/repositories/database";

function buildEnv(overrides: Partial<NodeJS.ProcessEnv> = {}): NodeJS.ProcessEnv {
  return {
    NODE_ENV: "test",
    ...overrides,
  };
}

describe("Postgres config", () => {
  it("throws when DATABASE_URL is missing", () => {
    assert.throws(() => getPostgresConfig(buildEnv({ DATABASE_URL: undefined })), /DATABASE_URL is required/i);
  });

  it("reads required and optional values", () => {
    const config = getPostgresConfig(
      buildEnv({
        DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/calorie_tracker",
        PGSSL_MODE: "disable",
        PG_POOL_MAX: "20",
        PG_IDLE_TIMEOUT_MS: "45000",
        PG_CONNECT_TIMEOUT_MS: "8000",
      }),
    );

    assert.equal(config.connectionString, "postgresql://postgres:postgres@localhost:5432/calorie_tracker");
    assert.equal(config.ssl, false);
    assert.equal(config.maxPoolSize, 20);
    assert.equal(config.idleTimeoutMs, 45000);
    assert.equal(config.connectionTimeoutMs, 8000);
  });
});
