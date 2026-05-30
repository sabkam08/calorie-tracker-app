import { FoodItem } from "@/domain";
import { FoodItemRepository } from "@/repositories/contracts";

export class DatabaseFoodItemRepository implements FoodItemRepository {
  save(entity: FoodItem): void {
    void entity;
    throw new Error("DatabaseFoodItemRepository.save is not implemented yet.");
  }

  findById(id: string): FoodItem | undefined {
    void id;
    throw new Error("DatabaseFoodItemRepository.findById is not implemented yet.");
  }

  findAll(): FoodItem[] {
    throw new Error("DatabaseFoodItemRepository.findAll is not implemented yet.");
  }

  delete(id: string): void {
    void id;
    throw new Error("DatabaseFoodItemRepository.delete is not implemented yet.");
  }

  findByName(query: string): FoodItem[] {
    void query;
    throw new Error("DatabaseFoodItemRepository.findByName is not implemented yet.");
  }
}
