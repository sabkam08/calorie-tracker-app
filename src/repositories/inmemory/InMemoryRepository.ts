import { IdSelector, Repository } from "@/repositories/Repository";

export class InMemoryRepository<T, ID> implements Repository<T, ID> {
  protected readonly storage = new Map<ID, T>();
  private readonly selectId: IdSelector<T, ID>;

  constructor(selectId: IdSelector<T, ID>) {
    this.selectId = selectId;
  }

  save(entity: T): void {
    this.storage.set(this.selectId(entity), entity);
  }

  findById(id: ID): T | undefined {
    return this.storage.get(id);
  }

  findAll(): T[] {
    return Array.from(this.storage.values());
  }

  delete(id: ID): void {
    this.storage.delete(id);
  }

  clear(): void {
    this.storage.clear();
  }
}

