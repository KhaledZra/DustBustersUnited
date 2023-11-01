import { Button } from "react-native-paper";
import { Profile } from "../../Data/Profile";
import { avatars } from "../../constants";
import s from "../../utils/globalStyles";

interface ProfileRenderProps {
    profile: Profile;
    onPressAction: () => void;
  }
  
export default function ProfileButtonRender(profileRenderProps: ProfileRenderProps) {
    {
      const profileAvatar = avatars.find(
        (avatar) => avatar.id === profileRenderProps.profile.avatar
      );
      return (
        <Button
          style={[s.pv3, s.bgColWhite, s.m16]}
          labelStyle={[s.colBlack]}
          key={profileRenderProps.profile.id}
          onPress={profileRenderProps.onPressAction}
        >
          {profileAvatar ? profileAvatar.avatar : null}{" "}
          {profileRenderProps.profile.displayName}
        </Button>
      );
    }
  }