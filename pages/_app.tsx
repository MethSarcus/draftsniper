import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Context } from "../contexts/Context"
import { LeaguesContext } from "../contexts/LeaguesContext"
import { PicksContext } from "../contexts/PicksContext"
import { useState } from "react"
import Overview from "./user/[username]/overview"
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"

function MyApp({ Component, pageProps }: AppProps) {
	const [context, setContext] = useState({})
	const [picksContext, setPicksContext] = useState([])
	const [leagueContext, setLeagueContext] = useState({})

	return (
		<PicksContext.Provider value={[picksContext, setPicksContext]}>
			<LeaguesContext.Provider value={[leagueContext, setLeagueContext]}>
				<Context.Provider value={[context, setContext]}>
					<ChakraProvider>
						<Component {...pageProps} />
					</ChakraProvider>
				</Context.Provider>
			</LeaguesContext.Provider>
		</PicksContext.Provider>
	)
}

export default MyApp
