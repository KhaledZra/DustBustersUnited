export interface Chore {
  id: number;
  name: string;
  description: string;
  energy: number;
  isActive: boolean;
  deadline: string;
  repeatInterval: number;
  householdId: number;
}

export type ChoreCreateDto = Omit<Chore, "id" | "isActive" | "deadline">;
