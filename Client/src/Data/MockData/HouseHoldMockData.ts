import { Household } from "../Household";
import { User } from "../User";

const mockUser: User = {
  id: 1,
  userName: "Marcus Sake",
  password: "Japan",
};

export const mockHousehold: Household = {
  id: 1,
  name: "Marcus Sake",
  code: 1234,
  owner: mockUser,
};
