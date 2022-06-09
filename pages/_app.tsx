import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Context } from '../contexts/Context'
import { LeaguesContext } from '../contexts/LeaguesContext'
import '../styles/globals.css'
import customTheme from '../theme/index'

function MyApp({ Component, pageProps }: AppProps) {

  const [context, setContext] = useState("default context value");
  const [leagueContext, setLeagueContext] = useState({});

  return <LeaguesContext.Provider value={[leagueContext, setLeagueContext]}><Context.Provider value={[context, setContext]}>
      <ChakraProvider theme={customTheme}><Component {...pageProps} /></ChakraProvider>
    </Context.Provider>
    </LeaguesContext.Provider>
}

export default MyApp
