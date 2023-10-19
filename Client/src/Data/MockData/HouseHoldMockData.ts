import { Household } from "../Household";
import { mockUser } from "./UserMockData";

export const mockHousehold: Household = {
  id: 1,
  name: "Marcus's hus",
  code: 1234,
  owner: mockUser,
  availableAvatars: [1, 2, 3, 4],
};
