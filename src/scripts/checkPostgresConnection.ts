import { checkPostgresConnection, closePostgresPool } from "@/repositories/database";

async function run(): Promise<void> {
  const result = await checkPostgresConnection();

  if (!result.ok) {
    console.error(`PostgreSQL connection failed: ${result.error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`PostgreSQL connection successful. Server time: ${result.now ?? "N/A"}`);
}

run()
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "Unknown error while checking PostgreSQL.";
    console.error(message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePostgresPool();
  });

