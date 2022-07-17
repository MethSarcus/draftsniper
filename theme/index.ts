// theme/index.js
import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import theme from "./theme";

// Component style overrides
import Card from "./components/CardTheme";
import DraftPickCard from "./components/DarftPickCardTheme";
import PositionBadge from "./components/PositionBadge";
import FlexPositionBadge from "./components/FlexPositionBadge";

const overrides = {
  theme,
  // Other foundational style overrides go here
  components: {
    Card,
    DraftPickCard,
    PositionBadge,
    FlexPositionBadge
  },
  colors: {
    primary: {
      50: "#F7F2FE",
      100: "#F0E6FC",
      200: "#E8D9FB",
      300: "#E1CDFA",
      400: "#D9C0F8",
      500: "#D1B3F7",
      600: "#CAA7F6",
      700: "#C29AF5",
      800: "#BA8DF3",
      900: "#B381F2",
    },
    primary_dark: {
      50: "#120D19",
      100: "#241A30",
      200: "#362749",
      300: "#483461",
      400: "#5A4179",
      500: "#6B4D91",
      600: "#6002ee",
      700: "#8F67C2",
      800: "#A174DA",
      900: "#B381F2",
    },
    primary_google: {
      50: "#f4ebfe",
      100: "#e2cdfd",
      200: "#cfabfd",
      300: "#bb86fc",
      400: "#aa67f9",
      500: "#994af1",
      600: "#8e44ea",
      700: "#803be0",
      800: "#7335d8",
      900: "#5f27ca",
    },
    secondary_google: {
      50: "#d4f6f2",
      100: "#92e9dc",
      200: "#03dac4",
      300: "#00c7ab",
      400: "#00b798",
      500: "#00a885",
      600: "#009a77",
      700: "#008966",
      800: "#007957",
      900: "#005b39",
    },
    surface_google: {
      0: "#292929",
      1: "#121212",
      2: "#1E1E1E",
      3: "#232323",
      4: "#252525",
      5: "#272727",
      6: "#2C2C2C",
      7: "#2F2F2F",
      8: "#333333",
      9: "#353535",
      10: "#383838",
    },
    position: {
      QB: "rgba(239, 116, 161, 0.8)",
      RB: "rgba(143, 242, 202, 0.8)",
      WR: "rgba(86, 201, 248, 0.8)",
      TE: "rgba(254, 174, 88, 0.8)",
      DL: "rgba(250, 153, 97, 0.8)",
      DB: "rgba(254, 160, 202, 0.8)",
      LB: "rgba(174, 182, 252, 0.8)",
      K: "#7988a1",
      DEF: "#bd66ff"
    },
    blank: {
      50: "",
      100: "",
      200: "",
      300: "",
      400: "",
      500: "",
      600: "",
      700: "",
      800: "",
      900: "",
    },
    secondary: {
      100: "#03DAC6",
      200: "#35E1D1",
      300: "#68E9DD",
      400: "#9AF0E8",
      500: "#CDF8F4",
    },
    dark: {
      100: "#353E50",
      200: "#584D83",
      300: "#775FA8",
      400: "#956FCD",
      500: "#B381F2",
    },
    dark_variant: {
      100: "#707784",
      200: "#9CA1AA",
      300: "#C8CACF",
      400: "#F4F4F5",
    },
    brand: {
      primary: "#BB86FC",
      primary_variant: "#3700B3",
      secondary: "#03DAC6",
      background: "#292929",
      elevation_1: "#1E1E1E",
      surface: "#121212",
      error: "#CF6679",
      on_primary: "#000000",
      on_secondary: "#000000",
      on_background: "#FFFFFF",
      on_surface: "#FFFFFF",
      on_error: "#000000",
    },
    base: {
      base_default: "#627D98",
      base_50: "#F0F4F8",
      base_100: "#D9E2EC",
      base_200: "#BCCCDC",
      base_300: "#9FB3C8",
      base_400: "#829AB1",
      base_500: "#627D98",
      base_600: "#486581",
      base_700: "#334E68",
      base_800: "#243B53",
      base_900: "#102A43",
    },
    purple: {
      50: "#f3e5ff",
      100: "#d6b3ff",
      200: "#b983fc",
      300: "#9d51fa",
      400: "#8121f7",
      500: "#680ade",
      600: "#5105ad",
      700: "#3a037c",
      800: "#23014d",
      900: "#0e001d",
    },
  },
};

export default extendTheme(overrides);
