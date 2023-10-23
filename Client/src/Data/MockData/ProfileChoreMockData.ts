import { Chore } from "../Chore";
import { Profile } from "../Profile";
import { ProfileChore } from "../ProfileChore";
import { mockProfile } from "./ProfileMockData";
import { mockChores } from "./ChoreMockData";

export const mockProfileChore: ProfileChore = {
  id: 1,
  dateCompleted: null,
  profile: mockProfile,
  chore: mockChores[0],
};