import { Chore } from "../Chore";
import { Household } from "../Household";
import { User } from "../User";

const mockUser: User = {
  id: 1,
  name: "Marcus Sake",
  password: "Japan",
};
const mockHousehold: Household = {
  id: 1,
  name: "Marcus Sake",
  code: 1234,
  owner: mockUser,
};

export const mockChores: Chore[] = [
  {
    id: 1,
    name: "Diska",
    description: "Lagt disk i diskmaskinen",
    energy: 2,
    isActive: true,
    deadline: new Date("2023-10-21"),
    repeatInterval: 7,
    houseHold: mockHousehold,
  },
  {
    id: 2,
    name: "Tvätt",
    description: "Tvättat",
    energy: 3,
    isActive: true,
    deadline: new Date("2023-10-25"),
    repeatInterval: 14,
    houseHold: mockHousehold,
  },
  {
    id: 3,
    name: "Spela Cod",
    description: "Som de låter",
    energy: 3,
    isActive: true,
    deadline: new Date("2023-10-25"),
    repeatInterval: 14,
    houseHold: mockHousehold,
  },
  {
    id: 4,
    name: "Koda C++",
    description: "Bästa språket",
    energy: 3,
    isActive: true,
    deadline: new Date("2023-10-25"),
    repeatInterval: 14,
    houseHold: mockHousehold,
  },
];
