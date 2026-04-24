import { FoodCatalogue } from "@/domain";
import { FoodCatalogueRepository } from "@/repositories/contracts";
import { InMemoryRepository } from "@/repositories/inmemory/InMemoryRepository";

export class InMemoryFoodCatalogueRepository
  extends InMemoryRepository<FoodCatalogue, string>
  implements FoodCatalogueRepository
{
  constructor() {
    super((entity) => entity.catalogueId);
  }

  findBySourceName(sourceName: string): FoodCatalogue[] {
    const normalized = sourceName.trim().toLowerCase();
    return this.findAll().filter((catalogue) => catalogue.sourceName.toLowerCase() === normalized);
  }
}

