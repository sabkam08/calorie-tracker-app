import { UserProfile } from "@/domain";
import { Repository } from "@/repositories/Repository";

export interface UserProfileRepository extends Repository<UserProfile, string> {
  findByEmail(email: string): UserProfile | undefined;
}

