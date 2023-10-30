import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
  // Overflow
  overflowHidden: { overflow: "hidden" },

  // Color
  colRed: { color: "red" },
  colWhite: { color: "white" },
  colBlack: { color: "black" },

  // Background color
  bgColGrey: { backgroundColor: "grey" },
  bgColRed: { backgroundColor: "red" },
  bgColWhite: { backgroundColor: "white" },
  bgColBlack: { backgroundColor: "black" },
  bgColGreen: { backgroundColor: "green" },

  // Flex styles
  flex: { display: "flex" },
  flex1: { flex: 1 },
  row: { flexDirection: "row" },
  wrap: { flexWrap: "wrap" },

  // Placement Styles
  justifyBetween: { justifyContent: "space-between" },
  justifyCenter: { justifyContent: "center" },
  justifyEnd: { justifyContent: "flex-end" },

  alignCenter: { alignItems: "center" },
  alignEnd: { alignItems: "flex-end" },

  alignSelfEnd: { alignSelf: "flex-end" },

  // Border Styles
  radiusNone: { borderRadius: 0 },
  br4: { borderRadius: 4 },
  br10: { borderRadius: 10 },
  br20: { borderRadius: 20 },
  brfull: { borderRadius: 999999 },

  bw2: { borderWidth: 2 },

  btlr10: { borderTopLeftRadius: 10 },
  btrr10: { borderTopRightRadius: 10 },
  bblr10: { borderBottomLeftRadius: 10 },
  bbrr10: { borderBottomRightRadius: 10 },

  bcTransparent: { borderColor: "transparent" },

  // Gap
  gap1: { gap: 1 },
  gap2: { gap: 2 },
  gap4: { gap: 4 },
  gap8: { gap: 8 },
  gap10: { gap: 10 },
  gap20: { gap: 20 },

  // Padding Styles
  p1: { padding: 1 },
  p2: { padding: 2 },
  p4: { padding: 4 },
  p6: { padding: 6 },
  p8: { padding: 8 },
  p10: { padding: 10 },
  p12: { padding: 12 },
  p16: { padding: 16 },
  p20: { padding: 20 },

  ph1: { paddingHorizontal: 1 },
  ph2: { paddingHorizontal: 2 },
  ph15: { paddingHorizontal: 15 },

  pv1: { paddingVertical: 1 },
  pv2: { paddingVertical: 2 },
  pv3: { paddingVertical: 10 },

  pt15: { paddingTop: 15 },
  pt16: { paddingTop: 16 },

  // Margin
  m16: { margin: 16 },
  m10: { margin: 10 },

  mv10: { marginVertical: 10 },
  mh10: { marginHorizontal: 10 },

  mb7: { marginBottom: 7 },
  mb10: { marginBottom: 10 },
  mb20: { marginBottom: 20 },

  mt16: { marginTop: 16 },

  // Width
  w10: { width: "10%" },
  w20: { width: "20%" },
  w40: { width: "40%" },
  w80: { width: "80%" },
  w150: { width: 150 },

  // Height
  h35: { height: "35%" },
  h40: { height: "40%" },

  // Aspect Ratio
  ar1: { aspectRatio: 1 },

  // Elevation
  e4: { elevation: 4 },

  // Text Styles
  boldText: { fontWeight: "bold" },

  textCenter: { textAlign: "center" },

  fs26: { fontSize: 26 },
  fs60: { fontSize: 60 },
  fs20: { fontSize: 20 },
});

export default globalStyle;
