import {
	Box,
	Button,
	Code,
	HStack,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
	VStack
} from '@chakra-ui/react'
import { DraftSettings } from '../sleeper/DraftSettings'
import { LeagueSettings, ScoringSettings } from '../sleeper/LeagueSettings'
import {
	POSITION,
	hasPremiumScoring
} from '../utility/rosterFunctions'
import FlexPositionBadge from './PositionBadges/FlexPositionBadge'
import PositionBadge from './PositionBadges/PositionBadge'

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
											{pos != 'BN' && <Box>x{positionCounts.get(pos)}</Box>}
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

export default DraftPopover
