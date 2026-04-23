import { FoodItem } from "@/domain";

export class FoodItemPrototypeRegistry {
  private readonly prototypes = new Map<string, FoodItem>();

  register(key: string, item: FoodItem): void {
    this.prototypes.set(key, item);
  }

  clone(key: string, overrides: { foodId: string; name?: string }): FoodItem {
    const prototype = this.prototypes.get(key);
    if (!prototype) {
      throw new Error(`Prototype '${key}' is not registered.`);
    }

    return prototype.clone({
      foodId: overrides.foodId,
      name: overrides.name,
    });
  }
}


