import {
	Box,
	Button,
	Container,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Flex,
	Spacer,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"
import { getLeagueReceptionScoringType } from "../utility/rosterFunctions"

type MyProps = {
	league: LeagueSettings
}

const LeagueCard = (props: MyProps) => {
	const router = useRouter()

	function onSub(e: React.SyntheticEvent) {
		e.preventDefault()
		router.push({
			pathname:
				"/user/" + router.query.username + "/draft/" + props.league.draft_id,
		})
	}

  const settingsString = getLeagueReceptionScoringType(props.league)

	return (
		<Stat size={'xs'}>
			<Box
      boxSize={'xs'}
				p={4}
				m={2}
				maxH={150}
				bg={"white.800"}
				boxShadow={"md"}
				rounded={"lg"}
				zIndex={1}
			>
				<StatHelpText>
        {props.league.status}
				</StatHelpText>
				<StatNumber>{props.league.name}</StatNumber>
				<StatHelpText>						<Flex>
							<Box>
								{settingsString.pprString}
							</Box>
							<Spacer />
							<Box>
              {settingsString.numQbString}
							</Box>
              <Spacer />
              <Box>
              {settingsString.leagueTypeString}
              </Box>
						</Flex></StatHelpText>
				<Button
					onClick={onSub}
					variant='outline'
					colorScheme='teal'
					size='xs'
				>
					View Draft
				</Button>
			</Box>
		</Stat>
	)
}

export default LeagueCard
