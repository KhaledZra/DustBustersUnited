import { Household } from "../Household";
import { Profile } from "../Profile";
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

export const mockProfile: Profile = {
  id: 1,
  avatar: 2,
  displayName: "Test",
  isAdmin: false,
  isActive: true,
  isDeleted: false,
  user: mockUser,
  household: mockHousehold,
};
