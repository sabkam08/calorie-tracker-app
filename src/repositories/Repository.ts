export interface Repository<T, ID> {
  save(entity: T): void;
  findById(id: ID): T | undefined;
  findAll(): T[];
  delete(id: ID): void;
}

