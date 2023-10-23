import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
  // Flex styles
  flex: { display: "flex" },
  flex1: { flex: 1 },
  row: { flexDirection: "row" },
  wrap: { flexWrap: "wrap" },

  // Placement Styles
  justifyBetween: { justifyContent: "space-between" },
  justifyCenter: { justifyContent: "center" },
  alignCenter: { alignItems: "center" },

  // Border Styles
  
  radiusNone: { borderRadius: 0 },
  br4: { borderRadius: 4 },
  bw2: {borderWidth: 2},
  bcTransparent: {borderColor: "transparent"},

  // Gap
  gap1: { gap: 1 },
  gap2: { gap: 2 },
  gap4: { gap: 4 },
  gap10: { gap: 10 },

  // Padding
  p1: { padding: 1 },
  p2: { padding: 2 },
  p4: { padding: 4 },
  p6: { padding: 6 },
  p8: { padding: 8 },
  p12: { padding: 12 },
  p16: { padding: 16 },
  p20: { padding: 20 },

  // Padding Horizontal
  ph1: { paddingHorizontal: 1 },
  ph2: { paddingHorizontal: 2 },
  pv1: { paddingVertical: 1 },
  pv2: { paddingVertical: 2 },

  // Margin Vertical
  mv10: {marginVertical: 10},

  // Width
  w20: { width: '20%'},
  w40: { width: '40%'},

  // Aspect Ratio
  ar1: { aspectRatio: 1},

  // Elevation
  e4: {elevation: 4},

  // Text Styles
  boldText: { fontWeight: "bold" },
});


export default globalStyle;
