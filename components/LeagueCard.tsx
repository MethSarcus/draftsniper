import {
	Box,
	Button,
	Text,
	Stack,
	Switch,
	StatLabel,
	StatNumber,
	Flex,
	Spacer,
	WrapItem,
	Wrap,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Code,
	PopoverFooter,
	StackItem,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import {
	LeagueSettings,
	ScoringSettings,
} from "../interfaces/sleeper_api/LeagueSettings"
import {
	getLeagueReceptionScoringType,
	hasPremiumScoring,
	hasVariablePPR,
} from "../utility/rosterFunctions"

type MyProps = {
	league: LeagueSettings
}

const LeagueCard = (props: MyProps) => {
	const router = useRouter()

	function onSub(e: React.SyntheticEvent) {
		e.preventDefault()
		router.push({
			pathname:
				"/user/" +
				router.query.username +
				"/draft/" +
				props.league.draft_id,
		})
	}

	const settingsString = getLeagueReceptionScoringType(props.league)

	return (
		<Stack
			spacing={1}
			direction='column'
			boxShadow={"lg"}
			p='3'
			rounded={"md"}
			bg='brand.surface'
			textColor={"brand.on_surface"}
		>
			<Text as='b' fontSize='sm'>
				{props.league.name}
			</Text>
			<Stack direction={"row"}>
				<Text fontSize='xs'>{settingsString.pprString}</Text>
				<Spacer />
				<Text fontSize='xs'>{settingsString.numQbString}</Text>
				<Spacer />
				<Text fontSize='xs'>{settingsString.leagueTypeString}</Text>
			</Stack>
			<Wrap spacing={1} direction='row'>
				<Button
					onClick={onSub}
					variant='outline'
					colorScheme='teal'
					size='xs'
				>
					View Draft
				</Button>
				<Popover trigger='hover' placement='right'>
					<PopoverTrigger>
						<Button variant='outline' colorScheme='blue' size='xs'>
							League Info
						</Button>
					</PopoverTrigger>
					<PopoverContent display='flex' bg={"brand.surface"}>
						<Stack direction={"row"} spacing={2}>
							<StackItem>
								<PopoverHeader>Positions</PopoverHeader>
								<PopoverBody>
									{formatRosterForPopover(
										props.league
											.roster_positions as string[]
									)}
								</PopoverBody>
							</StackItem>
							<StackItem>
								<PopoverHeader>Scoring</PopoverHeader>
								<PopoverBody>
									<StackItem>
										{formatScoringForPopover(
											props.league.scoring_settings
										)}
									</StackItem>
								</PopoverBody>
							</StackItem>
						</Stack>
					</PopoverContent>
				</Popover>
			</Wrap>
		</Stack>
	)
}

function formatRosterForPopover(rosterPositions: string[]): JSX.Element[] {
	let positionCounts = new Map<string, number>()
	rosterPositions.forEach((pos) => {
		if (positionCounts.has(pos)) {
			let curNumPosition = positionCounts.get(pos) as number
			positionCounts.set(pos, curNumPosition + 1)
		} else {
			positionCounts.set(pos, 1)
		}
	})

	let textArr: JSX.Element[] = []
	positionCounts.forEach((value, key) => {
		textArr.push(<Text as='p'>{key + ": " + value}</Text>)
	})

	return textArr
}

function formatScoringForPopover(
	scoringSettings: ScoringSettings
): JSX.Element[] {
	let textArr: JSX.Element[] = []

	textArr.push(<Text as='p'>Int: {scoringSettings.pass_int}</Text>)
	textArr.push(<Text as={"p"}>Sack: {scoringSettings.sack}</Text>)
	textArr.push(<Text as={"p"}>Passing TD: {scoringSettings.pass_td}</Text>)
	textArr.push(<Text>Receiving TD: {scoringSettings.rec_td}</Text>)
	textArr.push(<Text>PPR: {scoringSettings.rec}</Text>)
	if (hasVariablePPR(scoringSettings)) {
		textArr.push(<Text as='h6'>Variable PPR</Text>)
		textArr.push(<Text>0-5 yards: {scoringSettings.rec_0_4}</Text>)
		textArr.push(<Text>5-9 yards: {scoringSettings.rec_5_9}</Text>)
		textArr.push(<Text>10-19 yards: {scoringSettings.rec_10_19}</Text>)
		textArr.push(<Text>20-29 yards: {scoringSettings.rec_20_29}</Text>)
		textArr.push(<Text>30-39 yards: {scoringSettings.rec_30_39}</Text>)
		textArr.push(<Text>40+ yards: {scoringSettings.rec_40p}</Text>)
	}

	if (hasPremiumScoring(scoringSettings)) {
		textArr.push(<Text>RB Bonus: {scoringSettings.bonus_rec_rb}</Text>)
		textArr.push(<Text>WR Bonus: {scoringSettings.bonus_rec_wr}</Text>)
		textArr.push(<Text>TE Bonus: {scoringSettings.bonus_rec_te}</Text>)
	}

	return textArr
}

export default LeagueCard
