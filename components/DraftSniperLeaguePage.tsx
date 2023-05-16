import {Box, Container, Grid, GridItem, Heading, Checkbox, HStack, useMediaQuery, Spinner} from '@chakra-ui/react'
import {produce} from 'immer'
import {useEffect, useMemo, useState} from 'react'
import {DraftPick} from '../sleeper/DraftPick'
import {DraftSettings} from '../sleeper/DraftSettings'
import {LeagueSettings} from '../sleeper/LeagueSettings'
import {SleeperUser} from '../sleeper/SleeperUser'
import DraftSniperPickTable from './DraftSniperPickTable'
import DraftTableFilterTabs from './DraftTableFilterTabs'
import DraftSniperADPTable from './DraftSniperADPTable'
import {Stack} from 'rsuite'
import PositionalTableGroup from './PositionalTableGroup'

interface MyProps {
	leagueMembers: SleeperUser[] | undefined
	drafts: DraftSettings[] | undefined
	picks: DraftPick[] | undefined
	league: LeagueSettings | undefined
}
const DraftSniperLeaguePage = (props: MyProps) => {
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)', {
		ssr: true,
		fallback: false, // return false on the server, and re-evaluate on the client side
	})
	const [drafts, setDrafts] = useState(new Map())
	const [leagueMemberInfo, setLeagueMemberInfo] = useState(new Map())
	const [picks, setPicks] = useState(props.picks?.flat() ?? [])
	const [disabledMembers, setDisabledMembers] = useState([] as string[])
	const [disabledDrafts, setDisabledDrafts] = useState([] as string[])
	const [useRookieDraftsOnly, setUseRookieDraftsOnly] = useState(true)


	const myPickMap = useMemo(() => {
			//A function to evaluate whether a draft pick should be filtered
			const filterPickRules = {
				allowExternalMemberPicks: false,
				disabledMembers: disabledMembers,
				disabledDrafts: disabledDrafts,
				rookieDraftsOnly: useRookieDraftsOnly,
				leagueMemberIds: Array.from(leagueMemberInfo?.keys())
			}
	let pickMap = new Map<string, DraftPick[]>()
	props.picks?.flat().filter((pick) => {
		return evaluatePick(pick, filterPickRules)
	}).forEach((pick) => {
			if (pickMap.has(pick.player_id)) {
				pickMap.get(pick.player_id)?.push(pick)
			} else {
				pickMap.set(pick.player_id, [pick])
			}
		})
		console.log(pickMap)
		return pickMap
	}, [disabledDrafts, disabledMembers, leagueMemberInfo, props.picks, useRookieDraftsOnly])

	function toggleMember(checkbox: any) {
		if (checkbox.currentTarget.checked && disabledMembers.includes(checkbox.currentTarget.value)) {
			const index = disabledMembers.indexOf(checkbox.currentTarget.value, 0)
			if (index > -1) {
				const nextState = produce(disabledMembers, (draftState: string[]) => {
					draftState.splice(index, 1)
				})

				setDisabledMembers(nextState)
			}
		} else {
			const nextState = produce(disabledMembers, (draftState: string[]) => {
				draftState.push(checkbox.currentTarget.value)
			})

			setDisabledMembers(nextState)
		}
	}

	function toggleDraft(checkbox: any) {
		if (checkbox.currentTarget.checked && disabledDrafts.includes(checkbox.currentTarget.value)) {
			const index = disabledDrafts.indexOf(checkbox.currentTarget.value, 0)
			if (index > -1) {
				const nextState = produce(disabledDrafts, (draftState: string[]) => {
					draftState.splice(index, 1)
				})

				setDisabledDrafts(nextState)
			}
		} else {
			const nextState = produce(disabledDrafts, (draftState: string[]) => {
				draftState.push(checkbox.currentTarget.value)
			})

			setDisabledDrafts(nextState)
		}
	}

	function toggleRookieDrafts(checkbox: any) {
		setUseRookieDraftsOnly(checkbox.currentTarget.checked)
	}

	useEffect(() => {
		let memberMap = new Map()
		props.leagueMembers?.forEach((user: SleeperUser) => {
			memberMap.set(user.user_id, user)
		})
		setLeagueMemberInfo(memberMap)
		let draftSettingsMap = new Map()
		props.drafts?.forEach((draftSettings: DraftSettings) => {
			draftSettingsMap.set(draftSettings.draft_id, draftSettings)
		})
		setDrafts(draftSettingsMap)
		setPicks(props.picks?.flat() ?? [])
	}, [props.drafts, props.leagueMembers, props.picks])

	const desktopGrid = `"header header"
    "filter_tabs draft_board"
    "filter_tabs draft_board"
	"filter_tabs draft_board"`

	const mobileGrid = `"header"
  "filter_tabs"
  "draft_board"`

	return (
		<Box bg={'surface.6'} overflow={'clip'} w={'100vw'} h={'100vh'}>
			<Grid
				gap={3}
				px={4}
				color={'white'}
				templateAreas={[mobileGrid, desktopGrid]}
				gridTemplateColumns={['1fr', '1fr 1fr']}>
				<GridItem gridArea={'header'} py={4}>
					<Heading size={'sm'}>{props.league?.name} member draft data</Heading>
				</GridItem>
				<GridItem gridArea={'filter_tabs'} overflow={'clip'}>
				<Checkbox
						size={'md'}
						colorScheme={'primary'}
						id={'rookieDraftsOnlyToggle'}
						defaultChecked
						my={2}
						value={'useRookieDraftsOnly'}
						onChange={toggleRookieDrafts}>
						Rookie Drafts Only
					</Checkbox>
							<DraftTableFilterTabs
								users={props.leagueMembers}
								onMemberClick={toggleMember as any}
								onDraftClick={toggleDraft as any}
								drafts={Array.from(drafts.values())}
							/>


				</GridItem>
				<GridItem gridArea={'draft_board'}>
					<Box
						overflowX={'hidden'}
						overflowY={'auto'}
						backgroundColor={'surface.0'}
						padding={0}
						margin={0}
						className='rs-theme-dark'>
							{picks.length <= 0 && (<Spinner/>)}
						{picks.length > 0 && leagueMemberInfo.size > 0 && (
								// <DraftSniperPickTable
								// 	picks={picks}
								// 	memberData={leagueMemberInfo}
								// 	disabledMembers={disabledMembers}
								// 	allowExternalMemberPicks={false}
								// />

								// <DraftSniperADPTable
								// 	picks={picks}
								// 	memberData={leagueMemberInfo}
								// 	disabledMembers={disabledMembers}
								// 	disabledDrafts={disabledDrafts}
								// 	allowExternalMemberPicks={false}
								// 	rookieDraftsOnly={useRookieDraftsOnly}
								// />
								<PositionalTableGroup memberData={leagueMemberInfo} picks={myPickMap} loading={false}/>

						)}
					</Box>
				</GridItem>
			</Grid>
		</Box>
	)
}

function evaluatePick(pick: DraftPick, filterPickRules: any) {
	let allowPick = true
	
	if (!filterPickRules.allowExternalMemberPicks && !(filterPickRules.leagueMemberIds as string[]).includes(pick.picked_by)) {
		allowPick = false
	}

	if (filterPickRules.disabledMembers.includes(pick.picked_by) || pick.picked_by == '') {
		allowPick = false
	}

	if (filterPickRules.rookieDraftsOnly && (parseInt(pick.metadata.years_exp) >= 1)) {
		allowPick = false
	}

	if (filterPickRules.disabledDrafts && filterPickRules.disabledDrafts.includes(pick.draft_id)) {
		allowPick = false
	}
	if (filterPickRules.memberData && filterPickRules.memberData?.has(pick.picked_by)) {
		allowPick = false
	}	
	return allowPick
}

export default DraftSniperLeaguePage
