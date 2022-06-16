import {
	Box,
	Grid,
	GridItem,
	SimpleGrid,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react"
import axios from "axios"
import router from "next/router"
import React, { useContext, useState } from "react"
import useSWR from "swr"
import { Context } from "../contexts/Context"
import { DraftPick } from "../interfaces/sleeper_api/DraftPick"
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"
import { getAllLeaguePositions, POSITION } from "../utility/rosterFunctions"
import DraftPickCard from "./DraftPickCard"
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
			<Tabs>
				<TabList>
					<Tab>{router.query.username} Picks</Tab>
					<Tab>All Picks</Tab>
					<Tab>Inferred Rankings</Tab>
					<Tab>Positional Rankings</Tab>
				</TabList>

				<TabPanels>
					
					<TabPanel>
					<Grid templateColumns='repeat(12, 3fr)' gap={1}>
					{data.picks.filter((pick: DraftPick) => {
										return pick.picked_by == context
									}).sort((n1: DraftPick,n2: DraftPick)=> n1.pick_no > n2.pick_no).map((pick: DraftPick) => {
						return (
							<GridItem
								key={pick.draft_id + "_" + pick.player_id}
								colSpan={1}
							>
								<DraftPickCard pick={pick}></DraftPickCard>
							</GridItem>
						)
					})}
				</Grid>
					</TabPanel>
					<TabPanel>
						<FilterablePickTable
							leagues={props.leagues}
							picks={data.picks}
						/>
					</TabPanel>
					<TabPanel>
						<p>Three!</p>
					</TabPanel>
					<TabPanel>
						<SimpleGrid columns={2} spacing={4}>
							{positions.map((pos) => {
								if (
									data.picks.filter((pick: DraftPick) => {
										return pick.metadata.position == pos
									}).length > 0
								) {
									return (
										<Box
											key={`position_table_${pos}`}
											boxSize={"sm"}
											overflowY='auto'
											padding={3}
											boxShadow='dark-lg'
											bg={"white"}
										>
											<h1>{pos}</h1>
											<DraftPickDataTable
												picks={data.picks}
												includedDrafts={includedDrafts}
												includedPositions={[pos]}
											/>
										</Box>
									)
								}
							})}
						</SimpleGrid>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	)
}

export default DraftTableGroup
