import { User } from "./User";

export interface Household {
  id: number;
  name: string;
  code: number;
  owner: User;
  availableAvatars: number[];
}

export interface AddHouseholdDTO {
  Name: string;
  OwnerId: number;
}

export type JoinHouseholdDto = {
  userId: number;
  householdId: number;
  code: number;
  displayName: string;
  avatar: number;
  isAdmin: boolean;
};
