import { FoodItem } from "@/domain";
import { Repository } from "@/repositories/Repository";

export interface FoodItemRepository extends Repository<FoodItem, string> {
  findByName(query: string): FoodItem[];
}

