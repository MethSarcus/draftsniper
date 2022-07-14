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
	ButtonGroup,
	Tag,
	HStack,
	Badge,
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
	POSITION,
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
			bg='surface_google.1'
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
			<ButtonGroup spacing={1}>
				<Button
					onClick={onSub}
					variant='outline'
					colorScheme='primary_google'
					size='xs'
				>
					View Draft
				</Button>
				<Popover trigger='hover' placement='right'>
					<PopoverTrigger>
						<Button as={"text"} variant='ghost' colorScheme='secondary_google' size='xs'>
							League Info
						</Button>
					</PopoverTrigger>
					<PopoverContent display='flex' bg={"surface_google.2"}>
					<PopoverArrow bg='surface_google.2' />
						<Stack direction={"row"} spacing={2}>
							<StackItem>
								<PopoverHeader>Positions</PopoverHeader>
								<PopoverBody>
								<Stack>
									{formatRosterForPopover(
										props.league
											.roster_positions as string[]
									)}
									</Stack>
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
						{hasVariablePPR(props.league.scoring_settings) && <PopoverFooter>{formatVarPPR(props.league.scoring_settings)}</PopoverFooter>}
					</PopoverContent>
				</Popover>
			</ButtonGroup>
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
		textArr.push(<Badge bg={"position." + {key}} textAlign={"center"} py={"2px"} className={key} fontSize='0.5em'>{key + ": " + value}</Badge>)
	})

	return textArr
}

function formatScoringForPopover(
	scoringSettings: ScoringSettings
): JSX.Element[] {
	let textArr: JSX.Element[] = []

	textArr.push(<Text><Code>Int: {scoringSettings.pass_int}</Code></Text>)
	textArr.push(<Text><Code>Sack: {scoringSettings.sack}</Code></Text>)
	textArr.push(<Text><Code>Passing TD: {scoringSettings.pass_td}</Code></Text>)
	textArr.push(<Text><Code>Receiving TD: {scoringSettings.rec_td}</Code></Text>)
	textArr.push(<Text><Code>PPR: {scoringSettings.rec}</Code></Text>)

	

	if (hasPremiumScoring(scoringSettings)) {
		textArr.push(<Text><Code>RB Bonus: {scoringSettings.bonus_rec_rb}</Code></Text>)
		textArr.push(<Text><Code>WR Bonus: {scoringSettings.bonus_rec_wr}</Code></Text>)
		textArr.push(<Text><Code>TE Bonus: {scoringSettings.bonus_rec_te}</Code></Text>)
	}
	

	return textArr
}

function formatVarPPR(scoringSettings: ScoringSettings) {
		let varPPR = []
		varPPR.push(<Text as='h6'>Variable PPR</Text>)
		varPPR.push(<Text><Code>0-5 yards: {scoringSettings.rec_0_4}</Code></Text>)
		varPPR.push(<Text><Code>5-9 yards: {scoringSettings.rec_5_9}</Code></Text>)
		varPPR.push(<Text><Code>10-19 yards: {scoringSettings.rec_10_19}</Code></Text>)
		varPPR.push(<Text><Code>20-29 yards: {scoringSettings.rec_20_29}</Code></Text>)
		varPPR.push(<Text><Code>30-39 yards: {scoringSettings.rec_30_39}</Code></Text>)
		varPPR.push(<Text><Code>40+ yards: {scoringSettings.rec_40p}</Code></Text>)
		return varPPR
}

export default LeagueCard
