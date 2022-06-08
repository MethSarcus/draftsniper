import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tfoot,
    Box,
    Grid,
    GridItem,
} from "@chakra-ui/react"
import { useContext } from "react"
import { Context } from "../contexts/Context"
import { LeaguesContext } from "../contexts/LeaguesContext"
import { PicksContext } from "../contexts/PicksContext"
import { DraftPick } from "../interfaces/sleeper_api/DraftPick"
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"
import { getAllLeaguePositions, POSITION } from "../utility/rosterFunctions"

const PositionalPickTableGroup = () => {
	const [context] = useContext(Context)
    const [picksContext] = useContext(PicksContext)
    const [leaguesContext] = useContext(LeaguesContext)


    const allPicks = picksContext.filter((pick: DraftPick) => {
        return pick.picked_by == context.id
    })

	return (
		<Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(12, 1fr)'
                p={4}
                gap={1}>
			{getAllLeaguePositions(leaguesContext).map((position: POSITION) => {
                return (<GridItem key={position} rowSpan={2} colSpan={3}><TableContainer>
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th isNumeric>Pick</Th>
							<Th>Player</Th>
						</Tr>
					</Thead>
					<Tbody>
						{allPicks
							.filter((pick: DraftPick) => {
								return pick.metadata.position == position 
							})
							.map((pick: DraftPick) => {
								return (
									<Tr
										key={
											pick.player_id + "_" + pick.draft_id
										}
									>
										<Td isNumeric>{pick.pick_no}</Td>
										<Td>
											{pick.metadata.first_name}{" "}
											{pick.metadata.last_name}
										</Td>
									</Tr>
								)
							})}
					</Tbody>
					<Tfoot />
				</Table>
			</TableContainer></GridItem>)
            })}

		</Grid>
	)
}

export default PositionalPickTableGroup
