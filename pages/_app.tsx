import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import customTheme from "../theme/index";
import 'rsuite/dist/rsuite.min.css';
import {enableMapSet} from "immer"
import { Analytics } from '@vercel/analytics/react';



function MyApp({ Component, pageProps }: AppProps) {
  enableMapSet()

  return (
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
          <Analytics />
        </ChakraProvider>
  );
}

export default MyApp;
