import { Chore } from "../Chore";

export const mockChores: Chore[] = [
  {
    id: 1,
    name: "Diska",
    description: "Lagt disk i diskmaskinen",
    energy: 2,
    isActive: true,
    deadline: new Date("2023-10-16"),
    repeatInterval: 7,
    householdId: 1,
  },
  {
    id: 2,
    name: "Tvätt",
    description: "Tvättat",
    energy: 3,
    isActive: true,
    deadline: new Date("2023-10-25"),
    repeatInterval: 14,
    householdId: 1,
  },
  {
    id: 3,
    name: "Spela Cod",
    description: "Som de låter",
    energy: 3,
    isActive: true,
    deadline: new Date("2023-10-25"),
    repeatInterval: 14,
    householdId: 1,
  },
  {
    id: 4,
    name: "Koda C++",
    description: "Bästa språket",
    energy: 3,
    isActive: true,
    deadline: new Date("2023-10-25"),
    repeatInterval: 14,
    householdId: 1,
  },
];
