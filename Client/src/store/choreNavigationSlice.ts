import { createSlice } from "@reduxjs/toolkit";
import { CHORE_PAGE_IDS } from "../constants";
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
import { RootState } from ".";

const { TODAY, THIS_WEEK, LAST_WEEK, LAST_MONTH } = CHORE_PAGE_IDS;
const today = new Date();
const ymd = "yyyy-MM-dd";

const choreNavigationSlice = createSlice({
  name: "choreNavigation",
  initialState: {
    pageIndex: 0,
    pages: [
      {
        id: TODAY,
        title: "Idag",
        startDate: format(today, ymd), // dates are not used for "today"
        endDate: format(today, ymd), //   ...but we include them for type safety
      },
      {
        id: THIS_WEEK,
        title: "Nuvarande vecka",
        startDate: format(startOfWeek(today), ymd),
        endDate: format(addDays(endOfWeek(today), 1), ymd), // addDays(date,1) makes the end date inclusive
      },
      {
        id: LAST_WEEK,
        title: "Förra veckan",
        startDate: format(startOfWeek(subWeeks(today, 1)), ymd),
        endDate: format(addDays(endOfWeek(subWeeks(today, 1)), 1), ymd),
      },
      {
        id: LAST_MONTH,
        title: "Förra månaden",
        startDate: format(startOfMonth(subMonths(today, 1)), ymd),
        endDate: format(addDays(endOfMonth(subMonths(today, 1)), 1), ymd),
      },
    ],
  },
  reducers: {
    nextChorePage: (state) => {
      const newIndex = state.pageIndex + 1;
      state.pageIndex = newIndex > state.pages.length - 1 ? 0 : newIndex;
    },

    prevChorePage: (state) => {
      const newIndex = state.pageIndex - 1;
      state.pageIndex = newIndex < 0 ? state.pages.length - 1 : newIndex;
    },
  },
});

export const selectActiveChorePage = (state: RootState) => {
  const { pageIndex, pages } = state.choreNavigation;
  return pages[pageIndex];
};

export const { nextChorePage, prevChorePage } = choreNavigationSlice.actions;
export default choreNavigationSlice.reducer;
