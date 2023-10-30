import { Chore } from "./Chore";
import { Profile } from "./Profile";

export interface ProfileChore {
  id: number;
  dateCompleted: string | null;
  profile: Profile;
  profileId: number;
  chore: Chore;
  choreId: number;
}
