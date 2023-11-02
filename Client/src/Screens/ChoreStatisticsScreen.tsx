import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import PieChart from "react-native-pie-chart";
import { RootStackScreenProps } from "../../types";
import IconButtonAvatar from "../Components/IconButtonAvatar";
import { Chore } from "../Data/Chore";
import { avatars } from "../constants";
import { useAppDispatch, useAppSelector } from "../store";
import { Avatar } from "../store/householdSlice";
import { getChoreCompletions } from "../store/profileChoreSlice/thunks";
import s from "../utils/globalStyles";
import { nextChorePage } from "../store/choreNavigationSlice";

type Props = RootStackScreenProps<"ChoreStatistics">;
const widthAndHeight = 250;

type ChartAvatarProps = { degrees: number; avatar: Avatar };

// TODO: Move to separate file
function ChartAvatar({ degrees, avatar }: ChartAvatarProps) {
  degrees = degrees + 90;
  return (
    <View
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        marginTop: -25,
        marginLeft: -25,
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: [
          { rotate: `${degrees}deg` },
          { translateX: -widthAndHeight / 1.5 },
        ],
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: "white",
          borderColor: avatar.color,
          borderWidth: 2,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ rotate: `-${degrees}deg` }],
        }}
      >
        <IconButtonAvatar avatar={avatar} size={30} />
      </View>
    </View>
  );
}
// For the big pie
type ProfileAggregation = {
  completions: number;
  avatar?: { id: number; avatar: string; color: string };
  degrees?: number;
};

// For the small pies
type ChoreStats = {
  completions: number;
  avatar?: { id: number; avatar: string; color: string };
}[];

type ChoreWithStats = { chore: Chore; stats: ChoreStats };

export default function ChoreStatisticsScreen({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const chores = useAppSelector((s) => s.chore.chores);
  const profiles = useAppSelector((s) => s.household.profilesInHousehold);
  const completions = useAppSelector((s) => s.profileChore.profileChores);
  const widthAndHeight = Dimensions.get("window").width - 64;
  const [series, setSeries] = useState<number[]>([]);
  const [angles, setAngles] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [totals, setTotals] = useState<ProfileAggregation[]>([]);
  const [choresWithStats, setChoresWithStats] = useState<ChoreWithStats[]>([]);

  // load chore completions when screen loads
  useEffect(() => {
    dispatch(getChoreCompletions(route.params));
  }, [route.params]);

  // Skippar denna sidan ("vyn"?) om det inte finns några chores
  useEffect(() => {
    if (completions.length === 0) dispatch(nextChorePage());
  }, [completions]);

  // Smaller pies
  useEffect(() => {
    setChoresWithStats(
      chores.map((chore) => {
        const stats: ChoreStats = profiles
          .map((profile) => ({
            completions: completions?.filter(
              (c) => c.choreId === chore.id && c.profileId === profile.id
            ).length,
            avatar: avatars.find((a) => a.id == profile.avatar),
          }))
          .filter((s) => s.completions > 0);

        return { chore, stats };
      }).filter((c) => c.stats.some((s) => s.completions > 0))
    );
  }, [completions, chores, profiles]);

  // Big pie
  useEffect(() => {
    setTotals(
      profiles
        .map((profile) => ({
          completions: completions.filter((c) => c.profileId === profile.id)
            .length,
          avatar: avatars.find((a) => a.id == profile.avatar),
        }))
        .filter((t) => t.completions > 0)
    );
  }, [completions, profiles]);

  useEffect(() => {
    setSeries(totals.map((t) => t.completions));
    setColors(totals.map((t) => t.avatar?.color || "black"));
  }, [totals]);

  useEffect(() => {
    if (series.length === 0) return;
    const sum = series.reduce((a, b) => a + b);
    const percentages = series.map((s) => (s / sum) * 100);
    const edges = percentages.reduce(
      (acc, p) => {
        acc.push(acc[acc.length - 1] + p);
        return acc;
      },
      [0]
    );
    const centers = edges.map((e, i) => ((e + edges[i - 1]) / 2) * 3.6);
    setAngles(centers.slice(1));
  }, [series]);

  return (
    <>
      {series.length === 0 && (
        <View style={[s.alignCenter, { marginBottom: 16 }]}>
          <Text>Det finns ingen statistik att visa</Text>
        </View>
      )}
      {series.length > 0 && (
        <ScrollView>
          <View style={[s.alignCenter, { marginBottom: 16 }]}>
            <Surface
              style={[s.br10, s.p16, s.m10, { flexDirection: "column" }]}
            >
              <View style={[{ position: "relative" }]}>
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={colors}
                />

                {totals.map((t, i) => (
                  <ChartAvatar
                    key={i}
                    degrees={angles[i] || 0}
                    avatar={t.avatar!}
                  />
                ))}
              </View>
              <View style={[s.alignCenter, { marginTop: 20 }]}>
                <Text style={[s.boldText, s.fs20]}>Totalt</Text>
              </View>
            </Surface>
            <View
              style={[
                s.wrap,
                s.flex1,
                s.row,
                s.p8,
                { width: widthAndHeight + 48, gap: 16 },
              ]}
            >
              {choresWithStats.map((cs) => (
                <Surface style={[s.br10, s.p8]} key={cs.chore.id}>                  
                  {cs.stats.length > 0 && (
                    <PieChart
                      widthAndHeight={(widthAndHeight - 16) / 2}
                      series={cs.stats.map((s) => s.completions)}
                      sliceColor={cs.stats.map(
                        (s) => s.avatar?.color || "black"
                      )}
                    />
                  )}
                  <View style={[s.alignCenter, { marginTop: 20 }]}>
                    <Text style={[s.boldText, s.fs20]}>{cs.chore.name}</Text>
                  </View>
                </Surface>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}
