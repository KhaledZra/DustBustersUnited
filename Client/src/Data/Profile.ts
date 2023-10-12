import { Household } from "./Household";
import { User } from "./User";

export interface Profile {
  id: number;
  avatar: number;
  displayName: string;
  isAdmin: boolean;
  isActive: boolean;
  isDeleted: boolean;
  user: User;
  household: Household;
}
