// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Global style overrides
import theme from './theme'

// Component style overrides
import Button from './components/button'

const overrides = {
  theme,
  // Other foundational style overrides go here
  components: {
    // Other components go here
  },
}

export default extendTheme(overrides)