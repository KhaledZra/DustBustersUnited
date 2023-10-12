import { Household } from "./Household";

export interface Chore {
  id: number;
  name: string;
  description: string;
  energy: number;
  isActive: boolean;
  deadline: Date;
  repeatInterval: number;
  houseHold: Household;
}
