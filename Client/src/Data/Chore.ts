import { Household } from "./Household";

export interface Chore {
  id: number;
  name: string;
  description: string;
  energy: number;
  isActive: boolean;
  deadline: Date;
  repeatInterval: number;
  household: Household;
}

export type ChoreDto = {
  name: string;
  description: string;
  energy: number;
  repeatInterval: number;
  householdId: number;
};
