import { Chore } from "../Chore";
import { Profile } from "../Profile";
import { ProfileChore } from "../ProfileChore";
import { User } from "../User";
import { mockHousehold } from "./HouseHoldMochData";

const mockChore: Chore = {
  id: 1,
  name: "Marcus Sake",
  description: "Tvättat kläder",
  energy: 10,
  isActive: true,
  deadline: new Date("2023-10-20"),
  repeatInterval: 4,
  houseHold: mockHousehold,
};

const mockUser: User = {
  id: 1,
  name: "Marcus Sake",
  password: "Japan",
};

const mockProfile: Profile = {
  id: 1,
  avatar: 1,
  displayName: "Sake",
  isAdmin: false,
  isActive: true,
  isDeleted: false,
  user: mockUser,
  household: mockHousehold,
};

export const mockProfileChore: ProfileChore = {
  id: 1,
  dateCompleted: null,
  profile: mockProfile,
  chore: mockChore,
};