import {
	Box,
	Checkbox,
	Divider,
	Grid,
	GridItem,
	Heading,
	Stack,
} from "@chakra-ui/react"
import axios from "axios"
import React, { useContext, useState } from "react"
import useSWR from "swr"
import { Context } from "../contexts/Context"
import { DraftPick } from "../interfaces/sleeper_api/DraftPick"
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"
import { getAllLeaguePositions, POSITION } from "../utility/rosterFunctions"
import DraftPickDataTable from "./DraftPickDataTable"
import FilterablePickTable from "./FilterablePickTable"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

type MyProps = { leagues: LeagueSettings[] }

const DraftTableGroup = (props: MyProps) => {
	const [context, setContext] = useContext(Context)
	const [includedDrafts, setIncludedDrafts] = useState(
		props.leagues.map((league) => league.draft_id)
	)
	const positions = getAllLeaguePositions(props.leagues)

	const { data, error } = useSWR(`/api/picks/${context}`, fetcher)

	if (error) return <div>Failed to load</div>
	if (!data) return <div>Loading...</div>
	return (
		<div>
			<Grid
				bg={"brand.100"}
				className='posTableGroup'
				templateRows='repeat(2, 1fr)'
				templateColumns='repeat(12, 1fr)'
				p={2}
				gap={4}
			>
				<GridItem
					rowSpan={2}
					colSpan={4}
					rounded={"lg"}
					overflowY='auto'
					maxHeight={800}
					boxShadow={1}
					zIndex={1}
				>
					<FilterablePickTable
						leagues={props.leagues}
						picks={data.picks}
					/>
				</GridItem>

				{positions.map((pos) => {
					if (
						data.picks.filter((pick: DraftPick) => {
							return pick.metadata.position == pos
						}).length > 0
					) {
						return (
							<GridItem
								rowSpan={2}
								colSpan={4}
								rounded={"lg"}
								overflowY='auto'
								padding={3}
								maxHeight={600}
								zIndex={1}
								key={`position_table_${pos}`}
							>
								<h1>{pos}</h1>
								<DraftPickDataTable
									picks={data.picks}
									includedDrafts={includedDrafts}
									includedPositions={[pos]}
								/>
							</GridItem>
						)
					}
				})}
			</Grid>
		</div>
	)
}

export default DraftTableGroup
