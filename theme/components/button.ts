import { extendTheme } from "@chakra-ui/react";
import base from "@emotion/styled/types/base";

const button = extendTheme({
    components: {
      Button: {
        sizes: {
          sm: {
            fontSize: 'md'
          }
        },
        variants: {
          base: {
            bg: 'yellow.500',
            fontSize: 'md'
           },
          sm: {
            bg: 'teal.500',
            fontSize: 'lg'
           },
          md: {
            bg: 'orange.500',
            fontSize: 'xl'
           },
        }
      },
    },
  });

  export default button