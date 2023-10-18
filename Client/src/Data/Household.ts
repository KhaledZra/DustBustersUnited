import { User } from "./User";

export interface Household {
  id: number;
  name: string;
  code: number;
  owner: User;
  availableAvatars: number[];
}