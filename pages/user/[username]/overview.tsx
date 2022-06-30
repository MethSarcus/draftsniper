import { useRouter } from "next/router"
import useSWR from "swr"
import axios from "axios"
import {
	Container,
} from "@chakra-ui/react"
import LeagueCarousel from "../../../components/LeagueCarousel"
import { LeagueSettings } from "../../../interfaces/sleeper_api/LeagueSettings"
import DraftTableGroup from "../../../components/DraftTableGroup"

const Overview = () => {
	const router = useRouter()
	const fetcher = (url: string) => axios.get(url).then(res => res.data)
	const { data: userData, error: userError } = useSWR("https://api.sleeper.app/v1/user/" + router.query.username, fetcher)

	const { data: leaguesData, error: leaguesError } = useSWR(() => (userData.user_id ? "https://api.sleeper.app/v1/user/" + userData.user_id + "/leagues/nfl/2022": null), fetcher)
	if (userError) return <div>Failed to load</div>
	if (!userData || !leaguesData) return <div>Loading...</div>
	console.log(userData)
	return (
		<div>
			<h1>{router.query.username}</h1>
			<h2>{userData.user_id}</h2>

			<Container maxW={"container.xl"}>
				<h1>Leagues</h1>
				<LeagueCarousel
					leagues={leaguesData.filter((league: LeagueSettings) => {
						return league.status != "pre_draft"
					})}
				></LeagueCarousel>
			<DraftTableGroup
				leagues={leaguesData.filter((league: LeagueSettings) => {
					return league.status != "pre_draft"
				})}

				user_id={userData.user_id}
			/></Container>
		</div>
	)
}

export default Overview

function useOrder(id: any) {
	const fetcher = (url: string) => axios.get(url).then(res => res.data)
	return useSWR(() => (id ? "https://api.sleeper.app/v1/user/" + id + "/leagues/nfl/2022": null), fetcher)
  }