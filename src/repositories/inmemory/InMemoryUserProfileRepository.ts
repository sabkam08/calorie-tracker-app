import { UserProfile } from "@/domain";
import { UserProfileRepository } from "@/repositories/contracts";
import { InMemoryRepository } from "@/repositories/inmemory/InMemoryRepository";

export class InMemoryUserProfileRepository
  extends InMemoryRepository<UserProfile, string>
  implements UserProfileRepository
{
  constructor() {
    super((entity) => entity.userId);
  }

  findByEmail(email: string): UserProfile | undefined {
    const normalized = email.trim().toLowerCase();
    return this.findAll().find((profile) => profile.email.toLowerCase() === normalized);
  }
}

