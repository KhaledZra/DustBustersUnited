import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Appbar, Divider, IconButton, Menu } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import {
  selectActiveAvatar,
  selectActiveProfile,
  setActiveProfile,
} from "../store/userSlice";
import { logout } from "../store/userSlice/thunks";
import { ChoreHeaderBar } from "./ChoreHeaderBar";
import IconButtonAvatar from "./IconButtonAvatar";

type Props = NativeStackHeaderProps & {
  backNav?: boolean;
  choreNav?: boolean;
  title?: string;
};

export default function StackHeader({
  backNav,
  title,
  choreNav,
  navigation,
}: Props) {
  const profile = useAppSelector(selectActiveProfile);
  const avatar = useAppSelector(selectActiveAvatar);
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const [menuVisible, setMenuVisible] = useState(false);

  if (!title) {
    title = profile?.household.name;
  }

  const open = () => setMenuVisible(true);
  const close = () => setMenuVisible(false);

  // Navigation handlers

  const handleChangeHousehold = () => {
    dispatch(setActiveProfile(undefined));
    navigation.navigate("PickHousehold");
  };
  const handleShowHousehold = () => {
    navigation.navigate("HouseholdInfo");
  };
  const handleSetting = () => {
    navigation.navigate("Settings");
  };
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <>
      <Appbar.Header style={{ paddingRight: 15 }}>
        {backNav && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        <Appbar.Content style={{ alignItems: "center" }} title={title} />
        <Menu
          visible={menuVisible}
          onDismiss={close}
          anchor={
            <>
              {user && !avatar && (
                <IconButton icon="dots-vertical" onPress={open} />
              )}
              {avatar && (
                <IconButtonAvatar
                  avatar={avatar}
                  rippleColor={avatar.color}
                  onPress={open}
                />
              )}
            </>
          }
        >
          {profile && (
            <Menu.Item
              onPress={handleChangeHousehold}
              title="Byt hushåll"
              leadingIcon="home"
            />
          )}
          {profile && (
            <Menu.Item
              onPress={handleShowHousehold}
              title="Hushållsinfo"
              leadingIcon="information-outline"
            />
          )}
          <Divider />
          <Menu.Item
            onPress={handleSetting}
            title="Settings"
            leadingIcon="cog"
          />
          <Menu.Item
            onPress={handleLogout}
            title="Logout"
            leadingIcon="logout"
          />
        </Menu>
      </Appbar.Header>
      {choreNav && <ChoreHeaderBar />}
    </>
  );
}
