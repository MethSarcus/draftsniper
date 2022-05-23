import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Context } from '../contexts/Context'
import { LeaguesContext } from '../contexts/LeaguesContext'
import { useState } from 'react'
import Overview from './user/[username]/overview'
import { LeagueSettings } from '../interfaces/sleeper_api/LeagueSettings'

function MyApp({ Component, pageProps }: AppProps) {

  const [context, setContext] = useState("default context value");
  const [leagueContext, setLeagueContext] = useState({});

  return <LeaguesContext.Provider value={[leagueContext, setLeagueContext]}><Context.Provider value={[context, setContext]}>
      <ChakraProvider><Component {...pageProps} /></ChakraProvider>
    </Context.Provider>
    </LeaguesContext.Provider>
}

export default MyApp
