import { FoodItem } from "@/domain";
import { FoodItemRepository } from "@/repositories/contracts";
import { InMemoryRepository } from "@/repositories/inmemory/InMemoryRepository";

export class InMemoryFoodItemRepository
  extends InMemoryRepository<FoodItem, string>
  implements FoodItemRepository
{
  constructor() {
    super((entity) => entity.foodId);
  }

  findByName(query: string): FoodItem[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return this.findAll();
    }

    return this.findAll().filter((item) => item.name.toLowerCase().includes(normalized));
  }
}

