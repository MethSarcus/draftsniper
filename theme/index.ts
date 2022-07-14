// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Global style overrides
import theme from './theme'

// Component style overrides
import Card from './components/CardTheme'
import DraftPickCard from './components/DarftPickCardTheme'

const overrides = {
  theme,
  // Other foundational style overrides go here
  components: {
    Card,
    DraftPickCard,
  },
  colors: {
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
    }
}
}

export default extendTheme(overrides)