import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import {
  nextChorePage,
  prevChorePage,
  selectActiveChorePage,
} from "../store/choreNavigationSlice";
import { CHORE_PAGE_IDS } from "../constants";
import { useEffect } from "react";
import { subMonths } from "date-fns";

export function ChoreHeaderBar() {
  const navigation = useNavigation();
  const page = useAppSelector(selectActiveChorePage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (page.id == CHORE_PAGE_IDS.TODAY) {
      return navigation.navigate("ChoreList");
    }
    navigation.navigate("ChoreStatistics", {
      startDate: page.startDate,
      endDate: page.endDate,
    });
  }, [page]);

  // Set title with special case for "last month" which will be the month name
  let title = page.title;
  if (page.id == CHORE_PAGE_IDS.LAST_MONTH) {
    let date = subMonths(new Date(), 1);
    title = date.toLocaleString("default", { month: "long" });
  }

  return (
    <Appbar.Header statusBarHeight={0}>
      <Appbar.Action
        icon="arrow-left"
        onPress={() => dispatch(prevChorePage())}
      />
      <Appbar.Content title={title} titleStyle={{ textAlign: "center" }} />
      <Appbar.Action
        icon="arrow-right"
        onPress={() => dispatch(nextChorePage())}
      />
    </Appbar.Header>
  );
}
