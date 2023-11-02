import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const selectActiveHouseholdId = (state: RootState) =>
  state.user.profiles.find((p) => p.id === state.user.activeProfileId)
    ?.household.id!;

export const selectActiveHousehold = (state: RootState) =>
  state.user.profiles.find((p) => p.id === state.user.activeProfileId)
    ?.household;

export const selectHouseholdProfiles = (state: RootState) =>
  state.household.profilesInHousehold;

export const selectRequestProfiles = createSelector(
  (state: RootState) => state.household.profilesInHousehold,
  (profiles) => profiles.filter((p) => p.isRequest)
);

export const selectProfiles = createSelector(
  (state: RootState) => state.household.profilesInHousehold,
  (profiles) => profiles.filter((p) => !p.isRequest)
);
