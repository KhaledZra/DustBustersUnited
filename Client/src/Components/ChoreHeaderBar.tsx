import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Appbar } from "react-native-paper";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";

const PAGE_IDS = {
  TODAY: "TODAY",
  THIS_WEEK: "THIS_WEEK",
  LAST_WEEK: "LAST_WEEK",
  LAST_MONTH: "LAST_MONTH",
};

const today = new Date();
const ymd = "yyyy-MM-dd";

const chorePages = [
  {
    id: PAGE_IDS.TODAY,
    title: "Idag",
    startDate: format(today, ymd), // dates are not used for "today"
    endDate: format(today, ymd), //   ...but we include them for type safety
  },
  {
    id: PAGE_IDS.THIS_WEEK,
    title: "Nuvarande vecka",
    startDate: format(startOfWeek(today), ymd),
    endDate: format(addDays(endOfWeek(today), 1), ymd), // addDays(date,1) makes the end date inclusive
  },
  {
    id: PAGE_IDS.LAST_WEEK,
    title: "Förra veckan",
    startDate: format(startOfWeek(subWeeks(today, 1)), ymd),
    endDate: format(addDays(endOfWeek(subWeeks(today, 1)), 1), ymd),
  },
  {
    id: PAGE_IDS.LAST_MONTH,
    title: "Förra månaden",
    startDate: format(startOfMonth(subMonths(today, 1)), ymd),
    endDate: format(addDays(endOfMonth(subMonths(today, 1)), 1), ymd),
  },
];

export function ChoreHeaderBar() {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(chorePages[0]);

  const navigateToPage = () => {
    console.log("currentPage.id", currentPage.id);
    if (currentPage.id == PAGE_IDS.TODAY) {
      navigation.navigate("ChoreList");
    } else {
      navigation.navigate("ChoreStatistics", {
        startDate: currentPage.startDate,
        endDate: currentPage.endDate,
      });
    }
  };

  const nextPage = () => {
    const index = chorePages.indexOf(currentPage) + 1;
    console.log("index", index);
    if (index > chorePages.length - 1) {
      console.log("a")
      setCurrentPage(chorePages[0]);
    } else {
      console.log("b", chorePages[index])
      setCurrentPage(chorePages[index]);
    }
    setTimeout(navigateToPage);
  };

  const prevPage = () => {
    const index = chorePages.indexOf(currentPage);
    if (index > 0) {
      setCurrentPage(chorePages[index - 1]);
    } else {
      setCurrentPage(chorePages[chorePages.length - 1]);
    }
    navigateToPage();
  };

  let { title } = currentPage;

  if (currentPage.id == PAGE_IDS.LAST_MONTH) {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let lastMonthReadable = date.toLocaleString("default", { month: "long" });
    // for example "February" or "Februari" depending on locale
    title = lastMonthReadable;
  }

  return (
    <Appbar.Header statusBarHeight={0}>
      <Appbar.BackAction onPress={prevPage} />
      <Appbar.Content title={title} titleStyle={{ textAlign: "center" }} />
      <Appbar.Action icon="arrow-right" onPress={nextPage} />
    </Appbar.Header>
  );
}
