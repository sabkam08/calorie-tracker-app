import { FoodItem } from "@/domain";
import { queryPostgres } from "@/repositories/database";
import { FoodItemRepository } from "@/repositories/contracts";

export class DatabaseFoodItemRepository implements FoodItemRepository {
  async ping(): Promise<boolean> {
    const rows = await queryPostgres<{ ok: number }>("SELECT 1 AS ok");
    return rows[0]?.ok === 1;
  }

  save(_entity: FoodItem): void {
    throw new Error("DatabaseFoodItemRepository.save is not implemented yet.");
  }

  findById(_id: string): FoodItem | undefined {
    throw new Error("DatabaseFoodItemRepository.findById is not implemented yet.");
  }

  findAll(): FoodItem[] {
    throw new Error("DatabaseFoodItemRepository.findAll is not implemented yet.");
  }

  delete(_id: string): void {
    throw new Error("DatabaseFoodItemRepository.delete is not implemented yet.");
  }

  findByName(_query: string): FoodItem[] {
    throw new Error("DatabaseFoodItemRepository.findByName is not implemented yet.");
  }
}
