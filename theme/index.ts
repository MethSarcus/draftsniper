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
}

export default extendTheme(overrides)