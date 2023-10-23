import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Divider, IconButton, Menu } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { Avatar } from "../store/householdSlice";
import { setActiveProfile } from "../store/userSlice";
import { logout } from "../store/userSlice/thunks";
import IconButtonAvatar from "./IconButtonAvatar";

export default function StackHeader({ options }: React.PropsWithRef<any>) {
  // TODO: Should be able to solve this with `createSelector` instead
  // from here ---
  const [avatar, setAvatar] = useState<Avatar>();
  const avatars = useAppSelector((state) => state.household.avatars);
  const profiles = useAppSelector((state) => state.user.profiles);
  const user = useAppSelector((state) => state.user.user);
  const activeProfileId = useAppSelector((state) => state.user.activeProfileId);
  useEffect(() => {
    if (activeProfileId === undefined) {
      return setAvatar(undefined);
    }
    let profile = profiles.find((p) => p.id === activeProfileId);
    if (profile) {
      setAvatar(avatars[profile.avatar]);
    }
  }, [profiles, activeProfileId]);
  // --- to here

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = useState(false);
  const open = () => setMenuVisible(true);
  const close = () => setMenuVisible(false);

  const handleChangeHousehold = () => {
    dispatch(setActiveProfile(undefined));
    navigation.navigate("PickHousehold");
  };
  const handleShowHousehold = () => {
    navigation.navigate("HouseholdInfo");
  };
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  const menuAnchor = () => {
    return (
      <>
        {user && !avatar && <IconButton icon="dots-vertical" onPress={open} />}
        {avatar && (
          <IconButtonAvatar
            avatar={avatar}
            rippleColor={avatar.color}
            onPress={open}
          />
        )}
      </>
    );
  };

  return (
    <Appbar.Header style={{ paddingRight: 15 }}>
      {options.backNav && (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      )}
      <Appbar.Content style={{ alignItems: "center" }} title={options.title} />
      <Menu visible={menuVisible} onDismiss={close} anchor={menuAnchor()}>
        {activeProfileId && (
          <Menu.Item
            onPress={handleChangeHousehold}
            title="Byt hushåll"
            leadingIcon="home"
          />
        )}
        {activeProfileId && (
          <Menu.Item
            onPress={handleShowHousehold}
            title="Hushåll info"
            leadingIcon="home"
          />
        )}
        <Divider />
        <Menu.Item onPress={handleLogout} title="Logout" leadingIcon="logout" />
      </Menu>
    </Appbar.Header>
  );
}