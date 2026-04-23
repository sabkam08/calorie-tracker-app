export class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private static initPromise: Promise<DatabaseConnection> | null = null;

  private connected = false;

  private constructor(private readonly connectionString: string) {}

  static getInstance(connectionString: string): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection(connectionString);
    }

    return DatabaseConnection.instance;
  }

  static async getInstanceAsync(connectionString: string): Promise<DatabaseConnection> {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    if (!DatabaseConnection.initPromise) {
      DatabaseConnection.initPromise = Promise.resolve(
        new DatabaseConnection(connectionString)
      ).then((instance) => {
        DatabaseConnection.instance = instance;
        return instance;
      });
    }

    return DatabaseConnection.initPromise;
  }

  static resetForTests(): void {
    DatabaseConnection.instance = null;
    DatabaseConnection.initPromise = null;
  }

  async connect(): Promise<boolean> {
    this.connected = true;
    return this.connected;
  }

  isConnected(): boolean {
    return this.connected;
  }

  getConnectionString(): string {
    return this.connectionString;
  }
}


