import { Profile } from "../Profile";
import { mockUser } from "./UserMockData";
import { mockHousehold } from "./HouseHoldMockData";

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
