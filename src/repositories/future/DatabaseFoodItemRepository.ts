import { FoodItem } from "@/domain";
import { FoodItemRepository } from "@/repositories/contracts";

export class DatabaseFoodItemRepository implements FoodItemRepository {
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

