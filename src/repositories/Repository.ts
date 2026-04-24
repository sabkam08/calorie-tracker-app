export type IdSelector<T, ID> = (entity: T) => ID;

export interface Repository<T, ID> {
  // save acts as upsert for in-memory and future database implementations.
  save(entity: T): void;
  findById(id: ID): T | undefined;
  findAll(): T[];
  delete(id: ID): void;
}
