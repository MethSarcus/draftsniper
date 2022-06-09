import { useRouter } from "next/router"
import useSWR from "swr"
import axios from "axios"
import {
	Grid,
	GridItem,
	Box,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
	Button,
} from "@chakra-ui/react"
import LeagueCarousel from "../../../components/LeagueCarousel"
import PositionDraftTable from "../../../components/PositionDraftTable"
import { useContext } from "react"
import { Context } from "../../../contexts/Context"
import { LeaguesContext } from "../../../contexts/LeaguesContext"
import { LeagueSettings } from "../../../interfaces/sleeper_api/LeagueSettings"
import AllPicksTable from "../../../components/AllPicksTable"
import FilterablePickTable from "../../../components/FilterablePickTable"
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

			<Box maxHeight={400}>
				<LeagueCarousel
					leagues={data.filter((league: LeagueSettings) => {
						return league.status != "pre_draft"
					})}
				></LeagueCarousel>
			</Box>
			<DraftTableGroup
				leagues={data.filter((league: LeagueSettings) => {
					return league.status != "pre_draft"
				})}
			/>
		</div>
	)
}

export default Overview
