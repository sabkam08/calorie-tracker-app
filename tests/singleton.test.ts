import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { DatabaseConnection } from "@/creational_patterns/singleton/DatabaseConnectionSingleton";

describe("Singleton", () => {
  afterEach(() => {
    DatabaseConnection.resetForTests();
  });

  it("returns the same instance for repeated requests", () => {
    const first = DatabaseConnection.getInstance("postgres://one");
    const second = DatabaseConnection.getInstance("postgres://two");

    assert.equal(first, second);
    assert.equal(second.getConnectionString(), "postgres://one");
  });

  it("maintains a single instance under async concurrency", async () => {
    const instances = await Promise.all(
      Array.from({ length: 20 }).map(() =>
        DatabaseConnection.getInstanceAsync("postgres://concurrent")
      )
    );

    const uniqueReferences = new Set(instances);
    assert.equal(uniqueReferences.size, 1);
  });
});



