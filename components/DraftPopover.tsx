import {
	Popover,
	PopoverTrigger,
	Button,
	PopoverContent,
	PopoverArrow,
	Stack,
	StackItem,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	Box,
	Text,
	Badge,
	Code,
	HStack,
	VStack,
} from '@chakra-ui/react'
import {
	hasPremiumScoring,
	hasVariablePPR,
	POSITION,
} from '../utility/rosterFunctions'
import PositionBadge from './PositionBadges/PositionBadge'
import FlexPositionBadge from './PositionBadges/FlexPositionBadge'
import {LeagueSettings, ScoringSettings} from '../sleeper/LeagueSettings'
import {Draft} from '../interfaces/sleeper_api/DraftSettings'
import {DraftSettings} from '../sleeper/DraftSettings'

type MyProps = {
	league: LeagueSettings
	draft: DraftSettings
}

const DraftPopover = (props: MyProps) => {
	let positionCounts = new Map<string, number>()

	props.league?.roster_positions?.forEach((pos) => {
		if (positionCounts.has(pos)) {
			let curNumPosition = positionCounts.get(pos) as number
			positionCounts.set(pos, curNumPosition + 1)
		} else {
			positionCounts.set(pos, 1)
		}
	})
	return (
		<Popover
			trigger='hover'
			placement='right'
			key={`${props.league.league_id}_${props.draft.draft_id}_popover`}
		>
			<PopoverTrigger>
				<Button variant='ghost' colorScheme='secondary_google' size='xs'>
					League Info
				</Button>
			</PopoverTrigger>
			<PopoverContent display='flex' bg={'surface.2'}>
				<PopoverArrow bg='surface.2' />
				<PopoverHeader>Roster and Scoring</PopoverHeader>
				<PopoverBody>
					<HStack align={'stretch'}>
						<VStack>
							{Array.from(positionCounts.keys()).map((pos) => {
								return (
									<Box key={`${pos}_${props.draft.draft_id}`}>
										<HStack>
											{pos in POSITION ? (
												<PositionBadge variant={pos} size={'md'} />
											) : (
												<FlexPositionBadge variant={pos} size={'md'} />
											)}
											{pos != "BN" && <Box>x{positionCounts.get(pos)}</Box>}
										</HStack>
									</Box>
								)
							})}
						</VStack>
						<VStack align={'stretch'}>
							{importantScoringSettings.map((setting) => {
								return (
									<Code key={setting}>
										{setting}: {props.league.scoring_settings[setting] ?? 0}
									</Code>
								)
							})}
							{hasPremiumScoring(props.league.scoring_settings) &&
								premReceptionScoringSettings.map((setting) => {
									if (props.league.scoring_settings[setting] ?? 0 > 0) {
										return (
											<Code key={setting}>
												{setting}: {props.league.scoring_settings[setting]}
											</Code>
										)
									}
								})}
						</VStack>
					</HStack>

					{/* <Code>{JSON.stringify(props.league.scoring_settings)}</Code> */}
				</PopoverBody>
			</PopoverContent>
		</Popover>
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
		if (key in POSITION) {
			textArr.push(
				<HStack>
					<PositionBadge variant={key} size={'md'} />
					<Box>x{value}</Box>
				</HStack>
			)
		} else if (key != 'BN') {
			textArr.push(
				<HStack>
					<FlexPositionBadge variant={key} key={Math.random()} size={'md'} />
					<Box>x{value}</Box>
				</HStack>
			)
		}
	})

	return textArr
}

const importantScoringSettings: (keyof ScoringSettings)[] = [
	'rec',
	'rec_td',
	'pass_td',
	'pass_int',
	'pass_sack',
]
const premReceptionScoringSettings: (keyof ScoringSettings)[] = [
	'bonus_rec_rb',
	'bonus_rec_wr',
	'bonus_rec_te',
]

function formatScoringForPopover(
	scoringSettings: ScoringSettings
): JSX.Element[] {
	let textArr: JSX.Element[] = []
	textArr.push(
		<Box>
			<Code>PPR: {scoringSettings.rec}</Code>
		</Box>
	)

	textArr.push(
		<Box>
			<Code>Receiving TD: {scoringSettings.rec_td}</Code>
		</Box>
	)

	textArr.push(
		<Box>
			<Code>Passing TD: {scoringSettings.pass_td}</Code>
		</Box>
	)

	textArr.push(
		<Box>
			<Code>Int: {scoringSettings.pass_int}</Code>
		</Box>
	)
	if (scoringSettings.pass_sack) {
		textArr.push(
			<Box>
				<Code>Sack: {scoringSettings.pass_sack}</Code>
			</Box>
		)
	}

	if (hasPremiumScoring(scoringSettings)) {
		if (scoringSettings.bonus_rec_rb && scoringSettings.bonus_rec_rb > 0) {
			textArr.push(
				<Box>
					<Code>RB Bonus: {scoringSettings.bonus_rec_rb}</Code>
				</Box>
			)
		}
		if (scoringSettings.bonus_rec_wr && scoringSettings.bonus_rec_wr > 0) {
			textArr.push(
				<Box>
					<Code>WR Bonus: {scoringSettings.bonus_rec_wr}</Code>
				</Box>
			)
		}
		if (scoringSettings.bonus_rec_te && scoringSettings.bonus_rec_te > 0) {
			textArr.push(
				<Box>
					<Code>TE Bonus: {scoringSettings.bonus_rec_te}</Code>
				</Box>
			)
		}
	}

	return textArr
}

function formatVarPPR(scoringSettings: ScoringSettings) {
	let varPPR = []
	varPPR.push(<Text as='h6'>Variable PPR</Text>)
	if (scoringSettings?.rec_0_4 != undefined) {
		varPPR.push(
			<Box>
				<Code>0-5 yards: {scoringSettings?.rec_0_4}</Code>
			</Box>
		)
	}

	if (scoringSettings?.rec_5_9 != undefined) {
		varPPR.push(
			<Box>
				<Code>5-9 yards: {scoringSettings?.rec_5_9}</Code>
			</Box>
		)
	}

	if (scoringSettings?.rec_10_19 != undefined) {
		varPPR.push(
			<Box>
				<Code>10-19 yards: {scoringSettings?.rec_10_19}</Code>
			</Box>
		)
	}

	if (scoringSettings?.rec_20_29 != undefined) {
		varPPR.push(
			<Box>
				<Code>20-29 yards: {scoringSettings?.rec_20_29}</Code>
			</Box>
		)
	}

	if (scoringSettings?.rec_30_39 != undefined) {
		varPPR.push(
			<Box>
				<Code>30-39 yards: {scoringSettings?.rec_30_39}</Code>
			</Box>
		)
	}

	if (scoringSettings?.rec_40p != undefined) {
		varPPR.push(
			<Box>
				<Code>40+ yards: {scoringSettings?.rec_40p}</Code>
			</Box>
		)
	}

	return varPPR
}

export default DraftPopover
