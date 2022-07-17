import { ComponentStyleConfig } from "@chakra-ui/react";

const FlexPositionBadge: ComponentStyleConfig = {
  // The styles all Cards have in common
  baseStyle: {},
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
    lg: {},
  },
  // Two variants: rounded and smooth
  variants: {
    REC_FLEX: {},
    WRRB_FLEX: {},
    FLEX: {},
    SUPER_FLEX: {},
    IDP_FLEX: {},
  },
  // The default variant value
  defaultProps: {
    variant: "smooth",
  },
};

export default FlexPositionBadge;
