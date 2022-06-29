import { useRouter } from "next/router"
import useSWR from "swr"
import axios from "axios"
import {
	Container,
} from "@chakra-ui/react"
import LeagueCarousel from "../../../components/LeagueCarousel"
import { useContext } from "react"
import { Context } from "../../../contexts/Context"
import { LeaguesContext } from "../../../contexts/LeaguesContext"
import { LeagueSettings } from "../../../interfaces/sleeper_api/LeagueSettings"
import DraftTableGroup from "../../../components/DraftTableGroup"

const Overview = () => {
	const router = useRouter()
	const [context, setContext] = useContext(Context)
	const [leagueContext, setLeagueContext] = useContext(LeaguesContext)

	const fetcher = (url: string) =>
		axios
			.get(url)
			.then(function (res) {
				setContext(res.data.user_id)
				return axios.get(
					"https://api.sleeper.app/v1/user/" +
						res.data.user_id +
						"/leagues/nfl/2022"
				)
			})
			.then((res) => res.data)

	const { data, error } = useSWR(
		"https://api.sleeper.app/v1/user/" + router.query.username,
		fetcher
	)

	if (error) return <div>Failed to load</div>
	if (!data) return <div>Loading...</div>

	return (
		<div>
			<h1>{router.query.username}</h1>
			<h2>{context}</h2>

			<Container maxW={"container.xl"}>
				<h1>Leagues</h1>
				<LeagueCarousel
					leagues={data.filter((league: LeagueSettings) => {
						return league.status != "pre_draft"
					})}
				></LeagueCarousel>
			<DraftTableGroup
				leagues={data.filter((league: LeagueSettings) => {
					return league.status != "pre_draft"
				})}
			/></Container>
		</div>
	)
}

export default Overview
